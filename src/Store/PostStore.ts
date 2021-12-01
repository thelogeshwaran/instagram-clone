import create from "zustand";
import { Post, Comment, User } from "../API";
import { API, graphqlOperation } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api";
import { listPosts } from "../grpaqhl";
import { ListPostsQuery, GetUserQuery, CreateUserMutation } from "../API";
import { getUser } from "../graphql/queries";
import { createUser } from "../graphql/mutations";
import { Auth } from "aws-amplify";

interface PostState {
  posts: (Post | null)[];
  user: User | null;
  userProfile: User | null;
  addPost: (data: Post) => void;
  updatePost: (data: Post) => void;
  getPosts: () => void;
  fetchUser: () => void;
  fetchUserProfile: (userId: string) => void;
  updateCommentData: (data: Comment) => void;
  checkIfUserExists: (userId: string, useName: string) => void;
  updateUserProfile: (data: User) => void;
}

export const useStore = create<PostState>((set, get) => ({
  posts: [],
  user: null,
  userProfile: null,
  addPost: (data: Post) => {
    set((state) => ({
      posts: [...state.posts, data],
    }));
  },
  fetchUser: async () => {
    set((state) => {
      try {
        Auth.currentAuthenticatedUser().then((data: any) =>
          state.checkIfUserExists(data.attributes.sub, data.username)
        );
      } catch (err) {
        console.log(err);
      }
    });
  },
  checkIfUserExists: async (userId: string, userName: string) => {
    try {
      const userdata = (await API.graphql(
        graphqlOperation(getUser, { id: userId })
      )) as GraphQLResult<GetUserQuery>;
      const fetchedUser = userdata.data?.getUser;
      if (!fetchedUser) {
        const data = {
          id: userId,
          username: userName,
          imageUrl: "",
          about: "",
        };
        try {
          const userdata = (await API.graphql(
            graphqlOperation(createUser, { input: data })
          )) as GraphQLResult<CreateUserMutation>;
          set({ user: userdata.data?.createUser! });
          console.log(userdata.data?.createUser);
        } catch (e) {
          console.log(e);
        }
      } else {
        set({
          user: fetchedUser,
        });
      }
    } catch (err) {
      console.log("error fetching user: ", err);
    }
  },
  fetchUserProfile: async (userId: string) => {
    console.log("came");
    try {
      const userdata = (await API.graphql(
        graphqlOperation(getUser, { id: userId })
      )) as GraphQLResult<GetUserQuery>;
      const fetchedUser = userdata.data?.getUser;
      set({ userProfile: fetchedUser! });
    } catch (err) {
      console.log("error fetching user: ", err);
    }
  },
  getPosts: async () => {
    try {
      const response = (await API.graphql(
        graphqlOperation(listPosts)
      )) as GraphQLResult<ListPostsQuery>;
      const postss = response?.data?.listPosts?.items;
      postss && set({ posts: postss });
    } catch (err) {
      console.log(err);
    }
  },
  updatePost: (data: Post) => {
    set((state) => ({
      posts: state.posts.map((item) => {
        if (item?.id === data.id) {
          return data;
        } else {
          return item;
        }
      }),
    }));
  },

  updateCommentData: (data: Comment) => {
    set((state) => ({
      posts: state.posts.map((item) => {
        if (item?.id === data.post.id) {
          if (item?.comments?.items) {
            item.comments.items = item.comments.items
              ? [...item?.comments?.items, data]
              : [data];
          }
          return item;
        } else {
          return item;
        }
      }),
    }));
  },
  updateUserProfile: (data: User) => {
    set((state) => ({
      userProfile: state.userProfile?.id === data.id ? data : state.userProfile,
    }));
  },
}));
