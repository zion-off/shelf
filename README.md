# Shelf

A place for everything you can read that isn't a book.

# Architecture

## Frontend

The frontend is built with Next.js 14. Authentication and authorization flows are handled via a secure provider, Google, using NextAuth.js.

### Shelf

The `Shelf` component is a container for a `Sidebar`, which shows the folders and items, and the actual shelf, called the `Collection`.

## Backend

- The backend is built with Next.js API routes.
- Responses include appropriate caching headers so items can be cached.
- RESTful APIs are provided for CRUD operations on users, folders, and items.
- PDF generation is handled via a different microservice

