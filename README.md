# Recap Tasks

## Mindset - from Joseph

Hello all, I hope you’ve had a great week.

This coming week, we’ll be looking at decision making in teams. In my experience, this can be one of the biggest elements to crack in order to truly tap into a team’s potential. When you are in projects and you are ‘creating’, you are often moving forward into the unknown where you won’t have all the data (and even if you did the data for any decision is ultimately infinite…). So how do you make decisions in uncertainty?

You won’t be surprised to hear there is no easy answer, but what will make the difference is being open as a team about ‘how’ you are making the decision (and wherever possible to agree that process up front). I cover a few different approaches and tools in the video module to get you thinking about some of the underlying mindset dynamics in decision making which we’ll unpack a bit more in the live session. I’d also like you to consider what you feel is the role of consensus in decision making (have a look at these two articles containing differing viewpoints to get you started).

- [Module](https://vimeo.com/657833544/0b6e11981c)
- [Article 1](https://medium.com/@al.pittampalli/consensus-7048e614a452)
- [Article 2](https://blog.abacus.com/power-of-consensus-decision-making-engineering/)
- [Worksheet](./mindset/Decision%20Making%20Activity.docx)

I’m with you in person next week, so I look forward to seeing you all then.

## Feedback

Feedback is a vital part of continual improvement and the hero's journey of growth you're on on this course. As part of this, please click [here](https://forms.gle/BJWLNvSgKsp9rkbF8) to fill out the peer review form for your partner this week. If you've had more than one partner, please fill it out for each person you've worked with.

## Tasks

### Part 1 - 🎵🎵 Get your server running... Head out on the highway... 🎵🎵

👉 1. Create a REST API that supports the operations below. The API will initially be using the `cats` array in `app.js` for its "data".

| Operation        | Request            | Response status code | Response body                                                       |
| ---------------- | ------------------ | -------------------- | ------------------------------------------------------------------- |
| Get all cats     | GET /api/cats      | 200                  | <code> { success: true, payload: array of cat objects } </code>     |
| Get cats by name | GET /api/cats?cat= | 200                  | <code> { success: true, payload: array of cat objects } </code>     |
| Get cat by id    | GET /api/cats/`id` | 200                  | <code> { success: true, payload: cat object } </code>               |
| Create a cat     | POST /api/cats     | 201                  | <code> { success: true, payload: newly created cat object } </code> |

- Test your implementation in a browser.
- Then go to `main.js` in the `public/js` folder and make the necessary changes to `main.js` so that when the button with id `get-cats` is clicked, the cats data is fetched and displayed on the frontend.

### Part 2 - Postgres

👉 2a.

- Install the [node-postgres package](https://node-postgres.com/) and set up your pool in `db/index.js`. Set up a PostgreSQL database instance (either locally or on a service like Heroku). You should provide the pool a connection string (to the database) via an environment variable called `DATABASE_URL`.
- Export the pool as an export named `pool` in `db/index.js`. You can then import the `pool` into other files and speak to the database via `pool.query`
- Remember to check the [example project structure](https://node-postgres.com/guides/project-structure) and [connecting](https://node-postgres.com/features/connecting) pages of the docs if you get stuck!

👉 2b. Create and populate your table:

- **Create your table:**

  - In `/scripts/createTable.js`, write a script which creates a table named cats. The cats table should have columns `id`, `cat`, `human` and `hobby` and the following types/constraints:

    | column name | column type | column constraints           |
    | ----------- | ----------- | ---------------------------- |
    | id          | integer     | primary key, identity column |
    | cat         | varchar(50) | not null                     |
    | human       | varchar(50) | not null                     |
    | hobby       | varchar(50) | not null                     |

  - You should use `pool.query` to send SQL to your database.
  - Run the newly created script and check whether your table has been created in your database.

- **Populate your table:**

  - In `/scripts/populateTable.js`, you'll notice that you have an array of cats as sample data.
  - Write a script to populate the cats table with this cats data.
  - You should use `pool.query` to send SQL to your database.
  - Run the newly created script and check whether your table now contains some cats.

### Part 3 - Put it all together

👉 3. Hook your server up to the cats data in your Postgres database rather than the array inside of `app.js`.

- Start by creating the following helper functions in `models/cats.js`, which are responsible for interacting with the `cats` table:

  - `getAllCats`
    - should return a promise which resolves to an array of cat objects from the database.
  - `getCatsByName`
    - should take in a name and return a promise which resolves to an array of cat objects (whose name matches) from the database
  - `getCatById`
    - should take in an id and return a promise which resolves to a single cat object (whose id matches) from the database
  - `createCat`
    - should take in an object (representing the information for the cat that's about to be made) and return a promise which resolves to a newly created cat object from the database.

- Export each function above as a named export from `models/cats.js`, so that they can then be used in other files.
- Use the above helper functions in the request handlers for Express app.

### Bonus

Once your API is working and hooked up to your database, see if you can view all your cat details on your frontend and then you can use any remaining time to refine and refactor. You may need to make changes to the frontend code (`main.js`) to get the frontend speaking to the backend.
