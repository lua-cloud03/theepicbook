# Ansible Deployment

This Ansible layout targets the Dockerized assignment architecture:

- one Ubuntu VM
- Docker Engine installed on the target host
- Docker Compose plugin installed on the target host
- EpicBook deployed as a three-service Compose stack:
  - `docker-epicbook-proxy`
  - `docker-epicbook-app`
  - `docker-epicbook-db`

## What Ansible does

- installs Docker and Docker Compose plugin
- creates the remote deployment directory
- synchronizes the repository to the target host
- ensures `.env` exists on the target host
- starts the Compose stack
- prints service status for verification

## Usage

1. Copy `inventory/hosts.ini.example` to `inventory/hosts.ini`.
2. Fill in the real EC2 host, user, and SSH key path.
3. Copy `.env.example` to `.env` in the repo root and set real values.
4. Run:

```bash
ansible-galaxy collection install -r requirements.yml
ansible-playbook playbooks/site.yml
```
