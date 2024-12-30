# Shelf

A place for everything you can read that isn't a book.



# Architecture

## Frontend

The frontend is built with Next.js 15. Authentication and authorization flows are handled via a secure provider, Google, using NextAuth.js.

### Shelf

The `Shelf` component is a container for a `Sidebar`, which shows the folders and items, and the actual shelf, called the `Collection`.

## Backend

- The backend is built with Next.js API routes.
- Responses include appropriate caching headers so items can be cached.
- RESTful APIs are provided for CRUD operations on users, folders, and items.
- PDF generation is handled via a different microservice

## Database

- MongoDB is the primary database.
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
- `activities`: activity[]

### Items collection

**Item data model**
- `title`: string
- `author`: string
- `link`: string
- `read`: boolean
- `public`: boolean
- `date_added`: Date
- `date_edited`: Date
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

### Activities collection

**Activity data model**
- `type`: string ("comment", "add", "edit")
- `item`: item
- `date`: Date