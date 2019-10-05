# Shoe comp api

## `npm install`

Install the project's dependencies

## `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:<choice of PORT>] to use on postman in development mode.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## `npm test`

Launches the test runner in the interactive watch mode.<br/>

## Api url: https://salty-brushlands-63375.herokuapp.com

## Summary
The Api makes requests to a private database on heroku. Features include endpoints for creating users and complete control of creating, editing, and deleting orders.

## /api/register - Register an account

- POST /api/register Create a new user
- DELETE /api/delete/:id Deletes a user by id

## /api/login - Logs in a user and returns a authorization oken
- POST /api/login Creates and returns a authorization token when a user logs in

## /user/checkout - Checkout endpoints to keep track of items in checkout
- GET Returns all items in users checkout if available
- POST Creates a new item to add to users checkout
- PATCH Updates all items in checkout at once
- DELETE Deletes an item from checkout


## /user/order - Order endpoints

- GET /user/order Returns specific order by user id that is provided by an authorization token when logged in
-POST /user/order Create a new order onced checked out

## Built with:
- PostgreSQL
- Knex.js
- Helmet.js
- Nodemon.js
- Cors.js
- RESTful principles
- TDD with moch, Jest, and Enzyme
