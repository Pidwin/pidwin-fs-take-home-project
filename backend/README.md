# pidwin-fs-take-home-project


## Installing the API

1.
    ```bash
    npm i
    ```

1. Clone the `.env.example` file and fillin:
    - `MONGODB_URL` (this is the host for your MongoDB server)
    - `JWT_SECRET` (this can be `test` for local testing)


## Running the API

-
    ```bash
    npm start
    ```


## Testing

- Test all files:

    ```bash
    npm t
    ```

- Test one file:

    ```bash
    npm t test/utils/esm-resolver.js
    ```

- Generate a HTML report:

    ```bash
    npm run coverage-html
    ```

- Generate a text report:

    ```bash
    npm run coverage-text
    ```
