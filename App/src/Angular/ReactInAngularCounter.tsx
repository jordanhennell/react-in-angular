import { NgReact } from "../React/NgReactDecorator";
import { Component } from "./AngularDecorators";
import React = require("react");


@Component("counterAngular", {
    template: `<div>
    <h4>React Sharing Angular Data</h4>
    <div>Angular Count: {{$ctrl.count}}</div>
    <counter-react count="$ctrl.count"></counter-react>
    <button ng-click="$ctrl.incrementCount()">Increment</button>
    <button ng-click="$ctrl.reset()">Reset</button>
</div>`
})
class CounterController implements ng.IComponentController {
    public count = 0;

    public incrementCount() {
        this.count++;
    }

    public reset() {
        this.count = 0;
    }
}

@NgReact
class CounterReact extends React.Component<{ count: number }> {
    render() {
        return <div>React Count: {this.props.count}</div>
    }
}
