import { event, events, reduce, reduced } from "event-reduce";
import { IComment, IPost, IProfile } from "./ProfileService";
import { AngularModule } from "../app";

@events
class ProfileEvents {
    postsLoaded = event<Promise<IPost[]>>();
    commentsLoaded = event<Promise<IComment[]>>();
    profileLoaded = event<Promise<IProfile>>();
}

export class ProfileModel {
    events = new ProfileEvents();

    @reduced
    posts = reduce([] as IPost[], this.events)
        .on(e => e.postsLoaded.resolved(), (_, posts) => posts)
        .value;
        
    @reduced
    comments = reduce([] as IComment[], this.events)
        .on(e => e.commentsLoaded.resolved(), (_, comments) => comments)
        .value;
        
    @reduced
    profile = reduce(undefined as undefined | IProfile, this.events)
        .on(e => e.profileLoaded.resolved(), (_, profile) => profile)
        .value;
}

AngularModule.service(ProfileModel.name, ProfileModel);
