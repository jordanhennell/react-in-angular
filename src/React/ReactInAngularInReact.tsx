import { AngularWrapper } from "..";
import { NgReact } from "./NgReactDecorator";
import React = require("react");

@NgReact
class ReactInAngularInReact extends React.Component {
    render() {
        return <>
            <h4>React in Angular in React</h4>
            <AngularWrapper>{
                "<counter-angular></counter-angular>"
            }</AngularWrapper>
        </>
    }
}
