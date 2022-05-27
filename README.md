# Individual Monday Recap Tasks

## Topics

- SQL
- Node
- NPM
- Express

## Tasks

### Part 1 - Hook up your database

If you have an account with Heroku and a Postgres database on it from last week, you can use it again here. If not, click below for a reminder of how to do this.

<details>
<summary>Click to expand Heroku steps</summary>

👉 Go to [Heroku](https://www.heroku.com/) and sign up for a free account.

👉 Create a new app, give it a name and select the region as europe.

👉 Navigate to the resources tab of your new app.

👉 In the Add-ons search bar, type postgres and select Heroku Postgres.

👉 Select the Hobby Dev - Free plan and click Submit Order Form.

👉 Click the link to Heroku Postgres; this will open a new tab.

👉 Locate your credentials in the settings tab.

</details>

👉 1a. Set up your environment variables. Install the [dotenv package](https://www.npmjs.com/package/dotenv), and add your Heroku database credentials to your `.env` file. Make sure your `.env` file isn't pushed to GitHub!

👉 1b. Install the [node-postgres package](https://node-postgres.com/), and, set up your pool in `db/index.js` using the credentials you've stored in your environment variables. Export your `query`. Remember to check the [example project structure](https://node-postgres.com/guides/project-structure) page of the docs if you get stuck! Remember to also include `ssl: {rejectUnauthorized: false,},` so Heroku will allow you to connect!

👉 1c. Create your scripts:

- **Create your table:** In `/scripts/createTable.js`, write a SQL statement to create a table with columns for `name`, `human`, and `hobby`. Use your `query` in a function to send your SQL statement to your database. Run this file and check for your table on the database on Heroku.
- **Populate your table:** In `/scripts/populateTable.js`, you'll notice that you have an array of cats as sample data. Write a SQL query to populate the table you made in your `createTable` script with this cats data. Use your `query` to send this SQL query to your database too. Run this file and check that your table is populated on Heroku.

### Part 2 - 🎵🎵 Get your server running... Head out on the highway... 🎵🎵

👉 2a. Go to `app.js`, and follow the steps in the comments at the bottom to get your server set up!

### Part 3 - Put it all together

👉 3a. Hook your server up to the cats data in your Postgres server on Heroku rather than the array inside of `app.js`.
