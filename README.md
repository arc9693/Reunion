# Reunion (beta stage)
Reunion is an app based upon Node.js and EJS templating engine.

### Features
  - Login/Registration system.

### Tech

* [node.js](https://nodejs.org/en/) - evented I/O for the backend
* [Express](https://expressjs.com/) - node.js framework
* [EJS](https://ejs.co/) - templating engine
* [MySql](https://www.mysql.com/) - database system

### Installation
###### Setting up the database
 - Create database Reunion
 - Create table users

```
CREATE TABLE `users` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `first_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 `last_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
 `created` datetime NOT NULL,
 `modified` datetime NOT NULL,
 `coupons` varchar(255),
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

```

- Create user and set the password for it and grant privilages on the database Reunion.

```
CREATE USER 'GUEST'@'localhost' IDENTIFIED BY 'GUEST123';
```

###### Setting up the app and server
- Install the dependencies and devDependencies and start the server.

```sh
$ cd Reunion
$ npm install -d
$ npm start
```

- Open localhost:3030
