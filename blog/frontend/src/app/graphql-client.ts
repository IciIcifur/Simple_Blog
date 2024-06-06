export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
};

export type CreatePost = {
  __typename?: 'CreatePost';
  ok?: Maybe<Scalars['Boolean']['output']>;
  post?: Maybe<PostType>;
};

export type CreatePostInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['Date']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type DeletePostById = {
  __typename?: 'DeletePostById';
  ok?: Maybe<Scalars['Boolean']['output']>;
};

export type EditPostById = {
  __typename?: 'EditPostById';
  ok?: Maybe<Scalars['Boolean']['output']>;
};

export type EditPostInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost?: Maybe<CreatePost>;
  deletePost?: Maybe<DeletePostById>;
  editPost?: Maybe<EditPostById>;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['Int']['input'];
};


export type MutationEditPostArgs = {
  input?: InputMaybe<EditPostInput>;
};

export type PostType = {
  __typename?: 'PostType';
  content: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  post?: Maybe<PostType>;
  posts?: Maybe<Array<Maybe<PostType>>>;
};


export type QueryPostArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};
