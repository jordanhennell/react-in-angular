import React = require("react");
import { observer } from "mobx-react";
import { Component } from "../Angular/AngularDecorators";
import { AngularWrapper } from "../React/AngularWrapper";
import { NgReact } from "../React/NgReactDecorator";
import { ProfileModel } from "./ProfileModel";
import { ProfileService } from "./ProfileService";

@observer
@NgReact([ProfileService, ProfileModel])
class ViewProfileReact extends React.Component<{ ProfileService: ProfileService, ProfileModel: ProfileModel }> {
    componentDidMount() {
        this.model.events.postsLoaded(this.service.getPosts());
        this.model.events.commentsLoaded(this.service.getComments());
        this.model.events.profileLoaded(this.service.getProfile());
    }

    render() {
        return <>
            <h4>React using event-reduce and MobX</h4>
            <div>Posts: {JSON.stringify(this.model.posts)}</div>
            <div>Comments: {JSON.stringify(this.model.comments)}</div>
            <div>Profile: {JSON.stringify(this.model.profile)}</div>
            <ReactIsDone isDone={this.model.loadingComplete} />
            <AngularWrapper>{
                `<angular-is-done is-done="${this.model.loadingComplete}"></angular-is-done>`
            }</AngularWrapper>
        </>;
    }

    private get service() { return this.props.ProfileService; }
    private get model() { return this.props.ProfileModel; }
}

@NgReact
class ReactIsDone extends React.Component<{ isDone: boolean }> {
    render() {
        return <div>React says loading is {!this.props.isDone && "not "}done</div>
    }
}

@Component("angularIsDone", {
    template: "<div>Angular says loading is {{ !$ctrl.isDone ? 'not ' : '' }}done</div>",
    bindings: {
        isDone: "<"
    }
})
class AngularIsDone implements ng.IComponentController { }
