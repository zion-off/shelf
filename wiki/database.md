## Database

MongoDB is the primary database.

### User

#### `User` schema

| Field      | Type       |
| ---------- | ---------- |
| `_id`      | `ObjectId` |
| name       | `string`   |
| email      | `string`   |
| username   | `string`   |
| created_at | `Date`     |

### Item

#### `Item` schema

| Field         | Type                 |
| ------------- | -------------------- |
| `_id`         | `ObjectId`           |
| owner         | `_id`                |
| title         | `string`             |
| author        | `string`             |
| notes         | `string`             |
| link          | `string`             |
| read          | `boolean`            |
| in_folder     | `ObjectId` or `null` |
| created_at    | `Date`               |
| last_modified | `Date`               |

#### Indexes

- Composite index on `(owner, in_folder)`, for quickly retrieving a user's items

### Folder

#### `Folder` schema

| Field         | Type       |
| ------------- | ---------- |
| `_id`         | `ObjectId` |
| owner         | `ObjectId` |
| name          | `string`   |
| public        | `boolean`  |
| created_at    | `Date`     |
| last_modified | `Date`     |

#### Indexes

- `owner`, for quickly retrieving a user's folders

### Notification

#### `Notification` schema

| Field      | Type       |
| ---------- | ---------- |
| `_id`      | `ObjectId` |
| recipient  | `ObjectId` |
| actor      | `ObjectId` |
| post       | `ObjectId` |
| created_at | `Date`     |
| type       | `string`   |
| is_read    | `boolean`  |

#### Indexes

- Composite index on `(recipient, created_at)`, for quickly retrieving a user's
  notifications in sorted order

### Post

#### `posts` model

| Field         | Type       |
| ------------- | ---------- |
| `_id`         | `ObjectId` |
| owner         | `ObjectId` |
| content       | `string`   |
| attachments   | `string`   |
| like_count    | `number`   |
| created_at    | `Date`     |
| last_modified | `Date`     |

#### Indexes

- Index: `(owner)`

### Like

#### `Like` schema

| Field | Type       |
| ----- | ---------- |
| `_id` | `ObjectId` |
| owner | `ObjectId` |
| post  | `ObjectId` |

#### Indexes

- Index: `post`, for quickly retrieving likes on a post, `owner` for quickly
  retrieving a user's own likes

### Comment

#### `Comment` schema

| Field   | Type       |
| ------- | ---------- |
| `_id`   | `ObjectId` |
| author  | `ObjectId` |
| post    | `ObjectId` |
| content | string     |

#### Indexes

- Index: `post`, for quickly retrieving comments on a post

### FriendRequest

#### `FriendRequest` schema

| Field    | Type       |
| -------- | ---------- |
| `_id`    | `ObjectId` |
| sender   | `ObjectId` |
| receiver | `ObjectId` |

#### Indexes

- Index: `receiver`, for quickly retrieving a user has received, and `sender`,
  for quickly retrieving requests a user has sent

### Friendship

#### `Friendship` schema

| Field    | Type       |
| -------- | ---------- |
| `_id`    | `ObjectId` |
| user_one | `ObjectId` |
| user_two | `ObjectId` |

#### Indexes

- Composite index on `(user_one, user_two)`, for quickly retrieving friendships
