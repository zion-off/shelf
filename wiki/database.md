## Database

MongoDB is the primary database.

## Data models

**`users` model**

| Field      | Type       |
| ---------- | ---------- |
| `_id`      | `ObjectId` |
| name       | `string`   |
| email      | `string`   |
| username   | `string`   |
| created_at | `Date`     |

**`items` model**

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

- Composite index: `(owner, in_folder)`, for quickly retrieving a user's items

**`folders` model**

| Field         | Type       |
| ------------- | ---------- |
| `_id`         | `ObjectId` |
| owner         | `ObjectId` |
| name          | `string`   |
| public        | `boolean`  |
| created_at    | `Date`     |
| last_modified | `Date`     |

- Index: `owner`, for quickly retrieving a user's folders

**`notifications` model**

| Field      | Type       |
| ---------- | ---------- |
| `_id`      | `ObjectId` |
| recipient  | `ObjectId` |
| actor      | `ObjectId` |
| post       | `ObjectId` |
| created_at | `Date`     |
| type       | `string`   |
| is_read    | `boolean`  |

- Index: `(recipient, created_at)`, for quickly retrieving a user's
  notifications in sorted order

**`posts` model**

| Field         | Type       |
| ------------- | ---------- |
| `_id`         | `ObjectId` |
| owner         | `ObjectId` |
| content       | `string`   |
| attachments   | `string`   |
| like_count    | `number`   |
| created_at    | `Date`     |
| last_modified | `Date`     |

- Index: `(owner)`

**`likes` model**

| Field | Type       |
| ----- | ---------- |
| `_id` | `ObjectId` |
| owner | `ObjectId` |
| post  | `ObjectId` |

- Index: `post`, for quickly retrieving likes on a post, `owner` for quickly
  retrieving a user's own likes

**`comments` model**

| Field   | Type       |
| ------- | ---------- |
| `_id`   | `ObjectId` |
| author  | `ObjectId` |
| post    | `ObjectId` |
| content | string     |

- Index: `post`, for quickly retrieving comments on a post

**`friend_requests` model**

| Field    | Type       |
| -------- | ---------- |
| `_id`    | `ObjectId` |
| sender   | `ObjectId` |
| receiver | `ObjectId` |

- Index: `receiver`, for quickly retrieving a user has received, and `sender`,
  for quickly retrieving requests a user has sent

**`friendships` model**

| Field    | Type       |
| -------- | ---------- |
| `_id`    | `ObjectId` |
| user_one | `ObjectId` |
| user_two | `ObjectId` |

- Index: `(user_one, user_two)`, for quickly retrieving friendships
