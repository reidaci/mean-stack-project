import { Post } from "./post.model"
import { Subject } from 'rxjs'
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({ providedIn: 'root' })
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>()


    constructor(private http: HttpClient) { }


    getPosts() {
        this.http.get<{ id: null, message: string, posts: Post[] }>('http://localhost:3000/api/posts').subscribe((postData) => {
            this.posts = postData.posts
            this.postsUpdated.next([...this.posts])
        })
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable()
    }

    addPost(title: string, content: string) {

        const post: Post = {
            title: title, content: content,
            id: null
        }
        this.http.post<{ message: string }>('http://localhost:3000/api/posts', post).subscribe((responseData) => {
            console.log(responseData.message);
            this.posts.push(post)
            this.postsUpdated.next([...this.posts])
        })


    }
}