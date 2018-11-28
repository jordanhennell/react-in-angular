import { AngularModule } from "./app";

class AngularController implements ng.IComponentController {
  public message = "Hello from Angular!"
}

class AngularComponent implements ng.IComponentOptions {
  template = "<div>{{$ctrl.message}}</div>";
  controller = AngularController;
}

AngularModule.component("angularComponent", new AngularComponent());
