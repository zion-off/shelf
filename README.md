# Shelf

A place for everything you can read that isn't a book.

# Requirements

## Functional requirements

- Register and login using a social media provider.
- Users should be able to sign out.
- Users should be able to create folders in their shelf.
- Inside a folder, users can add an item by entering a title.
- Optional item fields include author, link, notes, visibility, and read check.
- Users should be able to edit fields of each item in their shelf.
- Users should be able to delete items from their shelf.
- Users should be able to add other users to their network and see each other's activity on a feed.
- Users should be able to comment on other users' activity.
- Users should be able to generate a PDF of a linked article.
- Users should have a profile page where they have the option to see their friend list and their collections.
- A public profile page will show the user's public collections and a list of recently added items.
- Users should receive notifications for comments on their activity or updates in their network.
- Users should be able to search for and filter items and folders within their shelf.

## Non-functional requirements

- Metadata fields are automatically retrieved when the user pastes an external link.
- Items should have a thumbnail that is automatically generated.
- Users should be able to sort items in a folder based on title, author, and date added.
- Users should be able to rearrange folders and items in their shelf by dragging and dropping.
- Mobile users should see a desktop equivalent shelf, feed, profile, and directory.

# Architecture

## Frontend

- The frontend is built with Next.js 15.
- The UI is responsive, adapting seamlessly to different screen sizes.
- Authentication and authorization flows are handled via a secure provider using NextAuth.js.

## Backend

- The backend is built with Next.js API routes.
- Responses include appropriate caching headers so items can be cached.
- RESTful APIs are provided for CRUD operations on users, folders, and items.
- PDF generation is handled via a different microservice

## Database

- MongoDB is the primary database.
- Indexes are used for optimizing queries on title, author, and date added.
- Relationships between users, folders, and items are maintained using references.

## Data model

### Users collection

**User data model**
- `name`: string
- `email`: string
- `folders`: folder[]
- `friends`: user[]
- `requests`: user[]
- `notifications`: notification[]

### Items collection

**Item data model**
- `title`: string
- `author`: string
- `link`: string
- `read`: boolean
- `public`: boolean
- `date_added`: Date
- `notes`: string
- `thumbnail`: image

### Folders collection

**Folder data model**
- `name`: string
- `owner`: user
- `items`: item[]

### Notifications collection

**Notification data model**
- `type`: string ("comment", "request")
- `message`: string
- `date`: Date
- `read`: boolean
- `user`: user
