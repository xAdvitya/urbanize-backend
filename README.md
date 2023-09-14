# Urbanize E-Commerce Backend

![nodejs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![graphql](https://img.shields.io/badge/GraphQL-E10098.svg?style=for-the-badge&logo=GraphQL&logoColor=white)

Welcome to the backend repository of Urbanize E-Commerce, a powerful and flexible e-commerce platform.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Database design](#database-design)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## About

Urbanize E-Commerce Backend is the backend server component of a modern e-commerce platform. It's built with [Node.js](https://nodejs.org/) and [TypeScript](https://www.typescriptlang.org/) using [Express](https://expressjs.com/) and [TypeORM](https://typeorm.io/).

## Features

- User authentication and authorization
- Product and category management
- Shopping cart and order processing
- Search and filtering functionality

## Database Design

![urbanize drawio(1)](https://github.com/xAdvitya/urbanize-backend/assets/54709416/617095be-6e9b-4a20-aab1-10688cba1661)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 19.8.1)
- [PostgreSQL](https://www.postgresql.org/) (version 15.4)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/urbanize-backend.git
   ```

2. Change directory to the project folder:

   ```
   cd urbanize-backend
   ```

3. Install the project dependencies:
   ```
   yarn install
   ```

### Configuration

1. Create a `.env` file in the project root and configure your environment variables.You can use the `.env.example` file as a template.

2. Modify the `.env` file with your own settings:

   #### Database connection URL

   `DATABASE_URL=postgresql://your-username:your-password@your-host:your-port/your-database-name`

   #### JWT secret key

   `JWT_SECRET=your-secret-key`

### Usage

To start the Urbanize E-Commerce Backend, run the following command:

`yarn dev`
