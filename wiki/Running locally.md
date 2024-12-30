# How to run the app locally

## Database setup

Shelf uses MongoDB. To setup a test MongoDB server, first install MongoDB.

```
brew tap mongodb/brew
brew install mongodb-community
```

Then run

```
brew services start mongodb-community
```

The server will be running on port `27017`. The connection string is
`mongodb://localhost:27017`.

To stop the server, run

```
brew services start mongodb-community
```
