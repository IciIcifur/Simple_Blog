import {Inject, Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {
  CreatePostGQL,
  DeletePostGQL,
  EditPostGQL,
  GetAllPostsGQL,
  GetPostByIdGQL, GetPostByIdQuery,
} from './post.generated';
import {CreatePostInput, EditPostInput, PostType} from '../graphql-client';
import {BehaviorSubject, firstValueFrom, map} from 'rxjs';
import {TuiAlertService} from '@taiga-ui/core';
import {QueryRef} from "@apollo/client";

export interface PageState {
  posts: PostType[];
  selectedPostId: string;
}

let _pageState: PageState = {
  posts: [],
  selectedPostId: '',
};

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private store = new BehaviorSubject<PageState>(_pageState);
  private state$ = this.store.asObservable();

  public selectedPost$ = this.state$.pipe(
    map(
      (state) =>
        state.posts.find((post) => post.id == state.selectedPostId) || null,
    ),
  );

  public allPosts$ = this.state$.pipe(map((state) =>
    [...state.posts].reverse().filter((post) => post.id !== _pageState.selectedPostId)
  ));

  public selectPost(id: string) {
    this.store.next((_pageState = {..._pageState, selectedPostId: id}));
  }

  //private getPostByIdQuery;
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
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
  ) {
    /* Temporarily isn't needed
    this.getPostByIdQuery = getPostByIdGQL.watch({ id: 1 });
    this.getPostByIdQuery.valueChanges.subscribe((data) => {
      if (data.data.post) {
        const selectedPostId = data.data.post.id;
        this.store.next((_pageState = { ..._pageState, selectedPostId }));
      }
    });*/

    this.getAllPostsQuery = getAllPostsGQL.watch();
    this.getAllPostsQuery.valueChanges.subscribe(({data}) => {
      if (data.posts) {
        const posts = <PostType[]>data.posts;
        this.store.next((_pageState = {..._pageState, posts}));
      }
    });
  }

  /*
  public async getPostById(id: string) {
    try {
      await this.getPostByIdQuery.refetch({id: Number(id)});
    } catch (e) {
      this.alerts
        .open(<string>e, {label: 'Ошибка', status: 'error'})
        .subscribe(() => {
        });
    }
  }*/

  public async createPost(input: CreatePostInput) {
    try {
      const data = await firstValueFrom(
        this.createPostGQL.mutate({
          input: input,
        }),
      );

      if (data.data?.createPost?.ok) {
        const post = <PostType>data.data.createPost.post;
        this.store.next(
          (_pageState = {..._pageState, posts: [..._pageState.posts, post]}),
        );
        this.alerts
          .open('Пост опубликован.', {label: 'Сохранено', status: 'success'})
          .subscribe(() => {
          });
      }
    } catch (e) {
      this.alerts
        .open(<string>e, {label: 'Ошибка', status: 'error'})
        .subscribe(() => {
        });
    }
  }

  public async editPost(input: EditPostInput) {
    input = {...input, id: Number(_pageState.selectedPostId)}
    try {
      const data = await firstValueFrom(
        this.editPostByIdGQL.mutate({
          input: input,
        }),
      );

      if (data.data?.editPost?.ok) {
        const posts = _pageState.posts.map((post) =>
          Number(post.id) == input.id
            ? {
              ...post,
              title: input.title ? input.title : post.title,
              content: input.content ? input.content : post.content,
            }
            : post,
        );
        this.store.next(
          (_pageState = {..._pageState, posts, selectedPostId: ''}),
        );
        this.alerts
          .open('Пост успешно отредактирован.', {
            label: 'Сохранено',
            status: 'success',
          })
          .subscribe(() => {
          });
      }
    } catch (e) {
      this.alerts
        .open(<string>e, {label: 'Ошибка', status: 'error'})
        .subscribe(() => {
        });
    }
  }

  public async deletePost(id: string) {
    try {
      const data = await firstValueFrom(
        this.deletePostByIdGQL.mutate({
          id: Number(id),
        }),
      );

      if (data.data?.deletePost?.ok) {
        const posts = _pageState.posts.filter((post) => post.id !== id);
        this.store.next((_pageState = {..._pageState, posts}));
        this.alerts
          .open('Пост был успешно удален.', {
            label: 'Пост удален',
            status: 'success',
          })
          .subscribe(() => {
          });
      }
    } catch (e) {
      this.alerts
        .open(<string>e, {label: 'Ошибка', status: 'error'})
        .subscribe(() => {
        });
    }
  }
}
