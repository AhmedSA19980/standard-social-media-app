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
};

export type FieldError = {
  __typename?: 'FieldError';
  Field: Scalars['String'];
  Message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  CreatePost: Post;
  DeletePost: Post;
  UpdatePost: Post;
  changePassword: UserResponse;
  forgetPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
};


export type MutationCreatePostArgs = {
  text: PostInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  id: Scalars['String'];
  text: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
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

export type Post = {
  __typename?: 'Post';
  field: Scalars['String'];
  id: Scalars['ID'];
  likes: Scalars['Float'];
  postBelongToUser: Scalars['String'];
  text: Scalars['String'];
};

export type Profile = {
  __typename?: 'Profile';
  bio: Scalars['String'];
  followers: Scalars['Float'];
  following: Scalars['Float'];
  id: Scalars['ID'];
  url: Scalars['String'];
  userName: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  commnets: Scalars['String'];
  isLogged?: Maybe<User>;
  post?: Maybe<Post>;
  posts: Array<Post>;
  profiles: Array<Profile>;
};


export type QueryPostArgs = {
  id: Scalars['String'];
};


export type QueryPostsArgs = {
  post: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  Profile: Profile;
  confirmed: Scalars['Boolean'];
  email: Scalars['String'];
  forgotPasswordLocked: Scalars['Boolean'];
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  posts: Array<Post>;
  userName: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  userName: Scalars['String'];
};

export type PostInput = {
  field: Scalars['String'];
  likes: Scalars['Float'];
  text: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'userResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type BasedUserInfoFragment = { __typename?: 'User', id: string, userName: string, email: string };

export type LoginMutationVariables = Exact<{
  userNameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'userResponse', errors?: Array<{ __typename?: 'FieldError', Field: string, Message: string }> | null, user?: { __typename?: 'User', id: string, userName: string, email: string } | null } };

export type CreatePostMutationVariables = Exact<{
  text: PostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', CreatePost: { __typename?: 'Post', text: string, postBelongToUser: string, likes: number } };

export type RegisterMutationVariables = Exact<{
  userName: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'userResponse', errors?: Array<{ __typename?: 'FieldError', Field: string, Message: string }> | null, user?: { __typename?: 'User', id: string, userName: string, email: string } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type IsLoggedQueryVariables = Exact<{ [key: string]: never; }>;


export type IsLoggedQuery = { __typename?: 'Query', isLogged?: { __typename?: 'User', id: string, userName: string, email: string } | null };

export type PostQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type PostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: string, text: string, postBelongToUser: string, likes: number } | null };

export const BasedUserInfoFragmentDoc = gql`
    fragment basedUserInfo on User {
  id
  userName
  email
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
export const CreatePostDocument = gql`
    mutation CreatePost($text: postInput!) {
  CreatePost(text: $text) {
    text
    postBelongToUser
    likes
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
    query Post($id: String!) {
  post(id: $id) {
    id
    text
    postBelongToUser
    likes
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