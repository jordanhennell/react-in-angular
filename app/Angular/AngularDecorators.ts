import { AngularModule } from "../app";
import { Constructor } from "../utils";

// From BI
export function Component(name: string, componentDefinition: ng.IComponentOptions) {
    return <TFunction extends ng.IControllerConstructor>(target: TFunction) => {
        componentDefinition.controller = target;
        AngularModule.component(name, componentDefinition);
        return target;
    }
}

export function Service(serviceType: Constructor<any>) {
    AngularModule.service(serviceType.name, serviceType);
}
