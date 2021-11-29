/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      username
      about
      posts {
        items {
          id
          username
          imageUrl
          caption
          likes
          createdAt
          updatedAt
        }
        nextToken
      }
      imageUrl
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      username
      about
      posts {
        items {
          id
          username
          imageUrl
          caption
          likes
          createdAt
          updatedAt
        }
        nextToken
      }
      imageUrl
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      username
      about
      posts {
        items {
          id
          username
          imageUrl
          caption
          likes
          createdAt
          updatedAt
        }
        nextToken
      }
      imageUrl
      createdAt
      updatedAt
    }
  }
`;
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      id
      username
      imageUrl
      caption
      user {
        id
        username
        about
        posts {
          nextToken
        }
        imageUrl
        createdAt
        updatedAt
      }
      likes
      comments {
        items {
          id
          content
          username
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      username
      imageUrl
      caption
      user {
        id
        username
        about
        posts {
          nextToken
        }
        imageUrl
        createdAt
        updatedAt
      }
      likes
      comments {
        items {
          id
          content
          username
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      id
      username
      imageUrl
      caption
      user {
        id
        username
        about
        posts {
          nextToken
        }
        imageUrl
        createdAt
        updatedAt
      }
      likes
      comments {
        items {
          id
          content
          username
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      content
      username
      post {
        id
        username
        imageUrl
        caption
        user {
          id
          username
          about
          imageUrl
          createdAt
          updatedAt
        }
        likes
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      id
      content
      username
      post {
        id
        username
        imageUrl
        caption
        user {
          id
          username
          about
          imageUrl
          createdAt
          updatedAt
        }
        likes
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      content
      username
      post {
        id
        username
        imageUrl
        caption
        user {
          id
          username
          about
          imageUrl
          createdAt
          updatedAt
        }
        likes
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
