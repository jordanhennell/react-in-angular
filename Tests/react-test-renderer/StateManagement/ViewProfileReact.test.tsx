import { create } from "react-test-renderer";
import { ProfileEvents, ProfileModel } from "../../../App/src/StateManagement/ProfileModel";
import { IComment, IPost, IProfile, ProfileService } from "../../../App/src/StateManagement/ProfileService";
import { ViewProfileReact } from "../../../App/src/StateManagement/ViewProfileReact";
import { jestMockObject } from "../utils";
import React = require("react");

jest.mock('../../../App/src/React/AngularWrapper');

describe(ViewProfileReact.name, () => {
    let posts = Promise.resolve<IPost[]>([
        { id: 1, author: "author1", title: "first post" },
        { id: 1, author: "author1", title: "second post" },
        { id: 1, author: "author2", title: "foo" },
        { id: 1, author: "author2", title: "bar" },
    ]);
    let comments = Promise.resolve<IComment[]>([
        { id: 1, postId: 1, body: "comment on post 1" },
        { id: 2, postId: 1, body: "another comment on post 1" }
    ]);
    let profile = Promise.resolve<IProfile>({ name: "profile" });
    let service = jestMockObject(ProfileService, { 
        getPosts: () => posts,
        getComments: () => comments,
        getProfile: () => profile
    });
    let events = jestMockObject(ProfileEvents);
    let model = jestMockObject(ProfileModel);
    model.events = events;
    
    let sut = create(<ViewProfileReact ProfileService={service} ProfileModel={model} />);

    it("starts loading when component mounts", () => {
        expect(service.getPosts).toBeCalled();
        expect(model.events.postsLoaded).toBeCalledWith(posts);
        expect(service.getComments).toBeCalled();
        expect(model.events.commentsLoaded).toBeCalledWith(comments);
        expect(service.getProfile).toBeCalled();
        expect(model.events.profileLoaded).toBeCalledWith(profile);
    });
});
