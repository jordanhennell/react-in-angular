import { AngularModule } from "../app";
import React = require("react");
import { NgReact } from "../React/Decorators";

class CounterController implements ng.IComponentController {
    public count = 0;

    public incrementCount() {
        this.count++;
    }

    public reset() {
        this.count = 0;
    }
}

class CounterAngular implements ng.IComponentOptions {
    template = `<div>
        <h4>React Sharing Angular Data</h4>
        <div>Angular Count: {{$ctrl.count}}</div>
        <counter-react count="$ctrl.count"></counter-react>
        <button ng-click="$ctrl.incrementCount()">Increment</button>
        <button ng-click="$ctrl.reset()">Reset</button>
    </div>`;
    controller = CounterController;
}

@NgReact
class CounterReact extends React.Component<{ count: number }> {
    render() {
        return <div>React Count: {this.props.count}</div>
    }
}

AngularModule.component("counterAngular", new CounterAngular());
