import React = require("react");
import { observer } from "mobx-react";
import { NgReact } from "../React/NgReactDecorator";
import { ProfileModel } from "./ProfileModel";
import { ProfileService } from "./ProfileService";
import { AngularWrapper } from "../React/AngularWrapper";
import { AngularModule } from "../app";

@observer
@NgReact([ProfileService, ProfileModel])
export class ViewProfile extends React.Component<{ ProfileService: ProfileService, ProfileModel: ProfileModel }> {
    componentDidMount() {
        this.model.events.postsLoaded(this.service.getPosts());
        this.model.events.commentsLoaded(this.service.getComments());
        this.model.events.profileLoaded(this.service.getProfile());
    }

    render() {
        return <>
            <h4>Using event-reduce and MobX</h4>
            <div>Posts: {JSON.stringify(this.model.posts)}</div>
            <div>Comments: {JSON.stringify(this.model.comments)}</div>
            <div>Profile: {JSON.stringify(this.model.profile)}</div>
            <div>React says loading is {!this.model.loadingComplete && "not "}done</div>
            <AngularWrapper>{
                `<angular-is-done is-done="${this.model.loadingComplete}"></angular-is-done>`
            }</AngularWrapper>
        </>;
    }

    private get service() { return this.props.ProfileService; }
    private get model() { return this.props.ProfileModel; }
}

export class AngularIsDoneComponent implements ng.IComponentOptions {
    template = "<div>Angular says loading is {{ !$ctrl.isDone ? 'not ' : '' }}done</div>";
    bindings = {
        isDone: "<"
    };
}

AngularModule.component("angularIsDone", new AngularIsDoneComponent());
