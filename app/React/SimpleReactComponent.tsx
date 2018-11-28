import React = require("react");
import { AngularModule } from "../app";

export class SimpleReactComponent extends React.Component<{ message: string }> {
    static defaultProps = { 
        message: "Hello from React (default)"
    }
    
    render() {
        return <div>{this.props.message}</div>;
    }
}

AngularModule.value("SimpleReactComponent", SimpleReactComponent);
