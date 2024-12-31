# How to run the app locally

## Database setup

Shelf uses MongoDB 8.0 and makes use of transactions. To set up a database with a replica set, install `run-rs`:

```bash
npm install run-rs -g
```

Then, run the following command to start the replica set:

```bash
run-rs
```

The server will be running on ports `27017`, `27018`, and `27019`. The connection string to connect to the replica set is:

```bash
mongodb://localhost:27017,localhost:27018,localhost:27019/shelf?replicaSet=rs
```

`run-rs` clears the database every time it starts by default. To override this behaviour, use the `--keep` (`-k`) flag.

```bash
run-rs --keep
```

To stop the server, hit `Ctrl+C`.