import { AngularModule } from "../app";

type ReactComponentConstructor = Function & { new (...args: any[]): React.Component };

export function NgReact<T extends ReactComponentConstructor>(ctor: T) {
    AngularModule.directive(getAngularFriendlyName(ctor.name), reactDirective => reactDirective(ctor));
    AngularModule.value(ctor.name, ctor);
};

function getAngularFriendlyName(name: string) {
    return name.charAt(0).toLowerCase() + name.slice(1);
}
