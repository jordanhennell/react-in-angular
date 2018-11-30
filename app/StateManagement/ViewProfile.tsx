import React = require("react");
import { NgReact } from "../React/NgReactDecorator";
import { ProfileService } from "./ProfileService";

@NgReact([ProfileService])
export class ViewProfile extends React.Component<{ ProfileService: ProfileService }> {    
    componentDidMount() {
        this.service.getPosts().then(p => console.log("Posts", p));
        this.service.getComments().then(c => console.log("Comments", c));
        this.service.getProfile().then(p => console.log("Profile", p));
    }
    
    render() {        
        return <i>Profile data to go here</i>;
    }

    private get service() { return this.props.ProfileService; }
}
