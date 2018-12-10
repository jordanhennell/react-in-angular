import { AngularModule } from "../app";
import { AngularWrapper } from "./AngularWrapper";
import React = require("react");
import { NgReact } from "./NgReactDecorator";

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

class AddTwoNumbersAngular implements ng.IComponentOptions {
    template = "Angular result: {{ $ctrl.first + $ctrl.second }}";
    bindings = {
        first: "<",
        second: "<"
    }
}

AngularModule.component("addTwoNumbersAngular", new AddTwoNumbersAngular());
