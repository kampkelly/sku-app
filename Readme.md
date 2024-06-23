# SKU Project Overview

This project consists of two main parts:
1. **Frontend**: A Next.js application located in the `sku-client` folder.
2. **Backend**: A Django REST framework application located in the `sku-server` folder.

## Table of Contents
- [Project Overview](#project-overview)
- [Installation](#installation)
  - [Frontend (Next.js)](#frontend-nextjs)
  - [Backend (Django)](#backend-django)
- [Running the Application](#running-the-application)
  - [Frontend (Next.js)](#running-frontend-nextjs)
  - [Backend (Django)](#running-backend-django)
- [API Routes](#api-routes)
- [Running Tests](#running-tests)
  - [Frontend (Next.js)](#testing-frontend-nextjs)
  - [Backend (Django)](#testing-backend-django)

## Installation

### Frontend (Next.js)

1. Install the dependencies:
   Recommended to use node version 18.20.3 upwards
   ```sh
   make install-nextjs
   ```

### Backend (Django)

1. Create and activate a virtual environment:
    ```sh
    cd sku-server
    python -m venv venv
    source venv/bin/activate
    ```

2. Install the dependencies:
    ```sh
    make install-dependencies-django
    ```

3. Apply the migrations:
    ```sh
    make migrate-django
    ```

## Running the Application

### Running Frontend (Next.js)

1. Navigate to the `sku-client` folder:
    ```sh
    make start-nextjs
    ```

### Running Backend (Django)

1. Start the development server:
    ```sh
    make start-django
    ```
## API Routes

The Django REST framework provides the following routes:

- `GET /sku`: Retrieve a list of all SKUs.
- `POST /sku`: Create a new SKU.
- `GET /sku/{id}`: Retrieve details of a specific SKU by ID.
- `PUT /sku/{id}`: Update a specific SKU by ID.
- `DELETE /sku/{id}`: Delete a specific SKU by ID.

To view the API schema, visit http://127.0.0.1:8000/api_v1/openapi
## Running Tests

### Testing Frontend (Next.js)

1. Navigate to the `sku-client` folder:
    ```sh
    cd sku-client
    ```

2. Run the tests:
    ```sh
    make test-nextjs
    ```

### Testing Backend (Django)

1. Navigate to the `sku-server` folder:
    ```sh
    cd sku-server
    ```

2. Run the tests:
    ```sh
    make test-django
    ```
