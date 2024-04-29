# Taskendar - Backend

This repository contains the api implementation that provide data to SPA implementation for Taskendar.

## Stack

-   Express
-   Typescript
-   TestContainers
-   Docker
-   Sequelize
-   Auth0
-   Jest

## Requirements

### Docker

You'll need docker to run the postgres dependenci via compose(or manually) and to run the containers launched in tests via TestContainers

### Auth0

To run this application you must have a Auth0 api registered to authenticate users. You'll also needs the Username-Password-Authentication enabled.You'll have to provide the following information in a **.env** file

```env
PORT=your_port
POSTGRES_URI=your_postgres_uri
AUTH0_AUDIENCE=your_auth0_audience
AUTH0_ISSUER_URL=your_auth_issuer
```

If you want to follow my implemenation, your port will be **3333** the postgres uri will be **postgres://postgres:postgres@localhost:5432/postgres** based in the docker compose file, your auth0 audience will be **http://localhost:3333** based on your api (local) and you'll retrieve the auth issuer (auth authority) on the application configuration(api) section on Auth0 dashboard.

Checkout the Quickstart section on **Application > APIs > YourAPI** for more information.

#### Important

This setup should not be used in a production envrionment (just in case)

## How to run

to run this api, clone this repository and go to the directory you've put it. Then, run:

```bash
npm install
```

Then run the following command to launch the postgres container:

```bash
docker compose up -d
```

finally, run

```bash
npm run dev
```

to start the api and the server should be running on the port you've informed in the **.env** file
