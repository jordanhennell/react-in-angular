import { AngularModule } from "../app";
import { SimpleReactComponent } from "./SimpleReactComponent";

AngularModule.directive("simpleReactDirective", reactDirective => reactDirective(SimpleReactComponent));
