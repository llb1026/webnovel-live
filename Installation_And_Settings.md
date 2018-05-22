# Installation and Settings

### Build Requirements

* `node v10.1.0` (recommended)

### Installation

    git clone https://github.com/llb1026/webnovel-live.git
    cd backend
    npm install
    cd ../frontend
    npm install

### Running the app (dev)

    cd backend
    mongod --dbpath data/
    npm run devstart
    cd ../frontend
    npm run serve

Note: for some reason you should turn the backend server on first to use nodemon(hot reloading). Running the frontend first will make nodemon fail.
