# Ansible Deployment

This Ansible layout targets the assignment architecture:

- one frontend Ubuntu VM
- one backend Ubuntu VM
- one managed RDS MySQL database
- frontend host acts as the SSH jump host
- Nginx on the frontend proxies traffic to the backend private IP
- Node.js and PM2 run on the backend host
- schema and seed SQL are imported into RDS from the backend host
