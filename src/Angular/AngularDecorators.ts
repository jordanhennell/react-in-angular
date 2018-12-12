import { AngularModule } from "../app";
import { Constructor, isConstructor } from "../utils";

// Based on what's in BI
export function Component(name: string, injections: (string | Constructor<any>)[], componentDefinition: ng.IComponentOptions): <TFunction extends angular.IControllerConstructor>(target: TFunction) => TFunction
export function Component(name: string, componentDefinition: ng.IComponentOptions): <TFunction extends angular.IControllerConstructor>(target: TFunction) => TFunction
export function Component(name: string, componentDefinitionOrInjections: ng.IComponentOptions | (string | Constructor<any>)[], componentDefinition?: ng.IComponentOptions) {
    return <T extends ng.IControllerConstructor>(target: T) => {
        if (componentDefinitionOrInjections instanceof Array) {
            target.$inject = componentDefinitionOrInjections.map(i => isConstructor(i) ? i.name : i)
            componentDefinitionOrInjections = componentDefinition!;
        }

        componentDefinitionOrInjections.controller = target;
        AngularModule.component(name, componentDefinitionOrInjections);
        return target;
    }
}

export function Service(serviceType: Constructor<any>) {
    AngularModule.service(serviceType.name, serviceType);
}
