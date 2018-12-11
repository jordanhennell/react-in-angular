import { AngularModule } from "../app";
import { angularFriendlyName, Constructor } from "../utils";

type ReactComponentConstructor = Constructor<React.Component> & Function;

export function NgReact<T extends ReactComponentConstructor>(ctor: T): T
export function NgReact<T extends ReactComponentConstructor>(injections: string[]): T
export function NgReact<T extends ReactComponentConstructor>(injections: Constructor<any>[]): T
export function NgReact<T extends ReactComponentConstructor>(ctorOrInjections: T | string[] | Constructor<any>[]) {
    return ctorOrInjections instanceof Array
        ? registerWithInjections<T>(ctorOrInjections)
        : registerWithoutInjections<T>(ctorOrInjections);
}

function registerWithInjections<T extends ReactComponentConstructor>(injections: string[] | Constructor<any>[]) {
    let injectionNames = isConstructor(injections)
        ? injections.map(c => c.name)
        : injections;

    return (ctor: T) => {
        AngularModule.directive(angularFriendlyName(ctor), (reactDirective, $injector: ng.auto.IInjectorService) => {
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
    AngularModule.directive(angularFriendlyName(ctor), reactDirective => reactDirective(ctor));
    registerValue(ctor);
    return ctor;
}

function registerValue<T extends ReactComponentConstructor>(ctor: T) {
    AngularModule.value(ctor.name, ctor);
}
