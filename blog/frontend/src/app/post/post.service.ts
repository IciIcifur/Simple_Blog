import {Injectable} from '@angular/core';
import {Apollo} from "apollo-angular";
import {QueryRef} from "@apollo/client";
import {
  CreatePostGQL,
  GetAllPostsGQL,
  GetPostByIdGQL,
  GetPostByIdQuery,
  GetPostByIdQueryVariables
} from "./post.generated";
import {PostInput, PostType} from "../graphql-client";

export interface pageState {
  posts: PostType[]
  selectedPostId: number
}

let _pageState: pageState = {
  posts: [],
  selectedPostId: 1
}

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private getPostByIdQuery;
  private getAllPostsQuery;

  constructor(
    // MUTATIONS
    private createPostByIdGQL: CreatePostGQL,
    // QUERIES
    private getPostByIdGQL: GetPostByIdGQL,
    private getAllPostsGQL: GetAllPostsGQL,
    // OTHER
    private apollo: Apollo) {
    this.getPostByIdQuery = getPostByIdGQL.watch({id: 1});
    this.getPostByIdQuery.valueChanges.subscribe((data) => console.log(data.data))

    this.getAllPostsQuery = getAllPostsGQL.watch();
    this.getAllPostsQuery.valueChanges.subscribe((data) => console.log(data.data))
  }

  public async getPostById(id: number) {
    try {
      await this.getPostByIdQuery.refetch({id})
    } catch (e) {
      console.log('Not found: ' + e)
    }
  }

  public createPost(input: PostInput) {
    try {
      this.createPostByIdGQL.mutate(
        {
          input: input
        });


    } catch (e) {
      console.log('Произошла ошибка: ' + e)
    }
  }
}
