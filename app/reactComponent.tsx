import React = require("react");
import { AngularModule } from "./app";

class ReactComponent extends React.Component<{ message: string }> {
    static defaultProps = { 
        message: "Hello from React"
    }
    
    render() {
        return this.props.message;
    }
}

AngularModule.value("ReactComponent", ReactComponent);
