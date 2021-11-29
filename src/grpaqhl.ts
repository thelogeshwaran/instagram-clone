export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        imageUrl
        caption
        likes
        user {
          id
          username
          about
          imageUrl
          createdAt
          updatedAt
        }
        comments {
            items {
                content
                createdAt
                id
                updatedAt
                username
              }
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;