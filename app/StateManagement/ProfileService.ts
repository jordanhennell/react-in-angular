import { Service } from "../Angular/AngularDecorators";

const serverUri = "http://localhost:3000";

@Service
export class ProfileService {
    getPosts() {
        return this.fetch<IPost[]>("/posts");
    }

    getComments() {
        return this.fetch<IComment[]>("/comments");
    }

    getProfile() {
        return this.fetch<IProfile>("/profile")
            .then(p => new Promise<IProfile>(resolve => setTimeout(() => resolve(p), 5000))); // delay for testing
    }

    private async fetch<T>(path: string) {
        let response = await fetch(serverUri + path);
        return JSON.parse(await response.text()) as T;
    }
}

export interface IPost {
    id: number,
    title: string,
    author: string
}

export interface IComment {
    id: number,
    body: string,
    postId: number
}

export interface IProfile {
    name: string
}
