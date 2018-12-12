import { AngularModule } from "../app";
import { angularFriendlyName, Constructor, isConstructor } from "../utils";

type ReactComponentConstructor = Constructor<React.Component> & Function;

export function NgReact<T extends ReactComponentConstructor>(ctor: T): T
export function NgReact<T extends ReactComponentConstructor>(injections: (string | Constructor<any>)[]): T
export function NgReact<T extends ReactComponentConstructor>(ctorOrInjections: T | string[] | Constructor<any>[]) {
    return ctorOrInjections instanceof Array
        ? registerWithInjections<T>(ctorOrInjections)
        : registerWithoutInjections<T>(ctorOrInjections);
}

function registerWithInjections<T extends ReactComponentConstructor>(injections: (string | Constructor<any>)[]) {
    return (ctor: T) => {
        AngularModule.directive(angularFriendlyName(ctor), (reactDirective, $injector: ng.auto.IInjectorService) => {
            let injectionProps = injections.reduce((prev, current) => {
                let injectionName = isConstructor(current) ? current.name : current;
                return { ...prev, [injectionName]: $injector.get(injectionName) }
            }, new Object());
            return reactDirective(ctor, undefined, {}, injectionProps);
        });
        registerValue(ctor);
    };
}

function registerWithoutInjections<T extends ReactComponentConstructor>(ctor: T) {
    AngularModule.directive(angularFriendlyName(ctor), reactDirective => reactDirective(ctor));
    registerValue(ctor);
    return ctor;
}

function registerValue<T extends ReactComponentConstructor>(ctor: T) {
    AngularModule.value(ctor.name, ctor);
}
