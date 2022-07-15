import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/client/react/components';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type AddCommentInput = {
  postId: Scalars['ID'];
  writeAComment: Scalars['String'];
};

export type Comment = {
  __typename?: 'Comment';
  author: User;
  authorId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  getpost: Post;
  id: Scalars['ID'];
  postId: Scalars['String'];
  user: User;
  writeAComment: Scalars['String'];
};

export type EditPostInput = {
  field: Scalars['String'];
  postId: Scalars['ID'];
  text?: InputMaybe<Scalars['String']>;
};

export type FieldError = {
  __typename?: 'FieldError';
  Field: Scalars['String'];
  Message: Scalars['String'];
};

export type FollowData = {
  __typename?: 'FollowData';
  followers: Array<User>;
  followings: Array<User>;
};

export enum Gender {
  Female = 'Female',
  Male = 'Male'
}

export type Mutation = {
  __typename?: 'Mutation';
  CreatePost: PostMutationResponse;
  DeletePost: Scalars['Boolean'];
  changePassword: UserResponse;
  confirmedUser: Scalars['Boolean'];
  createComment: Comment;
  deleteComment: Scalars['Boolean'];
  editComment: Comment;
  editPost: Post;
  editProfile: Profile;
  forgetPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  revokeRefreshTokensForUser: Scalars['Boolean'];
  sendPrivateMessage: PrivateMessage;
  toggleFollow: Scalars['Boolean'];
  toggleLike: Scalars['Boolean'];
};


export type MutationCreatePostArgs = {
  field: PostInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationConfirmedUserArgs = {
  token: Scalars['String'];
};


export type MutationCreateCommentArgs = {
  option: AddCommentInput;
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['Float'];
};


export type MutationEditCommentArgs = {
  option: EditCommentInput;
};


export type MutationEditPostArgs = {
  data: EditPostInput;
};


export type MutationEditProfileArgs = {
  data: UpdateProfileInput;
};


export type MutationForgetPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  userNameOrEmail: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UserInput;
};


export type MutationRevokeRefreshTokensForUserArgs = {
  userId: Scalars['String'];
};


export type MutationSendPrivateMessageArgs = {
  data: PrivateMsgInput;
};


export type MutationToggleFollowArgs = {
  followingUserId: Scalars['ID'];
};


export type MutationToggleLikeArgs = {
  postId: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  author: User;
  commentCount: Scalars['Float'];
  comments?: Maybe<Array<Comment>>;
  createdAt: Scalars['DateTime'];
  field: Scalars['String'];
  id: Scalars['ID'];
  likeCount: Scalars['Float'];
  postOwner: Scalars['ID'];
  text: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userLike: Scalars['Boolean'];
};

export type PostInput = {
  field: Scalars['String'];
  text: Scalars['String'];
};

export type PostMutationResponse = {
  __typename?: 'PostMutationResponse';
  author?: Maybe<User>;
  errors?: Maybe<Array<FieldError>>;
  post?: Maybe<Post>;
};

export type Profile = {
  __typename?: 'Profile';
  bio: Scalars['String'];
  gender: Scalars['String'];
  id: Scalars['ID'];
  profile: Profile;
  profileOwner: Scalars['ID'];
  profilePicture: Scalars['String'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  bye: Scalars['String'];
  comments: Array<Comment>;
  commnets: Scalars['String'];
  getFollows?: Maybe<FollowData>;
  me?: Maybe<User>;
  post?: Maybe<Post>;
  posts?: Maybe<Array<Post>>;
  privateMessage?: Maybe<PrivateMessage>;
  userProfile: Profile;
  users?: Maybe<Array<User>>;
};


export type QueryGetFollowsArgs = {
  userId: Scalars['String'];
};


export type QueryPostArgs = {
  postId: Scalars['Float'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessage: Comment;
  newPirvateMessage: PrivateMessage;
};


export type SubscriptionNewMessageArgs = {
  postId: Scalars['String'];
};


export type SubscriptionNewPirvateMessageArgs = {
  userId: Scalars['ID'];
};

export type UpdateProfileInput = {
  bio: Scalars['String'];
  gender?: InputMaybe<Gender>;
};

export type User = {
  __typename?: 'User';
  Profile: Profile;
  allUserPosts: Array<Post>;
  confirmed: Scalars['Boolean'];
  email: Scalars['String'];
  forgotPasswordLocked: Scalars['Boolean'];
  gender: Scalars['String'];
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  privateMessages: Array<PrivateMessage>;
  userName: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  userName: Scalars['String'];
};

export type UserMessage = {
  __typename?: 'UserMessage';
  isUnread: Scalars['Boolean'];
  message: PrivateMessage;
  user: User;
};

export type EditCommentInput = {
  commentId: Scalars['Int'];
  editComment: Scalars['String'];
};

export type PrivateMessage = {
  __typename?: 'privateMessage';
  body: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  sentBy: User;
  sentById: Scalars['String'];
  sentTo: User;
  sentToId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userMessages: UserMessage;
};

export type PrivateMsgInput = {
  body: Scalars['String'];
  recieveUserId: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'userResponse';
  accessToken: Scalars['String'];
  errors?: Maybe<Array<FieldError>>;
  profile?: Maybe<Profile>;
  user?: Maybe<User>;
};

export type BasedUserInfoFragment = { __typename?: 'User', id: string, userName: string, email: string };

export type CommentListFragment = { __typename?: 'Comment', id: string, writeAComment: string, authorId: string };

export type PostsListFragment = { __typename?: 'Post', id: string, postOwner: string, field: string, text: string, userLike: boolean, likeCount: number, commentCount: number, createdAt: any, updatedAt: any, comments?: Array<{ __typename?: 'Comment', id: string, writeAComment: string, authorId: string, createdAt: any, user: { __typename?: 'User', userName: string, email: string } }> | null, author: { __typename?: 'User', id: string, userName: string, email: string } };

export type LoginMutationVariables = Exact<{
  userNameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'userResponse', accessToken: string, errors?: Array<{ __typename?: 'FieldError', Field: string, Message: string }> | null, user?: { __typename?: 'User', id: string, userName: string, email: string } | null } };

export type RegisterMutationVariables = Exact<{
  userName: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'userResponse', errors?: Array<{ __typename?: 'FieldError', Field: string, Message: string }> | null, user?: { __typename?: 'User', id: string, userName: string, email: string } | null } };

export type AddCommentMutationVariables = Exact<{
  writeAComment: Scalars['String'];
  postId: Scalars['ID'];
}>;


export type AddCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', getpost: { __typename?: 'Post', field: string, text: string, createdAt: any, updatedAt: any, comments?: Array<{ __typename?: 'Comment', authorId: string, writeAComment: string }> | null } } };

export type CreatePostMutationVariables = Exact<{
  text: Scalars['String'];
  field: Scalars['String'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', CreatePost: { __typename?: 'PostMutationResponse', post?: { __typename?: 'Post', field: string, text: string, createdAt: any, updatedAt: any } | null, author?: { __typename?: 'User', userName: string, email: string } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, userName: string, email: string } | null };

export type PostQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type PostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: string, text: string, field: string, createdAt: any, comments?: Array<{ __typename?: 'Comment', id: string, writeAComment: string, authorId: string }> | null } | null };

export type PostsListQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsListQuery = { __typename?: 'Query', posts?: Array<{ __typename?: 'Post', id: string, postOwner: string, field: string, text: string, userLike: boolean, likeCount: number, commentCount: number, createdAt: any, updatedAt: any, comments?: Array<{ __typename?: 'Comment', id: string, writeAComment: string, authorId: string, createdAt: any, user: { __typename?: 'User', userName: string, email: string } }> | null, author: { __typename?: 'User', id: string, userName: string, email: string } }> | null };

export type UserProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type UserProfileQuery = { __typename?: 'Query', userProfile: { __typename?: 'Profile', id: string, bio: string, gender: string } };

export const BasedUserInfoFragmentDoc = gql`
    fragment basedUserInfo on User {
  id
  userName
  email
}
    `;
export const CommentListFragmentDoc = gql`
    fragment CommentList on Comment {
  id
  writeAComment
  authorId
}
    `;
export const PostsListFragmentDoc = gql`
    fragment PostsList on Post {
  id
  postOwner
  field
  text
  userLike
  likeCount
  commentCount
  createdAt
  updatedAt
  comments {
    id
    writeAComment
    authorId
    createdAt
    user {
      userName
      email
    }
  }
  author {
    id
    userName
    email
  }
}
    `;
export const LoginDocument = gql`
    mutation Login($userNameOrEmail: String!, $password: String!) {
  login(userNameOrEmail: $userNameOrEmail, password: $password) {
    accessToken
    errors {
      Field
      Message
    }
    user {
      ...basedUserInfo
    }
  }
}
    ${BasedUserInfoFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;
export type LoginComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LoginMutation, LoginMutationVariables>, 'mutation'>;

    export const LoginComponent = (props: LoginComponentProps) => (
      <ApolloReactComponents.Mutation<LoginMutation, LoginMutationVariables> mutation={LoginDocument} {...props} />
    );
    

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      userNameOrEmail: // value for 'userNameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($userName: String!, $password: String!, $email: String!) {
  register(options: {userName: $userName, password: $password, email: $email}) {
    errors {
      Field
      Message
    }
    user {
      ...basedUserInfo
    }
  }
}
    ${BasedUserInfoFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;
export type RegisterComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<RegisterMutation, RegisterMutationVariables>, 'mutation'>;

    export const RegisterComponent = (props: RegisterComponentProps) => (
      <ApolloReactComponents.Mutation<RegisterMutation, RegisterMutationVariables> mutation={RegisterDocument} {...props} />
    );
    

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      userName: // value for 'userName'
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const AddCommentDocument = gql`
    mutation AddComment($writeAComment: String!, $postId: ID!) {
  createComment(option: {writeAComment: $writeAComment, postId: $postId}) {
    getpost {
      field
      text
      createdAt
      updatedAt
      comments {
        authorId
        writeAComment
      }
    }
  }
}
    `;
export type AddCommentMutationFn = Apollo.MutationFunction<AddCommentMutation, AddCommentMutationVariables>;
export type AddCommentComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddCommentMutation, AddCommentMutationVariables>, 'mutation'>;

    export const AddCommentComponent = (props: AddCommentComponentProps) => (
      <ApolloReactComponents.Mutation<AddCommentMutation, AddCommentMutationVariables> mutation={AddCommentDocument} {...props} />
    );
    

/**
 * __useAddCommentMutation__
 *
 * To run a mutation, you first call `useAddCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCommentMutation, { data, loading, error }] = useAddCommentMutation({
 *   variables: {
 *      writeAComment: // value for 'writeAComment'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useAddCommentMutation(baseOptions?: Apollo.MutationHookOptions<AddCommentMutation, AddCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCommentMutation, AddCommentMutationVariables>(AddCommentDocument, options);
      }
export type AddCommentMutationHookResult = ReturnType<typeof useAddCommentMutation>;
export type AddCommentMutationResult = Apollo.MutationResult<AddCommentMutation>;
export type AddCommentMutationOptions = Apollo.BaseMutationOptions<AddCommentMutation, AddCommentMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($text: String!, $field: String!) {
  CreatePost(field: {text: $text, field: $field}) {
    post {
      field
      text
      createdAt
      updatedAt
    }
    author {
      userName
      email
    }
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;
export type CreatePostComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreatePostMutation, CreatePostMutationVariables>, 'mutation'>;

    export const CreatePostComponent = (props: CreatePostComponentProps) => (
      <ApolloReactComponents.Mutation<CreatePostMutation, CreatePostMutationVariables> mutation={CreatePostDocument} {...props} />
    );
    

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      text: // value for 'text'
 *      field: // value for 'field'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;
export type LogoutComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LogoutMutation, LogoutMutationVariables>, 'mutation'>;

    export const LogoutComponent = (props: LogoutComponentProps) => (
      <ApolloReactComponents.Mutation<LogoutMutation, LogoutMutationVariables> mutation={LogoutDocument} {...props} />
    );
    

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query me {
  me {
    ...basedUserInfo
  }
}
    ${BasedUserInfoFragmentDoc}`;
export type MeComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MeQuery, MeQueryVariables>, 'query'>;

    export const MeComponent = (props: MeComponentProps) => (
      <ApolloReactComponents.Query<MeQuery, MeQueryVariables> query={MeDocument} {...props} />
    );
    

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const PostDocument = gql`
    query Post($id: Float!) {
  post(postId: $id) {
    id
    text
    field
    createdAt
    comments {
      id
      writeAComment
      authorId
    }
  }
}
    `;
export type PostComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<PostQuery, PostQueryVariables>, 'query'> & ({ variables: PostQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const PostComponent = (props: PostComponentProps) => (
      <ApolloReactComponents.Query<PostQuery, PostQueryVariables> query={PostDocument} {...props} />
    );
    

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, options);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export const PostsListDocument = gql`
    query PostsList {
  posts {
    ...PostsList
  }
}
    ${PostsListFragmentDoc}`;
export type PostsListComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<PostsListQuery, PostsListQueryVariables>, 'query'>;

    export const PostsListComponent = (props: PostsListComponentProps) => (
      <ApolloReactComponents.Query<PostsListQuery, PostsListQueryVariables> query={PostsListDocument} {...props} />
    );
    

/**
 * __usePostsListQuery__
 *
 * To run a query within a React component, call `usePostsListQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsListQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostsListQuery(baseOptions?: Apollo.QueryHookOptions<PostsListQuery, PostsListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsListQuery, PostsListQueryVariables>(PostsListDocument, options);
      }
export function usePostsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsListQuery, PostsListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsListQuery, PostsListQueryVariables>(PostsListDocument, options);
        }
export type PostsListQueryHookResult = ReturnType<typeof usePostsListQuery>;
export type PostsListLazyQueryHookResult = ReturnType<typeof usePostsListLazyQuery>;
export type PostsListQueryResult = Apollo.QueryResult<PostsListQuery, PostsListQueryVariables>;
export const UserProfileDocument = gql`
    query UserProfile {
  userProfile {
    id
    bio
    gender
  }
}
    `;
export type UserProfileComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<UserProfileQuery, UserProfileQueryVariables>, 'query'>;

    export const UserProfileComponent = (props: UserProfileComponentProps) => (
      <ApolloReactComponents.Query<UserProfileQuery, UserProfileQueryVariables> query={UserProfileDocument} {...props} />
    );
    

/**
 * __useUserProfileQuery__
 *
 * To run a query within a React component, call `useUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserProfileQuery(baseOptions?: Apollo.QueryHookOptions<UserProfileQuery, UserProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserProfileQuery, UserProfileQueryVariables>(UserProfileDocument, options);
      }
export function useUserProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserProfileQuery, UserProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserProfileQuery, UserProfileQueryVariables>(UserProfileDocument, options);
        }
export type UserProfileQueryHookResult = ReturnType<typeof useUserProfileQuery>;
export type UserProfileLazyQueryHookResult = ReturnType<typeof useUserProfileLazyQuery>;
export type UserProfileQueryResult = Apollo.QueryResult<UserProfileQuery, UserProfileQueryVariables>;