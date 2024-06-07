import * as Types from '../graphql-client';

import * as Apollo from 'apollo-angular';
import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';

export type GetPostByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type GetPostByIdQuery = {
  post?: { title: string; content: string; date: any; id: string } | null;
};

export type GetAllPostsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetAllPostsQuery = {
  posts?: Array<{
    title: string;
    content: string;
    date: any;
    id: string;
  } | null> | null;
};

export type CreatePostMutationVariables = Types.Exact<{
  input: Types.CreatePostInput;
}>;

export type CreatePostMutation = {
  createPost?: { ok?: boolean | null; post?: { id: string } | null } | null;
};

export type EditPostMutationVariables = Types.Exact<{
  input: Types.EditPostInput;
}>;

export type EditPostMutation = { editPost?: { ok?: boolean | null } | null };

export type DeletePostMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;

export type DeletePostMutation = {
  deletePost?: { ok?: boolean | null } | null;
};

export const GetPostByIdDocument = gql`
  query getPostById($id: Int!) {
    post(id: $id) {
      title
      content
      date
      id
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class GetPostByIdGQL extends Apollo.Query<
  GetPostByIdQuery,
  GetPostByIdQueryVariables
> {
  document = GetPostByIdDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

export const GetAllPostsDocument = gql`
  query getAllPosts {
    posts {
      title
      content
      date
      id
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class GetAllPostsGQL extends Apollo.Query<
  GetAllPostsQuery,
  GetAllPostsQueryVariables
> {
  document = GetAllPostsDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

export const CreatePostDocument = gql`
  mutation createPost($input: CreatePostInput!) {
    createPost(input: $input) {
      ok
      post {
        id
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CreatePostGQL extends Apollo.Mutation<
  CreatePostMutation,
  CreatePostMutationVariables
> {
  document = CreatePostDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

export const EditPostDocument = gql`
  mutation editPost($input: EditPostInput!) {
    editPost(input: $input) {
      ok
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class EditPostGQL extends Apollo.Mutation<
  EditPostMutation,
  EditPostMutationVariables
> {
  document = EditPostDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}

export const DeletePostDocument = gql`
  mutation deletePost($id: Int!) {
    deletePost(id: $id) {
      ok
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class DeletePostGQL extends Apollo.Mutation<
  DeletePostMutation,
  DeletePostMutationVariables
> {
  document = DeletePostDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
