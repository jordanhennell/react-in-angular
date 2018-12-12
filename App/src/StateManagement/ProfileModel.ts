import { event, events, reduce, reduced } from "event-reduce";
import { Service } from "../Angular/AngularDecorators";
import { IComment, IPost, IProfile } from "./ProfileService";

@events
class ProfileEvents {
    postsLoaded = event<Promise<IPost[]>>();
    commentsLoaded = event<Promise<IComment[]>>();
    profileLoaded = event<Promise<IProfile>>();
    toggleChecked = event();
}

@Service
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

    @reduced
    get loadingComplete() {
        return this.postsLoaded
            && this.commentsLoaded
            && this.profileLoaded;
    }

    @reduced
    private postsLoaded = reduce(false, this.events)
        .on(e => e.postsLoaded.resolved(), () => true)
        .value;

    @reduced
    private commentsLoaded = reduce(false, this.events)
        .on(e => e.commentsLoaded.resolved(), () => true)
        .value;

    @reduced
    private profileLoaded = reduce(false, this.events)
        .on(e => e.profileLoaded.resolved(), () => true)
        .value;

    @reduced
    isChecked = reduce(false, this.events)
        .on(e => e.toggleChecked, t => !t)
        .value;
}
