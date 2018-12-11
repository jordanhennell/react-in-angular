import { Component } from "../Angular/AngularDecorators";
import { ProfileModel } from "./ProfileModel";

@Component("viewProfileAngular", [ProfileModel], {
    template: `<div mobx-autorun>
        <h4>Angular using event-reduce and MobX</h4>
        <div>Posts: {{$ctrl.model.posts | json }}</div>
        <div>Comments: {{$ctrl.model.comments | json }}</div>
        <div>Profile: {{$ctrl.model.profile | json }}</div>
        <div>Angular says loading is {{ !$ctrl.model.loadingComplete ? 'not ' : '' }}done</div>
        <react-is-done is-done="$ctrl.model.loadingComplete"></react-is-done>
    </div>`
})
class ViewProfileAngularController implements ng.IComponentController {
    model: ProfileModel;

    constructor(model: ProfileModel) {
        this.model = model;
    }
}