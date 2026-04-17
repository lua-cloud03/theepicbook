# Local Evidence Checklist

Use this checklist to capture screenshots and notes for the assignment document before moving to remote deployment.

## 1. Source review evidence

- Screenshot the repo root showing:
  - `server.js`
  - `models/`
  - `routes/`
  - `views/`
  - `db/`
- Note:
  - EpicBook is a Node/Express app with MySQL and Handlebars.

## 2. Docker evolution evidence

- Screenshot [Dockerfile.single-stage](../Dockerfile.single-stage)
- Screenshot [Dockerfile](../Dockerfile)
- Note:
  - the build evolved from single-stage to multi-stage
  - the final production path uses the multi-stage Dockerfile

## 3. Image size comparison evidence

- Screenshot the measured image sizes:
  - `docker-epicbook-app:single-stage` = `113831255`
  - `docker-epicbook-app:local` = `108496893`
- Note:
  - multi-stage is smaller by `5334362` bytes
  - this is about `5.09 MB`

## 4. Compose stack evidence

- Screenshot the local compose status output showing all services healthy:

```text
NAME                    IMAGE                                                                     COMMAND                  SERVICE   CREATED          STATUS                    PORTS
docker-epicbook-app     sha256:27aa0a2b4d7b0e87bf18a0457ad0d74e42087d332a8530a1366c149007f4f1b8   "docker-entrypoint.s…"   app       33 minutes ago   Up 33 minutes (healthy)   8080/tcp
docker-epicbook-db      mysql:8.0                                                                 "docker-entrypoint.s…"   db        37 minutes ago   Up 37 minutes (healthy)   3306/tcp, 33060/tcp
docker-epicbook-proxy   docker-epicbook-proxy:local                                               "/docker-entrypoint.…"   proxy     33 minutes ago   Up 33 minutes (healthy)   0.0.0.0:8081->80/tcp, [::]:8081->80/tcp
```

- Note:
  - Compose orchestrates the app, db, and proxy as one stack.

## 5. App via reverse proxy evidence

- Screenshot the browser at `http://127.0.0.1:8081`
- Screenshot the HTTP response headers evidence if needed:

```text
HTTP/1.1 200 OK
Server: nginx
X-Powered-By: Express
Access-Control-Allow-Origin: http://localhost
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: default-src 'self' 'unsafe-inline' data: https:;
```

- Note:
  - the application is being served through Nginx, not directly from Node.

## 6. Healthcheck evidence

- Screenshot the `/healthz` result:

```text
ok
```

- Note:
  - the stack includes healthchecks for db, app, and proxy.

## 7. Env management evidence

- Screenshot `.env.example`
- Note:
  - runtime configuration is externalized from code
  - secrets are intended to live in `.env`, not in Git

## 8. Logging and proxy config evidence

- Screenshot:
  - `server.js` logging/health/CORS block
  - `docker/nginx/conf.d/epicbook.conf`
- Note:
  - app logs are structured
  - proxy adds security headers and fronts the app

## Suggested Task 1 notes

- Reviewed the EpicBook source to identify its runtime components.
- Built a local Docker Compose stack with three services: app, db, and proxy.
- Evolved the app image from a single-stage build to a multi-stage build.
- Verified the local deployment through Nginx and `/healthz`.
- Measured the final multi-stage image against the single-stage comparison image.
