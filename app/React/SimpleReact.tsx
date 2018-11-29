import React = require("react");
import { NgReact } from "./Decorators";

@NgReact
export class SimpleReact extends React.Component<{ message: string }> {
    static defaultProps = { 
        message: "Hello from React (default)"
    }
    
    render() {
        return <div>{this.props.message}</div>;
    }
}
