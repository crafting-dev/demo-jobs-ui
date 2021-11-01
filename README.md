# Demo Jobs UI

This is the frontend UI for a two sided marketplace (job board) demo app.

It is built with React and Typescript, and bootstrapped using `create-react-app`, utilizing data from a [backend API](https://github.com/crafting-dev/demo-jobs-backend) using `fetch()`.

## Local setup

To get started in your local sandbox, first have the [backend API](https://github.com/crafting-dev/demo-jobs-backend) running and accessible at a specific port. Then:

1. Checkout this repo during your App configuration stage.
2. Install packages: `npm install`
3. Start server: `npm start`

The following `App configuration` was used to create this app:

```
endpoints:
- http:
    routes:
    - backend:
        port: web
        target: frontend
      path_prefix: /
  name: web
services:
- description: React frontend
  name: frontend
  workspace:
    checkouts:
    - path: src/frontend
      repo:
        git: https://github.com/crafting-dev/demo-jobs-ui.git
    packages:
    - name: nodejs
      version: ~16
    ports:
    - name: web
      port: 3000
      protocol: HTTP/TCP
```

## Design

This UI comes with the following functionalities:

#### Employer

- Account creation
- Simple login
- List postings and view details
- Create postings
- Process applications

#### Worker

- Account creation
- Simple login
- Query postings based on keywords and tags then submit application
- View submitted applications and corresponding postings
