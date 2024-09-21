# Fullstack Application - FastAPI, React, MySQL with Docker

👋 Welcome to the **Ultimate Web Racer** project! This application provides a React interface where users can input URLs to be compared. It connects to a FastAPI backend, which asynchronously communicates with the Google Pagespeed API to evaluate the URL performance. Backend processes these responses, determines the fastest URL, store the results in database and returns them back to the React frontend for display...

<img src="https://aws-random-files.s3.us-west-2.amazonaws.com/UWR.PNG" />

## 📑 Table of Contents

- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Suggestions](#suggestions)
- [Disclaimer](#disclaimer)


## <a id="project-structure">📁 Project Structure:</a>
*Note: This structure includes only the relevant folders and files.*

```
project
  ├─ backend/
  │    ├── .env ────────────────────────── .env file for backend 
  │    ├── db_config.py ────────────────── sqlalchemy + mysql configurations
  │    ├── db_models.py ────────────────── sqlalchemy models definitions
  │    ├── dependencies.py ─────────────── middlewares for endpoints
  │    ├── Dockerfile ──────────────────── Dockerfile for backend
  │    ├── main.py ─────────────────────── fastAPI entrypoint
  │    ├── requirements.txt ────────────── dependencies to install
  │    ├── router.py ───────────────────── endpoints router
  │    ├── schemas.py ──────────────────── pydantic schemas definitions
  │    ├── service.py ──────────────────── main logic
  │    └── wait-for-it.sh ──────────────── script to check mysql service
  │
  ├─ frontend/
  │    ├── public/
  │    └── src/
  │        └── components/
  │            └── Home.js ─────────────── Home component
  │        └── services/
  │            └── api.js ──────────────── axios configuration
  │    ├── index.js ────────────────────── React entrypoint
  │    ├── .env ────────────────────────── .env file for frontend
  │    └── Dockerfile ──────────────────── Dockerfile for frontend
  │
  ├── .env ─────────────────────────────── .env file for db service
  └── docker-compose.yml ───────────────── docker-compose to build & run project
```

## <a id="technologies-used"> 🚩 Technologies Used</a>
-  Backend: FastAPI (Python)
-  Frontend: React (JavaScript)
-  Database: MySQL
-  Containerization: Docker, Docker Compose


## <a id="prerequisites">🔧 Prerequisites </a>
Before running this project, ensure you have the following installed:

- Docker
- Docker Compose

## <a id="setup-and-installation">⚡ Setup and Installation  </a>
Follow these steps to run the project:

1. #### Clone this repository:
    ```bash
    git clone https://github.com/PanchoG17/agea-test.git
    ```
3. #### Navigate into repository:
    ```bash
    cd agea_test
    ```
4. #### Build & Run docker-compose project:
    ```bash
    docker-compose up --build
    ```

## <a id="usage">🎉 Usage </a>

Once the application is up and running, you can access:

- #### Frontend: http://localhost:3000
- #### Backend API: http://localhost:8000/docs for the interactive FastAPI documentation (Swagger UI).


## <a id="suggestions">🎯 Suggestions </a>

- Frontend: Add a dynamic "Add URL" button to allow users to input and compare multiple URLs beyond two.
- Frontend: Display HTTP 422 Errors in error message.
- Backend: Create a new API endpoint to retrieve the history of URL comparisons made by users.
- Testing: Add unit and integration tests to ensure the functionality of both the comparison logic and history retrieval.
- Security: Add authentication or rate-limiting to the backend to prevent misuse of the comparison feature.
- Security: Remove enviroment variables from repo.
- Optimization: Consider using caching to store recent comparison results to improve performance when comparing the same URLs repeatedly.


## <a id="disclaimer">⚠️ Disclaimer </a>

All environment variables used in this project are included in `.env` files for testing purposes only. **This setup is intended for development and testing environments, not for production use.**

In a production environment, sensitive information such as API keys, database credentials, and other environment variables should be stored securely using a service such as [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/), [Azure Key Vault](https://azure.microsoft.com/en-us/services/key-vault/), [Google Secret Manager](https://cloud.google.com/secret-manager), or environment variable management tools provided by the hosting platform. **Never expose sensitive data in public repositories.**


