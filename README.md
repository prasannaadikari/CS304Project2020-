<h3 align="center">
	A web-based Appointment Booking System for Vehicle Service Centers.
</h3>

<p align="center">
<a href="https://www.npmjs.com/package/react"><img src="https://img.shields.io/badge/Made%20with-React-blue"></a>
</p>
## Getting Started

### Prerequisites

Install the latest versions of [Node.js](https://github.com/nodejs/node) and [React](https://github.com/facebook/react)

### Installing

1. Clone the respository:

    ```
    git clone https://github.com/prasannaadikari/CS304Project2020-.git
    ```

2. Select one Project:

    **Select Admin Project**
    ```
    cd Admin
    ```
    
    **Select Client Project**
    ```
    cd Client
    ```
    
3. Update Firebase Configurations

    **Admin/Client Frontend Projects**

    + Rename `.env.example` to `.env`
    
    + Add following configurations,
    ```
    REACT_APP_API_KEY
    REACT_APP_AUTH_DOMAIN
    REACT_APP_DATABASE_URL
    ```

3. Install packages:

    **Using npm**
    ```
    npm install
    ```
    
    **Using yarn**
    ```
    yarn
    ```
4. Run the server:

    **Using npm**
    ```
    npm start
    ```
    
    **Using yarn**
    ```
    yarn start
    ```
    
## Deployment
This project is hosted on firebase. React app should be build inorder to deploy.

1. Build the App

   **Using npm**
   ```
   npm run build
   ```
   **Using yarn**
   ```
   yarn build
   ```

2. Deploy to firebase

   ```
   firebase deploy
   ```

## Built With

* [Bootstrap](https://github.com/twbs/bootstrap)
* [React](https://github.com/facebook/react)
* [NodeJs](https://github.com/nodejs/node)
* [FireBase](https://firebase.google.com)