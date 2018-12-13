import { Component } from "../Angular/AngularDecorators";
import { AngularWrapper } from "./AngularWrapper";
import { NgReact } from "./NgReactDecorator";
import React = require("react");

export const testIds = {
    firstInput: "firstInput",
    secondInput: "secondInput",
}

@NgReact
export class AddTwoNumbersReact extends React.Component<{}, { first: number, second: number }> {
    constructor(props: {}) {
        super(props);
        this.state = { first: 2, second: 2 };
    }
    
    render() {
        let { first, second } = this.state;

        return <>
            <h4>Angular Inside React</h4>
            <div><label>
                First
                <input 
                    type="number" 
                    value={first} 
                    onChange={e => this.setState({ first: parseFloat(e.target.value) })} 
                    data-testid={testIds.firstInput} />
            </label></div>
            <div><label>
                Second
                <input 
                    type="number" 
                    value={second} 
                    onChange={e => this.setState({ second: parseFloat(e.target.value) })} 
                    data-testid={testIds.secondInput}/>
            </label></div>
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
