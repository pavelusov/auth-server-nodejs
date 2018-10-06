# Auth server

#### First installation

npm i -s express mongoose morgan body-parser nodemon


# Tech stack

### Low-level request handling

 - HTTP module Nodejs (handle http requests)

### Routing, Server logic

 - body-parser
 - morgan (logging)
 - express

### Database

 - MongoDB (database)
 - mongoose (Working with MongoDB)

### Authentication

 - PassportJS (auth users)
 - Passport-Local (auth users with a username/password)
 - Passport-JWT (auth users with a JWT)
 - Bcrypt Nodejs(storing a users password safely)


## [Mongo installation](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)

- brew install mongodb
- sudo mkdir -p /data/db
- sudo chown -R $USER /data/db
- mongod (start MongoDB)
