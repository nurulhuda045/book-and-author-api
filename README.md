# book-and-author-api

## Details:

Technology: Nodejs,express,mongodb

 This is also running live on heroku server.


## API Specification:

Install node modules by running (npm init) and Setup env variable(take a look on package.json file) to the project to run locally.

### Routes

#### Base urls:

dev: localhost:3000

deployed: https://book-and-author.herokuapp.com/


#### Author routes:

Required Fields: {name, email, password}

##### Create author:

Request: post

url: baseUrl/authors

##### Login author:

Request: post

url: baseUrl/authors/login

##### Logout author:

Request: post

url: baseUrl/authors/logout

##### Read profile:

Request: get

url: baseUrl/authors/me

##### Update author:

Request: patch

url: baseUrl/authors/me


#### Book routes:

Require Fields: { name }
Optional Fields: { description }

##### Create book:

Request: post

url: baseUrl/books

##### Read book:

Request: get

url: baseUrl/books/id

##### Read all books of individual author:

Request: get

url: baseUrl/books

##### Update book:

Request: patch

url: baseUrl/books/id
