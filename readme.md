<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Installation](#installation)
* [License](#license)



<!-- ABOUT THE PROJECT -->
## About The Project
It is a small app to manage contact information

### Built With
MERN Stack
* React
* Redux
* Node
* Express
* MongoDB

<!-- GETTING STARTED -->
## Getting Started

### Installation
* Clone the repo

* Create MongoDB atlas account at [https://mongodb.com](https://mongodb.com) and then edit config.env file in config folder with the following.

```
MONGO_URI=<your_mongoDB_Atlas_uri_with_credentials>
JWT_SECRET=<secret>
```

* Install server dependencies

```bash
npm install
```

* Install client dependencies

```bash
cd client
npm install
```

* Run both Express & React from root

```bash
npm run dev
```

* Build for production

```bash
cd client
npm run build
```


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.