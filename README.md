# Tech Blog &middot; [![GitHub license](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/WebDevMullins/svg-logo-maker/blob/main/LICENSE)

<p align="center">
<img src="https://img.shields.io/badge/.ENV-ECD53F?logo=dotenv&logoColor=000&style=flat" alt=".ENV Badge">
<img src="https://img.shields.io/badge/Handlebars.js-000?logo=handlebarsdotjs&logoColor=fff&style=flat" alt="Handlebars.js Badge">
<img src="https://img.shields.io/badge/Insomnia-4000BF?logo=insomnia&logoColor=fff&style=flat" alt="Insomnia Badge">
<img src="https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=fff&style=flat" alt="MySQL Badge">
<img src="https://img.shields.io/badge/Node.js-393?logo=nodedotjs&logoColor=fff&style=flat" alt="Node.js Badge">
<img src="https://img.shields.io/badge/Sequelize-52B0E7?logo=sequelize&logoColor=fff&style=flat" alt="Sequelize Badge">
<img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=fff&style=flat" alt="Tailwind CSS Badge">
</p>

A CMS-style blog site similar to a Wordpress site, where developers can publish their blog posts and comment on other developers’ posts as well.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Demo](#demo)
- [License](#license)

## Installation

### Clone repo to destinaton.

```bash
git clone https://github.com/WebDevMullins/mvc-tech-blog.git
```

### Install dependencies using:

```bash
npm install
```

Rename the `.env.EXAMPLE` file to `.env`. Update with your credentials.

```bash
DB_NAME=databasename #replace with the database name
DB_USER=yourusername # replace with your user name
DB_PASSWORD=yourpassword # replace with your password
```

### Databse Setup

Log in to MySQL, and use the following command to set up database:

```bash
source db/schema.sql
```

In a terminal, run the following command to seed the database:

```bash
npm run seed
```

## Usage

From the root directory, run the following to start the application:

```bash
npm run start
```

## Demo

### [Deployed Site on Heroku](https://wdm-techblog-14e8d68557e0.herokuapp.com)

![image](https://github.com/WebDevMullins/MVC-Tech-Blog/assets/6474546/8eb2258c-62f9-4f38-8b71-11a14ecca170)

## License

Tech Blog is [MIT licensed](./LICENSE).
