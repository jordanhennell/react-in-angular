import { Component } from "./AngularDecorators";

@Component("simpleAngular", {
    template: "<div>{{$ctrl.message}}</div>"
})
class SimpleAngularController implements ng.IComponentController {
    public message = "Hello from Angular"
}
