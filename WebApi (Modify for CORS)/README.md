# Minimalist Node.js Express Application in Docker

Initial code from https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

## Build Docker image

To build manually:
    ```bash
    $ docker build -t basic-server .
    ```

## Running Docker image

    # run in foreground (ctrl-c to stop)
    ```bash
    $ docker run -p 44444:8080 --rm -it basic-server
    ```

    # run in background as daemon
    ```bash
    $ docker run -p 44444:8080 -d -it basic-server
    ```
