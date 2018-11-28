import "angular"

function AngularController() {
  this.message = "Hello from Angular!"
}

angular.module("reactInAngular")
  .component("angularComponent", {
    template: "<div>{{$ctrl.message}}</div>",
    controller: AngularController
  });
