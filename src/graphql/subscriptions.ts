/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
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
