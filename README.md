# Demo Jobs UI

This is the frontend UI for a two sided marketplace (job board) demo app.

It is built with React and Typescript, and bootstrapped using `create-react-app`, consuming data from a [backend API](https://github.com/crafting-dev/demo-jobs-backend).

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

## Local setup

To get started in your local sandbox, first have the [backend API](https://github.com/crafting-dev/demo-jobs-backend) running and accessible at a specific port. Then:

1. Checkout this repo during your App configuration stage.
2. Install packages: `npm install`
3. Start server: `npm start`

The following [App Definition](https://docs.sandboxes.cloud/docs/app-definition) was used to create this app:

```yaml
endpoints:
- name: web
  http:
    routes:
    - pathPrefix: "/"
      backend:
        target: frontend
        port: web
    authProxy:
      disabled: true
workspaces:
- name: frontend
  description: Demo App frontend using React Typescript
  ports:
  - name: web
    port: 3000
    protocol: HTTP/TCP
  checkouts:
  - path: frontend
    repo:
      git: https://github.com/crafting-dev/demo-jobs-ui
  packages:
  - name: nodejs
    version: 16.12.0
```

## Notes and Caveats

Sandbox external URL `https://XXX.sandboxes.run` is readily available for development. But if you are using local Visual Studio Code and want some remote ports locally available, you can define [workspace settings](https://code.visualstudio.com/docs/getstarted/settings) to [forward](https://code.visualstudio.com/docs/remote/ssh#_forwarding-a-port-creating-ssh-tunnel) the desired remote ports to your local machine.

For example, to forward port `3000` locally, you can create the file `.vscode/settings.json` and add:

```json
{
  "remote.SSH.defaultForwardedPorts": [
    {
      "localPort": 3000,
      "name": "web",
      "remotePort": 3000
    }
  ]
}
```

Then `http://localhost:3000` will be accessible for local development.
