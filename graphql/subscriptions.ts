/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onCreateTodo(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onUpdateTodo(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo($filter: ModelSubscriptionTodoFilterInput) {
    onDeleteTodo(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onCreateEntry = /* GraphQL */ `
  subscription OnCreateEntry($filter: ModelSubscriptionEntryFilterInput) {
    onCreateEntry(filter: $filter) {
      id
      mood
      content
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateEntry = /* GraphQL */ `
  subscription OnUpdateEntry($filter: ModelSubscriptionEntryFilterInput) {
    onUpdateEntry(filter: $filter) {
      id
      mood
      content
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteEntry = /* GraphQL */ `
  subscription OnDeleteEntry($filter: ModelSubscriptionEntryFilterInput) {
    onDeleteEntry(filter: $filter) {
      id
      mood
      content
      createdAt
      updatedAt
    }
  }
`;
export const onCreateImage = /* GraphQL */ `
  subscription OnCreateImage(
    $filter: ModelSubscriptionImageFilterInput
    $owner: String
  ) {
    onCreateImage(filter: $filter, owner: $owner) {
      id
      postId
      fullSize {
        region
        bucket
        key
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateImage = /* GraphQL */ `
  subscription OnUpdateImage(
    $filter: ModelSubscriptionImageFilterInput
    $owner: String
  ) {
    onUpdateImage(filter: $filter, owner: $owner) {
      id
      postId
      fullSize {
        region
        bucket
        key
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteImage = /* GraphQL */ `
  subscription OnDeleteImage(
    $filter: ModelSubscriptionImageFilterInput
    $owner: String
  ) {
    onDeleteImage(filter: $filter, owner: $owner) {
      id
      postId
      fullSize {
        region
        bucket
        key
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost(
    $filter: ModelSubscriptionPostFilterInput
    $owner: String
  ) {
    onCreatePost(filter: $filter, owner: $owner) {
      id
      content
      images {
        items {
          id
          postId
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost(
    $filter: ModelSubscriptionPostFilterInput
    $owner: String
  ) {
    onUpdatePost(filter: $filter, owner: $owner) {
      id
      content
      images {
        items {
          id
          postId
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost(
    $filter: ModelSubscriptionPostFilterInput
    $owner: String
  ) {
    onDeletePost(filter: $filter, owner: $owner) {
      id
      content
      images {
        items {
          id
          postId
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      owner
      createdAt
      updatedAt
    }
  }
`;
