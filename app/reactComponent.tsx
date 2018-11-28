import React = require("react");
import { AngularModule } from "./app";

export class ReactComponent extends React.Component<{ message: string }> {
    static defaultProps = { 
        message: "Hello from React"
    }
    
    render() {
        return <div>{this.props.message}</div>;
    }
}

AngularModule.value("ReactComponent", ReactComponent);
