import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  CreatePostGQL,
  DeletePostGQL,
  EditPostGQL,
  GetAllPostsGQL,
  GetPostByIdGQL,
} from './post.generated';
import { CreatePostInput, EditPostInput, PostType } from '../graphql-client';

export interface pageState {
  posts: PostType[];
  selectedPostId: number;
}

let _pageState: pageState = {
  posts: [],
  selectedPostId: 1,
};

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private getPostByIdQuery;
  private getAllPostsQuery;

  constructor(
    // MUTATIONS
    private createPostGQL: CreatePostGQL,
    private editPostByIdGQL: EditPostGQL,
    private deletePostByIdGQL: DeletePostGQL,
    // QUERIES
    private getPostByIdGQL: GetPostByIdGQL,
    private getAllPostsGQL: GetAllPostsGQL,
    // OTHER
    private apollo: Apollo,
  ) {
    this.getPostByIdQuery = getPostByIdGQL.watch({ id: 1 });
    this.getPostByIdQuery.valueChanges.subscribe((data) =>
      console.log(data.data),
    );

    this.getAllPostsQuery = getAllPostsGQL.watch();
    this.getAllPostsQuery.valueChanges.subscribe((data) =>
      console.log(data.data),
    );
  }

  public async getPostById(id: number) {
    try {
      await this.getPostByIdQuery.refetch({ id });
    } catch (e) {
      console.log('Произошла ошибка: ' + e);
    }
  }

  public createPost(input: CreatePostInput) {
    try {
      this.createPostGQL.mutate({
        input: input,
      });
    } catch (e) {
      console.log('Произошла ошибка при создании поста: ' + e);
    }
  }

  public editPost(input: EditPostInput) {
    try {
      this.editPostByIdGQL.mutate({
        input: input,
      });
    } catch (e) {
      console.log('Произошла ошибка при изменении поста: ' + e);
    }
  }

  public deletePost(id: number) {
    try {
      this.deletePostByIdGQL.mutate({
        id,
      });
    } catch (e) {
      console.log('Произошла ошибка при удалении поста: ' + e);
    }
  }
}
