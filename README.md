# Simple-Budget Api

## API Endpoints

### /categories:

#### GET - Will fetch any categories stored in the database, an object with a name

category= {
id: exampleNum,
name: "Name-of-category"
}

#### POST- requires basic token authorization, Allows a user to post a category. In the front end, use stringify on a object containing the name of the category.

Example:  
const category = {
name: this.state.name
};
fetch(`${config.API_ENDPOINT}/categories`, {
method: 'POST',
headers: {
'content-type': 'application/json',
Authorization: `basic ${TokenService.getAuthToken()}`
},
body: JSON.stringify(category)
})

### /categories/:categoriesId

#### GET- retrieves the id and name of a specific category

GET /categories/4 would retrieve the object:
{id: 4,
name: "Name-of-category-with-Id-of-4
}

#### DELETE

_Note_ the categoryId associated with the transaction links the transaction to a category. The category cannot be deleted if there is a transaction linked to it.

DELETE /categories/4
requires - Authorization: `basic ${TokenService.getAuthToken()}`
Result would delete the category with id of 4
fetch(`${config.API_ENDPOINT}/categories/4`, {
method: 'DELETE',
headers: {
'content-type': 'application/json',
Authorization: `basic ${TokenService.getAuthToken()}`
}

#### PATCH

PATCH /categories/4

requires - Authorization: `basic ${TokenService.getAuthToken()}`
Result would update the name of the category with id of 4

newCategory = {
name: "New name"
}
fetch(`${config.API_ENDPOINT}/categories/4`, {
method: 'PATCH',
headers: {
'content-type': 'application/json',
Authorization: `basic ${TokenService.getAuthToken()}`
}
body: JSON.stringify(newCategory)

### /transactions

#### GET - Will fetch any transactions stored in the database, an object with an id, venue, amount, categoryId

_Note_ the categoryId associated with the transaction links the transaction to a category. The category cannot be deleted if there is a transaction linked to it.
transaction = {
id: exampleNum,
venue: "name-of-venue"
amount: num-value-what-was-spent
categoryId: num- ("category Id associated with transaction purchase")
}

#### POST

_Note_ the categoryId associated with the transaction links the transaction to a category. The category cannot be deleted if there is a transaction linked to it.
const transaction = {
venue: venue,
amount: amount,
category_id: categoryId <--- this should come from categories stored via POST /categoriesId
};

fetch(`${config.API_ENDPOINT}/transactions`, {
method: 'POST',
headers: {
'content-type': 'application/json',
Authorization: `basic ${TokenService.getAuthToken()}`
},
body: JSON.stringify(transaction)
})

### /transactions/:transactionsId

#### GET

/transactions/4 would retrieve the object:
{id: 4,
venue: "Venue-of-transaction",
amount: num, "amount-spent",
categoryId: num, "category associated with purchase"
}

#### DELETE

_Note_ the categoryId associated with the transaction links the transaction to a category. The category cannot be deleted if there is a transaction linked to it.

DELETE /transactions/4
requires - Authorization: `basic ${TokenService.getAuthToken()}`
Result would delete the transaction with id of 4

fetch(`${config.API_ENDPOINT}/transactions/4`, {
method: 'DELETE',
headers: {
'content-type': 'application/json',
Authorization: `basic ${TokenService.getAuthToken()}`
}

#### PATCH

PATCH /transactions/4

requires - Authorization: `basic ${TokenService.getAuthToken()}`
Result would update the name of the transactions with id of 4

newTransaction = {id: 4,
venue: "Venue-of-transaction",
amount: num, "amount-spent",
categoryId: num, "category associated with purchase"
}

fetch(`${config.API_ENDPOINT}/transactions/4`, {
method: 'PATCH',
headers: {
'content-type': 'application/json',
Authorization: `basic ${TokenService.getAuthToken()}`
}
body: JSON.stringify(newTransaction)

## Set up

Complete the following steps to start a new project (NEW-PROJECT-NAME):

1. Clone this repository to your local machine `git clone simple-budget-api NEW-PROJECTS-NAME`
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm install`

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm run migrate:test` & `npm test`

Migrate the migrations `npm run migrate`

Organize the code `npm run prettier`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch, and run a migration on the production.
