# LT-API-Pattern (c)

A simple full-stack webserver built for [React](https://reactjs.org/) and [Flask](flask.pocoo.org/).

## Setup the React Frontend

1. Install `node.js`, `npm` and `yarn`
2. Change working directory: `$ cd frontend`
3. Run: `yarn install`
4. Run: `yarn build` (or `yarn watch` for live development)

## Setup the Python Environment and the Server

1. Install Python 3.7
2. In a new terminal window, run: `$ python3.7 -m venv venv`
3. Activate the python virtual environment in terminal: `$ source venv/bin/activate`
4. Run: `$ pip install -r requirements.txt`

## Run the Server

1. If not already done, activate the python virtual environment in terminal: `$ source venv/bin/activate`
2. Set the Flask app name: `$ export FLASK_APP=server`
3. Set the Flask deployment mode: `$ export FLASK_ENV=development`
4. Run the server: `$ flask run`

## Adding React Routes

To add a new page (route) in react, add the component to the project and then register the route in the `App` function in `frontend/src/App.js`. It is also a good idea to make that route accessible from the front end by adding a `<Link>` component to the `<Nav />` in `App.js`. This will reveal the new route in the front end and from any of the existing pages, you'll be able to access it. However, if you try and access the URI directly (invokes a request to the server) the server will return a 404 like error message. To fix this, we need to add the line `@app.rout('/newpage')` (replacing "newpage" with the URI) above the index function (in `server/__init__.py`) so that the server will send the `index.html` file with contains the new route (and all the other routes). Examples of this have been written as `About` and `AxiosExample`.

## Adding API Methods

Adding any other routes and functions to the `server/__init__.py` file, like the `create_file` and `file_list` functions, will add non-react routes. This is helpful for API requests as it doesn't touch the react router.
