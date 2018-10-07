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

## Soling the password

При сохранении в БД нового пользователя генерируем модификатор.

Объеденяем модификатор(salt) и текстовый пароль. Получаем хешированый пароль.

`
Salt + Plain text password = "Salt + Hashed password"
`

Хешированный пароль сохраняем в БД.

#### Example:
Salt:

```
$2a$10$mIUG8P62XcomQZ3b.ISzNO
```
Hashed password:

```
.hz4xZvWt/H.opP.0KLBf5.pHonGB1G
```

RESULT:
```
$2a$10$mIUG8P62XcomQZ3b.ISzNO.hz4xZvWt/H.opP.0KLBf5.pHonGB1G
```
## JWT

 npm i -s jwt-simple
 or
 npm i jsonwebtoken (Only for NodeJS)

*Генерация токена подразумевает что проверка пары логин/пароль прошла успешно.*


#### При регистрации или входе в систему отдать токен в обмен на id пользователя.

Берем id пользователи и шифруем вместе секретным словом. Получаем токен и отсылаем его клиенту.

`
User ID + Secret String = "JSON Web Token"
`

Когда пользователь делает запрос на аутентификацию сервер должен прислать токен

`
JSON Web Token + Secret String = User ID
`

Пользователь запрашивает ресурс системы. Отсылает токен обратно на сервер.

Сервер складывает токен и секретное слово.

И получает ID пользователя.

Система знает какие права и доступ к ресурсам есть у пользователя в данный момент.
В ответ пользователь получает запрашиваемый ресурс.