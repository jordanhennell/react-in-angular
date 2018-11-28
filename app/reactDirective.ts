import { AngularModule } from "./app";
import { ReactComponent } from "./reactComponent";

AngularModule.directive("myReactDirective", reactDirective => reactDirective(ReactComponent));
