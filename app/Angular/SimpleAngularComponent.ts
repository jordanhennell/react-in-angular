import { AngularModule } from "../app";

class SimpleAngularController implements ng.IComponentController {
  public message = "Hello from Angular"
}

class SimpleAngularComponent implements ng.IComponentOptions {
  template = "<div>{{$ctrl.message}}</div>";
  controller = SimpleAngularController;
}

AngularModule.component("simpleAngularComponent", new SimpleAngularComponent());
