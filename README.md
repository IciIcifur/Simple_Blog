# Simple Blog

A full-stack blog platform built as a learning project with focus on CI/CD workflows.

"Simple Blog" is a blog application; the goal of the project is practice in DevOps.
The repository combines a `Django` backend (`Python`) with an `Angular` frontend (`TypeScript`), packaged with `Docker` 
and automated through `GitHub Actions` workflows.

---

## 🎯 Objectives

The primary objective of this project is to learn a complete delivery cycle for a multi-stack application:

- GitHub hooks,
- automated release packaging,
- container image build-and-push workflows,
- frontend/backend integration under a unified deployment model.

In practice, one of the most challenging parts has been coordinating the Angular + Django stack boundary .

## 🧩 Tech Stack
![Angular 18](https://img.shields.io/badge/Angular_18-DD0031?style=flat-square&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Apollo GraphQL](https://img.shields.io/badge/Apollo_GraphQL-311C87?style=flat-square&logo=apollo-graphql&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=flat-square&logo=graphql&logoColor=white)
![RxJS](https://img.shields.io/badge/RxJS-B7178C?style=flat-square&logo=reactivex&logoColor=white)
![Django](https://img.shields.io/badge/Django-092E20?style=flat-square&logo=django&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![Docker Hub](https://img.shields.io/badge/Docker_Hub-2496ED?style=flat-square&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=flat-square&logo=nginx&logoColor=white)
![Karma](https://img.shields.io/badge/Karma-56C0C0?style=flat-square&logo=karma&logoColor=white)
![Husky](https://img.shields.io/badge/Husky-000000?style=flat-square)

### Frameworks and tooling

#### Frontend
Yarn | Angular 18 | Apollo Angular | GraphQL | RxJS | Taiga UI | Karma
#### Backend
pip | Django | Graphene-Django
#### DevOps
Docker | Nginx | GitHub Actions
#### Code Style
Husky | Black (Python) | Prettier (Frontend)

## 🌐 Deployment

The project is currently deployed on a low-resource VPS instance and is publicly accessible at:

**http://2.26.113.58:4200/**

This environment is intended for demonstration and validation purposes (container orchestration, service connectivity, 
reverse-proxy behavior, and release workflow checks) and **will not survive** high traffic.

## Repository Structure

```text
.
├── .github/workflows/           # CI/CD pipelines
│   ├── linting.yml
│   ├── karma.yml
│   ├── zip&release.yml
│   └── dockerhub.yml
├── backend/                     # Django app modules
├── simpleBlog/                  # Django project settings / WSGI
├── frontend/                    # Angular application
│   ├── package.json
│   ├── Dockerfile               # Frontend image
│   └── ...
├── nginx/                       # Reverse-proxy image context/config
├── Dockerfile                   # Backend image
├── docker-compose.yml           # Multi-service orchestration
├── Pipfile / Pipfile.lock
├── requirements.txt
├── manage.py
├── .env.example
├── schema.json
└── schema.json.graphql
```

## 🛠️ Starting the App

> Default branch: `master`

### Prerequisites

- Python 3.11+
- Node.js (compatible with Angular 18; preferably LTS)

### Backend setup

```bash
pip install pipenv
pipenv install --dev
pipenv shell
python manage.py migrate
python manage.py runserver
```

or

```bash
pipenv run python manage.py migrate
pipenv run python manage.py runserver
```

### Frontend setup

```bash
cd frontend
yarn install
yarn start
```

Frontend default dev server: `http://localhost:4200`

### Run via Docker Compose

At repository root:

```bash
docker-compose up --build
```

Current compose setup defines two containers:

- `web` (Django + Gunicorn, bind `0.0.0.0:6000`, exposed internally),
- `frontend` (Nginx-served Angular build, mapped to `4200:80`).

## 📦 Docker Setup

### Backend image

Root `Dockerfile`:

- base: `python:3.11-slim`,
- installs dependencies from `requirements.txt`.

### Frontend image

`frontend/Dockerfile` is multi-stage:

- build stage (`node:20-alpine3.20`) using `yarn build`, 
- runtime stage (`nginx:latest`) serving `dist/frontend/browser`.

### Nginx image

`nginx/Dockerfile` replaces default Nginx config with custom `nginx.conf`.

## Frontend Scripts

Common commands:

- `yarn start` - Angular dev server
- `yarn build`
- `yarn test` - **Karma** tests
- `yarn prettier` - format files
- `yarn prettier_check` - formatting validation
- `yarn graphql` - **GraphQL codegen**


## Backend Tooling

Configured scripts include:

- `build-req` - freeze dependencies to `requirements.txt`
- `build-image` - build backend Docker image
- `run-container` - start Docker Compose
- `remove-image` / `remove-container` - cleanup helpers

Main packages include `graphene-django` and `django-cors-headers`, confirming GraphQL API and cross-origin integration support.

## 🔄 CI/CD Pipelines

_All workflows are under `.github/workflows`._

### Linting (`linting.yml`) - on `push`

- **Backend job**:
    - Python 3.11 setup
    - `pipenv install --dev`
    - `black --check simpleBlog backend`
- **Frontend job**:
    - `yarn install`
    - `yarn prettier_check` (in `frontend`)

### Frontend tests (`karma.yml`) - on `push`

- installs Chrome + chromedriver on runner,
- installs frontend dependencies,
- runs Karma tests headlessly:
    - `yarn test --watch=false --browsers=ChromeHeadless`.

### ZIP release to (`zip&release.yml`) on PR close into `master`

- archives repository into `simpleBlog.zip`,
- creates GitHub Release using PR number/title for naming and tag.

### DockerHub image publish (`dockerhub.yml`) - on PR close into `master`

Builds and pushes three images:

- backend (`context: .`, tag suffix `:web`)
- proxy (`context: ./nginx`, tag suffix `:nginx`)
- frontend (`context: ./frontend`, tag suffix `:frontend`)

Image tag pattern:

`{DOCKER_NAMESPACE}/simpleblog-v{PR_NUMBER}:{service}`

Required repository secrets:

- `DOCKER_USERNAME`
- `DOCKER_PASSWORD`
- `DOCKER_NAMESPACE`

## Angular & Django

This repository demonstrates integration challenges across stacks:

- GraphQL schema and generated frontend client synchronization (`schema.json`, `schema.json.graphql`, codegen script),
- CORS and API endpoint consistency between dev and containerized modes,
- runtime contract between Gunicorn-backed API and Nginx-served frontend.

## Known Constraints

Database `db.sqlite3` is currently committed with a strong belief in its small size and a fast solution for the study project.