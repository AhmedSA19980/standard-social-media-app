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
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AddCommentInput = {
  postId: Scalars['ID'];
  writeAComment: Scalars['String'];
};

export type Comment = {
  __typename?: 'Comment';
  author: User;
  authorId: Scalars['Float'];
  getpost: Post;
  id: Scalars['ID'];
  writeAComment: Scalars['String'];
};

export type EditPostInput = {
  field: Scalars['String'];
  postId: Scalars['Int'];
  text?: InputMaybe<Scalars['String']>;
};

export type FieldError = {
  __typename?: 'FieldError';
  Field: Scalars['String'];
  Message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  CreatePost: PostMutationResponse;
  DeletePost: Scalars['Boolean'];
  addPictureProfile: Scalars['Boolean'];
  changePassword: UserResponse;
  confirmedUser: Scalars['Boolean'];
  createComment: Comment;
  deleteComment: Scalars['Boolean'];
  deleteProfilePicture: Scalars['Boolean'];
  editComment: Comment;
  editPost: Post;
  editProfile: Profile;
  forgetPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  sendPrivateMessage: PrivateMessage;
};


export type MutationCreatePostArgs = {
  field: PostInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationAddPictureProfileArgs = {
  picture: Scalars['Upload'];
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


export type MutationSendPrivateMessageArgs = {
  data: PrivateMsgInput;
};

export type Post = {
  __typename?: 'Post';
  comments?: Maybe<Array<Comment>>;
  createdAt: Scalars['DateTime'];
  field: Scalars['String'];
  id: Scalars['ID'];
  postBelongToUser: Scalars['Float'];
  text: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type PostMutationResponse = {
  __typename?: 'PostMutationResponse';
  post?: Maybe<Post>;
};

export type Profile = {
  __typename?: 'Profile';
  bio: Scalars['String'];
  gender: Scalars['String'];
  id: Scalars['ID'];
  profilePicture: Scalars['String'];
  user: Array<User>;
};

export type Query = {
  __typename?: 'Query';
  comments: Array<Comment>;
  isLogged?: Maybe<User>;
  post?: Maybe<Post>;
  postB?: Maybe<Post>;
  posts?: Maybe<Array<Post>>;
  privateMessage?: Maybe<PrivateMessage>;
  userProfile: Profile;
  users?: Maybe<Array<User>>;
};


export type QueryPostArgs = {
  postId: Scalars['Float'];
};


export type QueryPostBArgs = {
  postId: Scalars['Float'];
};


export type QueryPostsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<Scalars['String']>;
  postId?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessage: Comment;
  newPirvateMessage: PrivateMessage;
};


export type SubscriptionNewMessageArgs = {
  postId: Scalars['ID'];
};


export type SubscriptionNewPirvateMessageArgs = {
  userId: Scalars['ID'];
};

export type UpdateProfileInput = {
  bio: Scalars['String'];
  gender: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  Profile: Array<Profile>;
  allUserPosts: Array<Post>;
  email: Scalars['String'];
  forgotPasswordLocked: Scalars['Boolean'];
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

export type PostInput = {
  field: Scalars['String'];
  text: Scalars['String'];
};

export type PrivateMessage = {
  __typename?: 'privateMessage';
  body: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  sentBy: User;
  sentById: Scalars['Float'];
  sentTo: User;
  sentToId: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  userMessages: UserMessage;
};

export type PrivateMsgInput = {
  body: Scalars['String'];
  userId: Scalars['Int'];
};

export type UserResponse = {
  __typename?: 'userResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type BasedUserInfoFragment = { __typename?: 'User', id: string, userName: string, email: string };

export type CommentListFragment = { __typename?: 'Comment', id: string, writeAComment: string, authorId: number };

export type PostListDetailFragment = { __typename?: 'Post', field: string, text: string, postBelongToUser: number, createdAt: any, updatedAt: any };

export type LoginMutationVariables = Exact<{
  userNameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'userResponse', errors?: Array<{ __typename?: 'FieldError', Field: string, Message: string }> | null, user?: { __typename?: 'User', id: string, userName: string, email: string } | null } };

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


export type AddCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', getpost: { __typename?: 'Post', postBelongToUser: number, field: string, text: string, createdAt: any, updatedAt: any, comments?: Array<{ __typename?: 'Comment', authorId: number, writeAComment: string }> | null } } };

export type CreatePostMutationVariables = Exact<{
  text: Scalars['String'];
  field: Scalars['String'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', CreatePost: { __typename?: 'PostMutationResponse', post?: { __typename?: 'Post', field: string, text: string, postBelongToUser: number, createdAt: any, updatedAt: any } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type IsLoggedQueryVariables = Exact<{ [key: string]: never; }>;


export type IsLoggedQuery = { __typename?: 'Query', isLogged?: { __typename?: 'User', id: string, userName: string, email: string } | null };

export type PostQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type PostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: string, text: string, field: string, postBelongToUser: number, createdAt: any, comments?: Array<{ __typename?: 'Comment', id: string, writeAComment: string, authorId: number }> | null } | null };

export type PostsListQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsListQuery = { __typename?: 'Query', posts?: Array<{ __typename?: 'Post', id: string, createdAt: any, field: string, text: string, postBelongToUser: number, comments?: Array<{ __typename?: 'Comment', id: string, writeAComment: string, authorId: number }> | null }> | null };

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
export const PostListDetailFragmentDoc = gql`
    fragment PostListDetail on Post {
  field
  text
  postBelongToUser
  createdAt
  updatedAt
}
    `;
export const LoginDocument = gql`
    mutation Login($userNameOrEmail: String!, $password: String!) {
  login(userNameOrEmail: $userNameOrEmail, password: $password) {
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
      postBelongToUser
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
      postBelongToUser
      createdAt
      updatedAt
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
export const IsLoggedDocument = gql`
    query isLogged {
  isLogged {
    ...basedUserInfo
  }
}
    ${BasedUserInfoFragmentDoc}`;
export type IsLoggedComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<IsLoggedQuery, IsLoggedQueryVariables>, 'query'>;

    export const IsLoggedComponent = (props: IsLoggedComponentProps) => (
      <ApolloReactComponents.Query<IsLoggedQuery, IsLoggedQueryVariables> query={IsLoggedDocument} {...props} />
    );
    

/**
 * __useIsLoggedQuery__
 *
 * To run a query within a React component, call `useIsLoggedQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsLoggedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsLoggedQuery({
 *   variables: {
 *   },
 * });
 */
export function useIsLoggedQuery(baseOptions?: Apollo.QueryHookOptions<IsLoggedQuery, IsLoggedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsLoggedQuery, IsLoggedQueryVariables>(IsLoggedDocument, options);
      }
export function useIsLoggedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsLoggedQuery, IsLoggedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsLoggedQuery, IsLoggedQueryVariables>(IsLoggedDocument, options);
        }
export type IsLoggedQueryHookResult = ReturnType<typeof useIsLoggedQuery>;
export type IsLoggedLazyQueryHookResult = ReturnType<typeof useIsLoggedLazyQuery>;
export type IsLoggedQueryResult = Apollo.QueryResult<IsLoggedQuery, IsLoggedQueryVariables>;
export const PostDocument = gql`
    query Post($id: Float!) {
  post(postId: $id) {
    id
    text
    field
    postBelongToUser
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
    id
    createdAt
    field
    text
    createdAt
    postBelongToUser
    comments {
      id
      writeAComment
      authorId
    }
  }
}
    `;
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