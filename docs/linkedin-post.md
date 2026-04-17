# LinkedIn Post

This week I took EpicBook from source code to a working Dockerized deployment on AWS.  
I started by reviewing the app architecture, then evolved the build from a single-stage Docker image to a final multi-stage production image.  
That comparison mattered because it gave me measurable optimization results instead of vague claims.  
My final multi-stage image came out about 5.09 MB smaller than the single-stage comparison image.  
I then built the full stack locally with Docker Compose using three services: app, MySQL, and Nginx.  
After validating healthchecks, reverse proxying, environment-based configuration, and logging locally, I provisioned a separate EC2 instance for this Docker deployment.  
I automated the remote deployment with Ansible and verified the application publicly through the VM endpoint.  
The one decision that improved reliability the most was validating the full stack locally before touching cloud deployment, because it reduced remote debugging to only infrastructure and host-specific issues.  
This project reinforced that containerization is not just about packaging an app, but about building repeatable, observable, and production-ready runtime behavior.  

#Docker #DevOps #AWS #Ansible #Terraform #Nginx #Nodejs #CloudEngineering
