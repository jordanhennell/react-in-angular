import { Component } from "../Angular/AngularDecorators";
import { AngularWrapper } from "./AngularWrapper";
import { NgReact } from "./NgReactDecorator";
import React = require("react");

@NgReact
class AddTwoNumbersReact extends React.Component<{ first: number, second: number }> {
    render() {
        let { first, second } = this.props;

        return <>
            <h4>Angular Inside React</h4>
            <div>{first} + {second} = ...</div>
            <div>React result: {first + second}</div>
            <AngularWrapper>{
                `<add-two-numbers-angular first='${first}' second='${second}'></add-two-numbers-angular>`
            }</AngularWrapper>
        </>
    }
}

@Component("addTwoNumbersAngular", {
    template: "Angular result: {{ $ctrl.first + $ctrl.second }}",
    bindings: {
        first: "<",
        second: "<"
    }
})
class AddTwoNumbersAngular implements ng.IComponentController { }
