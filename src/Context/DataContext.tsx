import React, { createContext, useContext, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import {
  OnCreateCommentSubscription,
  User,
  OnUpdateUserSubscription,
} from "../API";
import { GraphQLResult } from "@aws-amplify/api";
import * as subscriptions from "../graphql/subscriptions";
import { Post } from "../API";
import { Observable } from "zen-observable-ts";
import { useStore } from "../Store/PostStore";

interface Props {
  user: User | null;
  userProfile: User | null;
}

const DataContext = createContext({} as Props);

interface UpdatePostProps {
  value: {
    data: {
      onUpdatePost: Post;
    };
  };
}

interface CreateCommentProps {
  value: GraphQLResult<OnCreateCommentSubscription>;
}

interface CreatePostProps {
  value: {
    data: {
      onCreatePost: Post;
    };
  };
}

interface UpdateuserProps {
  value: GraphQLResult<OnUpdateUserSubscription>;
}

export const DataProvider: React.FC = ({ children }) => {
  const {
    getPosts,
    addPost,
    updatePost,
    updateCommentData,
    user,
    fetchUser,
    updateUserProfile,
    userProfile,
  } = useStore();

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    const subscriptionCreatePost = (
      API.graphql(
        graphqlOperation(subscriptions.onCreatePost)
      ) as Observable<object>
    ).subscribe({
      next: (response: CreatePostProps) =>
        addPost(response.value?.data?.onCreatePost!),
      error: (error: string) => console.warn(error),
    });

    const subscriptionUpadatePost = (
      API.graphql(
        graphqlOperation(subscriptions.onUpdatePost)
      ) as Observable<object>
    ).subscribe({
      next: (response: UpdatePostProps) => {
        updatePost(response.value?.data?.onUpdatePost!);
      },

      error: (error: string) => console.warn(error),
    });

    const subscriptionCreateComment = (
      API.graphql(
        graphqlOperation(subscriptions.onCreateComment)
      ) as Observable<object>
    ).subscribe({
      next: (response: CreateCommentProps) =>
        updateCommentData(response.value?.data?.onCreateComment!),
      error: (error: string) => console.warn(error),
    });
    const subscriptionUpdateProfile = (
      API.graphql(
        graphqlOperation(subscriptions.onUpdateUser)
      ) as Observable<object>
    ).subscribe({
      next: (response: UpdateuserProps) =>
        updateUserProfile(response.value?.data?.onUpdateUser!),
      error: (error: string) => console.warn(error),
    });
    return () => {
      subscriptionCreatePost.unsubscribe();
      subscriptionUpadatePost.unsubscribe();
      subscriptionCreateComment.unsubscribe();
      subscriptionUpdateProfile.unsubscribe();
    };
  }, []);

  const datas: Props = {
    user: user,
    userProfile: userProfile,
  };

  return <DataContext.Provider value={datas}>{children}</DataContext.Provider>;
};

export function useDataProvider() {
  return useContext(DataContext);
}
