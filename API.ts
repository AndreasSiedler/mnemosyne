/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateTodoInput = {
  id?: string | null,
  name: string,
  description?: string | null,
};

export type ModelTodoConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelTodoConditionInput | null > | null,
  or?: Array< ModelTodoConditionInput | null > | null,
  not?: ModelTodoConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Todo = {
  __typename: "Todo",
  id: string,
  name: string,
  description?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateTodoInput = {
  id: string,
  name?: string | null,
  description?: string | null,
};

export type DeleteTodoInput = {
  id: string,
};

export type CreateEntryInput = {
  id?: string | null,
  mood: number,
  content?: string | null,
};

export type ModelEntryConditionInput = {
  mood?: ModelIntInput | null,
  content?: ModelStringInput | null,
  and?: Array< ModelEntryConditionInput | null > | null,
  or?: Array< ModelEntryConditionInput | null > | null,
  not?: ModelEntryConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Entry = {
  __typename: "Entry",
  id: string,
  mood: number,
  content?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateEntryInput = {
  id: string,
  mood?: number | null,
  content?: string | null,
};

export type DeleteEntryInput = {
  id: string,
};

export type CreateImageInput = {
  id?: string | null,
  postId?: string | null,
  fullSize: S3ObjectInput,
};

export type S3ObjectInput = {
  region: string,
  bucket: string,
  key: string,
};

export type ModelImageConditionInput = {
  postId?: ModelIDInput | null,
  and?: Array< ModelImageConditionInput | null > | null,
  or?: Array< ModelImageConditionInput | null > | null,
  not?: ModelImageConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type Image = {
  __typename: "Image",
  id: string,
  postId?: string | null,
  fullSize: S3Object,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type S3Object = {
  __typename: "S3Object",
  region: string,
  bucket: string,
  key: string,
};

export type UpdateImageInput = {
  id: string,
  postId?: string | null,
  fullSize?: S3ObjectInput | null,
};

export type DeleteImageInput = {
  id: string,
};

export type CreatePostInput = {
  id?: string | null,
  content?: string | null,
  date?: string | null,
  owner?: string | null,
  type: string,
};

export type ModelPostConditionInput = {
  content?: ModelStringInput | null,
  date?: ModelStringInput | null,
  owner?: ModelIDInput | null,
  type?: ModelStringInput | null,
  and?: Array< ModelPostConditionInput | null > | null,
  or?: Array< ModelPostConditionInput | null > | null,
  not?: ModelPostConditionInput | null,
};

export type Post = {
  __typename: "Post",
  id: string,
  content?: string | null,
  images?: ModelImageConnection | null,
  date?: string | null,
  owner?: string | null,
  type: string,
  createdAt: string,
  updatedAt: string,
};

export type ModelImageConnection = {
  __typename: "ModelImageConnection",
  items:  Array<Image | null >,
  nextToken?: string | null,
};

export type UpdatePostInput = {
  id: string,
  content?: string | null,
  date?: string | null,
  owner?: string | null,
  type?: string | null,
};

export type DeletePostInput = {
  id: string,
};

export type ModelTodoFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelTodoFilterInput | null > | null,
  or?: Array< ModelTodoFilterInput | null > | null,
  not?: ModelTodoFilterInput | null,
};

export type ModelTodoConnection = {
  __typename: "ModelTodoConnection",
  items:  Array<Todo | null >,
  nextToken?: string | null,
};

export type ModelEntryFilterInput = {
  id?: ModelIDInput | null,
  mood?: ModelIntInput | null,
  content?: ModelStringInput | null,
  and?: Array< ModelEntryFilterInput | null > | null,
  or?: Array< ModelEntryFilterInput | null > | null,
  not?: ModelEntryFilterInput | null,
};

export type ModelEntryConnection = {
  __typename: "ModelEntryConnection",
  items:  Array<Entry | null >,
  nextToken?: string | null,
};

export type ModelImageFilterInput = {
  id?: ModelIDInput | null,
  postId?: ModelIDInput | null,
  and?: Array< ModelImageFilterInput | null > | null,
  or?: Array< ModelImageFilterInput | null > | null,
  not?: ModelImageFilterInput | null,
};

export type ModelPostFilterInput = {
  id?: ModelIDInput | null,
  content?: ModelStringInput | null,
  date?: ModelStringInput | null,
  owner?: ModelIDInput | null,
  type?: ModelStringInput | null,
  and?: Array< ModelPostFilterInput | null > | null,
  or?: Array< ModelPostFilterInput | null > | null,
  not?: ModelPostFilterInput | null,
};

export type ModelPostConnection = {
  __typename: "ModelPostConnection",
  items:  Array<Post | null >,
  nextToken?: string | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelSubscriptionTodoFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionTodoFilterInput | null > | null,
  or?: Array< ModelSubscriptionTodoFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionEntryFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  mood?: ModelSubscriptionIntInput | null,
  content?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionEntryFilterInput | null > | null,
  or?: Array< ModelSubscriptionEntryFilterInput | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionImageFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  postId?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionImageFilterInput | null > | null,
  or?: Array< ModelSubscriptionImageFilterInput | null > | null,
};

export type ModelSubscriptionPostFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  content?: ModelSubscriptionStringInput | null,
  date?: ModelSubscriptionStringInput | null,
  type?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionPostFilterInput | null > | null,
  or?: Array< ModelSubscriptionPostFilterInput | null > | null,
};

export type CreateTodoMutationVariables = {
  input: CreateTodoInput,
  condition?: ModelTodoConditionInput | null,
};

export type CreateTodoMutation = {
  createTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTodoMutationVariables = {
  input: UpdateTodoInput,
  condition?: ModelTodoConditionInput | null,
};

export type UpdateTodoMutation = {
  updateTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTodoMutationVariables = {
  input: DeleteTodoInput,
  condition?: ModelTodoConditionInput | null,
};

export type DeleteTodoMutation = {
  deleteTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateEntryMutationVariables = {
  input: CreateEntryInput,
  condition?: ModelEntryConditionInput | null,
};

export type CreateEntryMutation = {
  createEntry?:  {
    __typename: "Entry",
    id: string,
    mood: number,
    content?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateEntryMutationVariables = {
  input: UpdateEntryInput,
  condition?: ModelEntryConditionInput | null,
};

export type UpdateEntryMutation = {
  updateEntry?:  {
    __typename: "Entry",
    id: string,
    mood: number,
    content?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteEntryMutationVariables = {
  input: DeleteEntryInput,
  condition?: ModelEntryConditionInput | null,
};

export type DeleteEntryMutation = {
  deleteEntry?:  {
    __typename: "Entry",
    id: string,
    mood: number,
    content?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateImageMutationVariables = {
  input: CreateImageInput,
  condition?: ModelImageConditionInput | null,
};

export type CreateImageMutation = {
  createImage?:  {
    __typename: "Image",
    id: string,
    postId?: string | null,
    fullSize:  {
      __typename: "S3Object",
      region: string,
      bucket: string,
      key: string,
    },
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateImageMutationVariables = {
  input: UpdateImageInput,
  condition?: ModelImageConditionInput | null,
};

export type UpdateImageMutation = {
  updateImage?:  {
    __typename: "Image",
    id: string,
    postId?: string | null,
    fullSize:  {
      __typename: "S3Object",
      region: string,
      bucket: string,
      key: string,
    },
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteImageMutationVariables = {
  input: DeleteImageInput,
  condition?: ModelImageConditionInput | null,
};

export type DeleteImageMutation = {
  deleteImage?:  {
    __typename: "Image",
    id: string,
    postId?: string | null,
    fullSize:  {
      __typename: "S3Object",
      region: string,
      bucket: string,
      key: string,
    },
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreatePostMutationVariables = {
  input: CreatePostInput,
  condition?: ModelPostConditionInput | null,
};

export type CreatePostMutation = {
  createPost?:  {
    __typename: "Post",
    id: string,
    content?: string | null,
    images?:  {
      __typename: "ModelImageConnection",
      items:  Array< {
        __typename: "Image",
        id: string,
        postId?: string | null,
        fullSize:  {
          __typename: "S3Object",
          region: string,
          bucket: string,
          key: string,
        },
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    date?: string | null,
    owner?: string | null,
    type: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePostMutationVariables = {
  input: UpdatePostInput,
  condition?: ModelPostConditionInput | null,
};

export type UpdatePostMutation = {
  updatePost?:  {
    __typename: "Post",
    id: string,
    content?: string | null,
    images?:  {
      __typename: "ModelImageConnection",
      items:  Array< {
        __typename: "Image",
        id: string,
        postId?: string | null,
        fullSize:  {
          __typename: "S3Object",
          region: string,
          bucket: string,
          key: string,
        },
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    date?: string | null,
    owner?: string | null,
    type: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePostMutationVariables = {
  input: DeletePostInput,
  condition?: ModelPostConditionInput | null,
};

export type DeletePostMutation = {
  deletePost?:  {
    __typename: "Post",
    id: string,
    content?: string | null,
    images?:  {
      __typename: "ModelImageConnection",
      items:  Array< {
        __typename: "Image",
        id: string,
        postId?: string | null,
        fullSize:  {
          __typename: "S3Object",
          region: string,
          bucket: string,
          key: string,
        },
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    date?: string | null,
    owner?: string | null,
    type: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetTodoQueryVariables = {
  id: string,
};

export type GetTodoQuery = {
  getTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTodosQueryVariables = {
  filter?: ModelTodoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTodosQuery = {
  listTodos?:  {
    __typename: "ModelTodoConnection",
    items:  Array< {
      __typename: "Todo",
      id: string,
      name: string,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetEntryQueryVariables = {
  id: string,
};

export type GetEntryQuery = {
  getEntry?:  {
    __typename: "Entry",
    id: string,
    mood: number,
    content?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListEntriesQueryVariables = {
  filter?: ModelEntryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListEntriesQuery = {
  listEntries?:  {
    __typename: "ModelEntryConnection",
    items:  Array< {
      __typename: "Entry",
      id: string,
      mood: number,
      content?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetImageQueryVariables = {
  id: string,
};

export type GetImageQuery = {
  getImage?:  {
    __typename: "Image",
    id: string,
    postId?: string | null,
    fullSize:  {
      __typename: "S3Object",
      region: string,
      bucket: string,
      key: string,
    },
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListImagesQueryVariables = {
  filter?: ModelImageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListImagesQuery = {
  listImages?:  {
    __typename: "ModelImageConnection",
    items:  Array< {
      __typename: "Image",
      id: string,
      postId?: string | null,
      fullSize:  {
        __typename: "S3Object",
        region: string,
        bucket: string,
        key: string,
      },
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPostQueryVariables = {
  id: string,
};

export type GetPostQuery = {
  getPost?:  {
    __typename: "Post",
    id: string,
    content?: string | null,
    images?:  {
      __typename: "ModelImageConnection",
      items:  Array< {
        __typename: "Image",
        id: string,
        postId?: string | null,
        fullSize:  {
          __typename: "S3Object",
          region: string,
          bucket: string,
          key: string,
        },
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    date?: string | null,
    owner?: string | null,
    type: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPostsQueryVariables = {
  filter?: ModelPostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPostsQuery = {
  listPosts?:  {
    __typename: "ModelPostConnection",
    items:  Array< {
      __typename: "Post",
      id: string,
      content?: string | null,
      images?:  {
        __typename: "ModelImageConnection",
        items:  Array< {
          __typename: "Image",
          id: string,
          postId?: string | null,
          fullSize:  {
            __typename: "S3Object",
            region: string,
            bucket: string,
            key: string,
          },
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      date?: string | null,
      owner?: string | null,
      type: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PostsByDateQueryVariables = {
  type: string,
  date?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PostsByDateQuery = {
  postsByDate?:  {
    __typename: "ModelPostConnection",
    items:  Array< {
      __typename: "Post",
      id: string,
      content?: string | null,
      images?:  {
        __typename: "ModelImageConnection",
        items:  Array< {
          __typename: "Image",
          id: string,
          postId?: string | null,
          fullSize:  {
            __typename: "S3Object",
            region: string,
            bucket: string,
            key: string,
          },
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      date?: string | null,
      owner?: string | null,
      type: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateTodoSubscriptionVariables = {
  filter?: ModelSubscriptionTodoFilterInput | null,
};

export type OnCreateTodoSubscription = {
  onCreateTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTodoSubscriptionVariables = {
  filter?: ModelSubscriptionTodoFilterInput | null,
};

export type OnUpdateTodoSubscription = {
  onUpdateTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTodoSubscriptionVariables = {
  filter?: ModelSubscriptionTodoFilterInput | null,
};

export type OnDeleteTodoSubscription = {
  onDeleteTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateEntrySubscriptionVariables = {
  filter?: ModelSubscriptionEntryFilterInput | null,
};

export type OnCreateEntrySubscription = {
  onCreateEntry?:  {
    __typename: "Entry",
    id: string,
    mood: number,
    content?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateEntrySubscriptionVariables = {
  filter?: ModelSubscriptionEntryFilterInput | null,
};

export type OnUpdateEntrySubscription = {
  onUpdateEntry?:  {
    __typename: "Entry",
    id: string,
    mood: number,
    content?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteEntrySubscriptionVariables = {
  filter?: ModelSubscriptionEntryFilterInput | null,
};

export type OnDeleteEntrySubscription = {
  onDeleteEntry?:  {
    __typename: "Entry",
    id: string,
    mood: number,
    content?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateImageSubscriptionVariables = {
  filter?: ModelSubscriptionImageFilterInput | null,
  owner?: string | null,
};

export type OnCreateImageSubscription = {
  onCreateImage?:  {
    __typename: "Image",
    id: string,
    postId?: string | null,
    fullSize:  {
      __typename: "S3Object",
      region: string,
      bucket: string,
      key: string,
    },
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateImageSubscriptionVariables = {
  filter?: ModelSubscriptionImageFilterInput | null,
  owner?: string | null,
};

export type OnUpdateImageSubscription = {
  onUpdateImage?:  {
    __typename: "Image",
    id: string,
    postId?: string | null,
    fullSize:  {
      __typename: "S3Object",
      region: string,
      bucket: string,
      key: string,
    },
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteImageSubscriptionVariables = {
  filter?: ModelSubscriptionImageFilterInput | null,
  owner?: string | null,
};

export type OnDeleteImageSubscription = {
  onDeleteImage?:  {
    __typename: "Image",
    id: string,
    postId?: string | null,
    fullSize:  {
      __typename: "S3Object",
      region: string,
      bucket: string,
      key: string,
    },
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreatePostSubscriptionVariables = {
  filter?: ModelSubscriptionPostFilterInput | null,
  owner?: string | null,
};

export type OnCreatePostSubscription = {
  onCreatePost?:  {
    __typename: "Post",
    id: string,
    content?: string | null,
    images?:  {
      __typename: "ModelImageConnection",
      items:  Array< {
        __typename: "Image",
        id: string,
        postId?: string | null,
        fullSize:  {
          __typename: "S3Object",
          region: string,
          bucket: string,
          key: string,
        },
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    date?: string | null,
    owner?: string | null,
    type: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePostSubscriptionVariables = {
  filter?: ModelSubscriptionPostFilterInput | null,
  owner?: string | null,
};

export type OnUpdatePostSubscription = {
  onUpdatePost?:  {
    __typename: "Post",
    id: string,
    content?: string | null,
    images?:  {
      __typename: "ModelImageConnection",
      items:  Array< {
        __typename: "Image",
        id: string,
        postId?: string | null,
        fullSize:  {
          __typename: "S3Object",
          region: string,
          bucket: string,
          key: string,
        },
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    date?: string | null,
    owner?: string | null,
    type: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePostSubscriptionVariables = {
  filter?: ModelSubscriptionPostFilterInput | null,
  owner?: string | null,
};

export type OnDeletePostSubscription = {
  onDeletePost?:  {
    __typename: "Post",
    id: string,
    content?: string | null,
    images?:  {
      __typename: "ModelImageConnection",
      items:  Array< {
        __typename: "Image",
        id: string,
        postId?: string | null,
        fullSize:  {
          __typename: "S3Object",
          region: string,
          bucket: string,
          key: string,
        },
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    date?: string | null,
    owner?: string | null,
    type: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
