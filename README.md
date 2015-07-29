# Backbone Training

## Environment

Git

```
$ brew install git
```

Grunt Client

```
$ npm install --global grunt-cli
```

Bower

```
$ npm install --global bower
```

SASS

```
$ sudo gem install sass -v 3.4.15
```

Compass

```
$ sudo gem install compass -v 1.0.3
```

Foreman

```
$ sudo gem install foreman
```

PhantomJS

```
$ brew install phantomjs
```

## Local dependencies

If you want to run the application locally you will need to install the dependencies listed bellow.

MongoDB (optional)

```
$ brew install mongodb
```

## Running the application

Create the `.env` file that contains the environment variables and change anyone of them as needed

```
$ cp .env-sample .env
```

Install all application dependencies (node modules)

```
$ npm install
```

If you want to run the application locally you will have to run the following commands before starting the node server:

```
# Update the mongo URI in your config file to use your local database
# DB_MONGODB_URI=mongodb://localhost:27017/ac-backbone-training
$ vim src/server/config/index.js

# Run MongoDB
$ mkdir -p .database/mongodb
$ mongod --dbpath .database/mongodb --smallfiles
```

Start node server

```
$ foreman start dev
```

## Running tests

Install dependencies

```
$ npm install
```

Then run the tests:

```
$ foreman start test
```
