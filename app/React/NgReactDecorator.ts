import { AngularModule } from "../app";

type Constructor<T> = Function & { new(...args: any[]): T }
type ReactComponentConstructor = Constructor<React.Component>;

export function NgReact<T extends ReactComponentConstructor>(ctor: T): T
export function NgReact<T extends ReactComponentConstructor>(injections: string[]): T
export function NgReact<T extends ReactComponentConstructor>(injections: Constructor<any>[]): T
export function NgReact<T extends ReactComponentConstructor>(ctorOrInjections: string[] | T) {
    return ctorOrInjections instanceof Array
        ? registerWithInjections<T>(ctorOrInjections)
        : registerWithoutInjections<T>(ctorOrInjections);
}

function registerWithInjections<T extends ReactComponentConstructor>(injections: string[] | Constructor<any>[]) {
    let injectionNames = isConstructor(injections)
        ? injections.map(c => c.name)
        : injections;

    return (ctor: T & { test: string }) => {
        AngularModule.directive(getAngularFriendlyName(ctor.name), (reactDirective, $injector: ng.auto.IInjectorService) => {
            let injectionProps = injectionNames.reduce((prev, current) => ({ ...prev, [current]: $injector.get(current) }), new Object());
            return reactDirective(ctor, undefined, {}, injectionProps);
        });
        registerValue(ctor);
    };

    function isConstructor<T>(injections: string[] | Constructor<T>[]): injections is Constructor<T>[] {
        return injections[0] instanceof Function;
    }
}

function registerWithoutInjections<T extends ReactComponentConstructor>(ctor: T) {
    AngularModule.directive(getAngularFriendlyName(ctor.name), reactDirective => reactDirective(ctor));
    registerValue(ctor);
    return ctor;
}

function getAngularFriendlyName(name: string) {
    return name.charAt(0).toLowerCase() + name.slice(1);
}

function registerValue<T extends ReactComponentConstructor>(ctor: T) {
    AngularModule.value(ctor.name, ctor);
}
