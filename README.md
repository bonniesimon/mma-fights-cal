# UFC-cal

## Development

```bash
yarn dev # you can view the app at localhost:5173
```

### Interact with SQLite3 database

```bash
sqlite3 database.sqlite
```

### Running migrations

```bash
yarn sequelize db:migrate

yarn sequelize migration:generate --name create-events


# We can use sequelize-cli instead of sequelize too
```
