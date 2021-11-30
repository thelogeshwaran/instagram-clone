import React, { createContext, useContext, useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";
import {
  Comment,
  ListPostsQuery,
  OnCreateCommentSubscription,
  GetUserQuery,
  CreateUserMutation,
  User,
  OnUpdateUserSubscription,
} from "../API";
import { GraphQLResult } from "@aws-amplify/api";
import { listPosts } from "../grpaqhl";
import * as subscriptions from "../graphql/subscriptions";
import { OnCreatePostSubscription, OnUpdatePostSubscription } from "../API";
import { Post } from "../API";
import { Observable } from "zen-observable-ts";
import { getUser } from "../graphql/queries";
import { createUser } from "../graphql/mutations";

const DataContext = createContext<any | null>(null);

interface UpdatePostProps {
  value: GraphQLResult<OnUpdatePostSubscription>;
}

interface CreateCommentProps {
  value: GraphQLResult<OnCreateCommentSubscription>;
}

interface CreatePostProps {
  value: GraphQLResult<OnCreatePostSubscription>;
}

interface UpdateuserProps {
  value: GraphQLResult<OnUpdateUserSubscription>;
}

export const DataProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<(Post | null)[] | null>([]);
  const [userProfile, setUserProfile] = useState<User | null>(null);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const subscriptionCreatePost = (
      API.graphql(
        graphqlOperation(subscriptions.onCreatePost)
      ) as Observable<object>
    ).subscribe({
      next: (response: CreatePostProps) =>
        setPosts((posts: any) => [
          response.value?.data?.onCreatePost,
          ...posts,
        ]),
      error: (error: string) => console.warn(error),
    });

    const subscriptionUpadatePost = (
      API.graphql(
        graphqlOperation(subscriptions.onUpdatePost)
      ) as Observable<object>
    ).subscribe({
      next: (response: UpdatePostProps) =>
        setPosts((posts: any) =>
          updatePostdata(response.value?.data?.onUpdatePost, posts)
        ),
      error: (error: string) => console.warn(error),
    });

    const subscriptionCreateComment = (
      API.graphql(
        graphqlOperation(subscriptions.onCreateComment)
      ) as Observable<object>
    ).subscribe({
      next: (response: CreateCommentProps) =>
        setPosts((posts: any) =>
          updateCommentData(response.value?.data?.onCreateComment!, posts)
        ),
      error: (error: string) => console.warn(error),
    });
    const subscriptionUpdateProfile = (
      API.graphql(
        graphqlOperation(subscriptions.onUpdateUser)
      ) as Observable<object>
    ).subscribe({
      next: (response: UpdateuserProps) =>
        setUserProfile(response.value?.data?.onUpdateUser!),
      error: (error: string) => console.warn(error),
    });
    return () => {
      subscriptionCreatePost.unsubscribe();
      subscriptionUpadatePost.unsubscribe();
      subscriptionCreateComment.unsubscribe();
      subscriptionUpdateProfile.unsubscribe();
    };
  }, []);

  const fetchUser = async () => {
    try {
      Auth.currentAuthenticatedUser().then((data) =>
        checkIfUserExists(data.attributes.sub, data.username)
      );
    } catch (err) {
      console.log(err);
    }
  };

  async function checkIfUserExists(userId: string, userName: string) {
    try {
      const userdata = (await API.graphql(
        graphqlOperation(getUser, { id: userId })
      )) as GraphQLResult<GetUserQuery>;
      const fetchedUser = userdata.data?.getUser;
      if (!fetchedUser) {
        createNewUser(userId, userName);
      } else {
        setUser(fetchedUser);
      }
    } catch (err) {
      console.log("error fetching user: ", err);
    }
  }

  async function createNewUser(id: string, name: string) {
    const data = {
      id: id,
      username: name,
      imageUrl: "",
      about: "",
    };
    try {
      const userdata = (await API.graphql(
        graphqlOperation(createUser, { input: data })
      )) as GraphQLResult<CreateUserMutation>;
      setUser(userdata.data?.createUser!);
      console.log(userdata.data?.createUser);
    } catch (e) {
      console.log(e);
    }
  }

  async function fetchData() {
    try {
      const response = (await API.graphql(
        graphqlOperation(listPosts)
      )) as GraphQLResult<ListPostsQuery>;
      const postss = response?.data?.listPosts?.items;
      postss && setPosts(postss);
    } catch (err) {
      console.log(err);
    }
  }
  const updateCommentData = (data: Comment, posts: Post[]) => {
    const updatedCommentData = posts.map((item: Post) => {
      if (item.id === data.post.id) {
        if (item.comments?.items) {
          item.comments.items = item.comments.items
            ? [...item?.comments?.items, data]
            : [data];
        }
        return item;
      } else {
        return item;
      }
    });
    return updatedCommentData;
  };

  const updatePostdata = (data: any, posts: Post[]) => {
    console.log(data);
    const updatedPosts = posts.map((item: Post) => {
      if (item.id === data.id) {
        return data;
      } else {
        return item;
      }
    });
    return updatedPosts;
  };

  return (
    <DataContext.Provider
      value={{ user, setUser, posts, setPosts, userProfile, setUserProfile }}
    >
      {children}
    </DataContext.Provider>
  );
};

export function useDataProvider() {
  return useContext(DataContext);
}
