import { AngularModule } from "../app";
import React = require("react");

class DiceRollReact extends React.Component<{}, { diceValue: number }> {
    constructor(props: {}) {
        super(props);
        this.state = {
            diceValue: 0
        }
    }

    render() {
        return <>
            <h4>Angular Sharing React Data</h4>
            <div>React dice roll: {this.state.diceValue}</div>
            {/* Does not work */}
            <div dangerouslySetInnerHTML={{ __html: `<dice-roll-angular dice-value="${this.state.diceValue}"></dice-roll-angular>` }} />
            <button onClick={() => this.rollDice()}>Roll</button>
        </>
    }

    rollDice() {
        this.setState({
            diceValue: Math.floor(Math.random() * 6 + 1)
        });
    }
}

class DiceRollAngular implements ng.IComponentOptions {
    template = `<div>Angular dice roll: {{$ctrl.diceValue}}</div>`;
    bindings = {
        diceValue: "<"
    }
}

AngularModule.component("diceRollAngular", new DiceRollAngular());
AngularModule.directive("diceRollReact", reactDirective => reactDirective(DiceRollReact));
