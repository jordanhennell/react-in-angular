import { AngularModule } from "../app";

interface IPost {
    id: number,
    title: string,
    author: string
}

interface IComment {
    id: number,
    body: string,
    postId: number
}

interface IProfile {
    name: string
}

const serverUri = "http://localhost:3000";

export class ProfileService {
    getPosts() {
        return this.fetch<IPost[]>("/posts");
    }

    getComments() {
        return this.fetch<IComment[]>("/comments");
    }

    getProfile() {
        return this.fetch<IProfile[]>("/profile");
    }

    private async fetch<T>(path: string) {
        let response = await fetch(serverUri + path);
        return JSON.parse(await response.text()) as T;
    }
}

AngularModule.service(ProfileService.name, ProfileService);
