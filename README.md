# About

Ticketster App that helps users buy and sell tickets

## Project Requirements

- Node.js
- Kubernetes
- Docker
- [ingress-nginx](www.kubernetes.github.io/ingress-nginx/deploy)

## Set up

1. Make sure you have all the project requirements installed.

2. Configure `/etc/hosts`

On the development machine, configure the `/etc/hosts` to map the loopback address to `ticketster.com`

```txt
127.0.0.1 ticketster.com
```

Follow the steps listed here for a guide on how to map a hostname to an IP address.

[How to Map Hostnames to IP addresses locally](https://gist.github.com/ney-l/e10efa56c1e6bcd17b1b222e4e59e61a)

After configuring the host, kill the Skaffold task if it's already running and restart it.

Then you should be able to open `http://ticketster.com/api/users/current` in the browser and see a response from the Auth service

## Start Shell inside a pod

```sh
# Get the pod id
kubectl get pods

# start a shell inside the pod
kubectl exec -it <pod_id> sh
```

## Start MongoDB Shell inside a pod

```sh
# Get the pod id
kubectl get pods

# start a mongo shell inside the pod
kubectl exec -it <mongo_pod_id> -- mongosh

# example:
kubectl exec -it tk-orders-mongo-depl-59cb98d5db-79jd2 -- mongosh
```

To quit `Ctrl` + `D`

## Process of adding a new service

1. Create a folder for the microservice in the project directory.
2. Create package.json, install dependencies
3. Write Dockerfile and .dockerignore
4. Create `index.ts`` to run project
5. Build image, push to docker h ub
6. Write k8s file for deployment, service
7. If the microservice requires environment variables, then create a secret object for it
8. Update `skaffold.yaml` to do file sync for the new microservice
9. If the new microservice needs a DB then write k8s file for Mongodb? deployment, service

## Environment Variables

The environment variables are stored in `./<service-name>/.env` file. `<service-name>` Service Deployment file `infra/k8s/<service-name>-depl.yaml` is set up to read the secret from `<service-name>-secret-env-variables`. But you have to inject these secrets by running the below command.

When the project is first set up, run the below command to inject environment variables from `.env` file into the pod

```sh
kubectl create secret generic <service-name>-secret-env-variables --from-env-file=.env
```

Every time the `.env` file is updated, you have to delete the `<service-name>-secret-env-variables` and recreate it.

```sh
# Get the Secret
kubectl delete secret <service-name>-secret-env-variables

kubectl create secret generic <service-name>-secret-env-variables --from-env-file=.env
```

## Set up Port Forwarding

```sh
kubectl port-forward <pod-id> <port>:<port-on-the-pod>

# Example
kubectl port-forward tk-nats-depl-7f59869bb4-55qwj 4222:4222
```

## Some guidelines for adding a new Micro service

- Duplicate an existing microservice for a quick skaffold.
- Install dependencies.
- Build a docker image of the new microservice.
- Create a Kubernetes deployment file.
- Set up file sync options in the `skaffold.yaml` file
- Set up routing rules in the ingress service.

## MongoDB Commands inside mongo db

Connect to Mongodb using steps outlined above
`show dbs;`: List all databases
`use orders;`: Switch to using `orders` db
`show tables`: Show tables inside the selected db
`db.tickets.find()`: Show everything inside `tickets` table
