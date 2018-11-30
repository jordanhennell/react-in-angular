import React = require("react");
import { AngularModule } from "../app";
import { ProfileService } from "./ProfileService";
import { InjectionHelper } from "../React/Helpers";
import { NgReact } from "../React/Decorators";

@NgReact
export class ViewProfile extends React.Component {    
    render() {
        return <InjectionHelper>
            {context => <ViewProfileInner service={context.get<ProfileService>(ProfileService.name)} />}
        </InjectionHelper>
    }
}

class ViewProfileInner extends React.Component<{ service: ProfileService }> {
    componentDidMount() {
        this.service.getPosts().then(p => console.log("Posts", p));
        this.service.getComments().then(c => console.log("Comments", c));
        this.service.getProfile().then(p => console.log("Profile", p));
    }
    
    render() {        
        return <i>Profile data to go here</i>;
    }

    private get service() { return this.props.service; }
}

AngularModule.directive("viewDatabase", reactDirective => reactDirective(ViewProfile));
