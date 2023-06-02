# W3 Challenge

## Country search application

Welcome to the repository created for W3 IT Solutions.
In this challenge I created an application with the objective of being able to perform a search with a value given by the user to receive one or more countries that are compatible with that data and display their names, population and percentage of residents with respect to the countries returned in a table with their corresponding data.
For this application a postgres database with its migrations, a Nodejs server and an Angular client are initialized. All hosted in a network of Docker containers.
Let's see how to build the application!

### How to build the application

Building the application is very simple and we will do it with Docker. This way, we will not have to install dependencies separately and build in different consoles the development environments. Follow the steps below.

#### Prerequisites

Make sure you have Docker installed on your machine. To do this, you can access the [official Docker site](https://www.docker.com/) and download the version required by your operating system.

#### Step 1: Clone the repository

git clone <REPOSITORY_URL>

#### Step 2: Dockerfile & ENV Variables

Once you have the repository on your machine, you will see two folders that belong to both the client and server code. Inside the latter you will find the docker-compose.yml file, which we will use to build our container network in Docker.
It is very important that you make sure to add in the root of the server folder an .env file with the following variables:

- PORT
- DB_USERNAME
- DB_PASSWORD
- DB_DATABASE
- DB_HOST

You will create these variables according to the values you want to use for each one of them and they will be used in the config.js file inside the config folder, the port your app.js will use and the docker-compose.yml.

#### Step 3: Configure the database

Once this is done, make sure to add the database credentials to the connection. This file is located in:

```sh
server/src/database/databaseConnection.js
```

You will need the username, password, host and postgres database name for the configuration. Otherwise, you will not get a successful connection.

#### Step 4: Docker Compose

With this finished, everything is ready for you to go to your terminal and standing inside the server folder run the following command:

```sh
docker compose up
```

With this command, docker will start to create the container network and the necessary dependencies for each of them will be installed in the containers.

#### Step 5: Migrations & Seeds

Great! Our server along with the database and client should already be running on the Docker network.
Now we need to run our migrations. To do this, we will access via Docker - desktop to our container:
`w3-challenge-server-1`

There, we will go to the terminal and use the following command:

```sh
cd home/app/server
```

Now that we are inside our server root, we will use the following commands:

```sh
npm run migrate:up
npm run seed:up
```

Excellent! You have just run the migration and seed for the postgres database. Now the application is ready to be used since it has the necessary data for the countries in the world model and the countries table.

### Application testing

You're done! Application configured and running.
The next step is to access our client. To do this:

- Open your web browser and access localhost:8080 to open the user interface.
- Enter a search value in the search field and press the "Search" button.
- If the service finds countries matching the search, they will be displayed in a grid with the following information:
  -- Country name
  -- Population of the country
  -- Percentage of total population based on the sum total of the population of the loaded countries.
- If the service does not find any results, a message will be displayed indicating that no results were found.

That's it! You can now use the application to search for countries and view the results in the grid.

### License

This project is licensed under [MIT](https://opensource.org/licenses/MIT)

> Note: Make sure you have the prerequisites fulfilled before building the application and testing. If you encounter any problems or have any questions, feel free to contact me.
> Enjoy trying the application!
