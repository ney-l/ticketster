# Auth Service

A microservice built using Express.js, TypeScript, MongoDB, Docker and Kubernetes for authentication.

## Authentication Flow

![Auth Flow](docs/auth-flow.svg)

## Environment Variables

The environment variables are stored in `./auth/.env` file. Auth Service Deployment file `infra/k8s/auth-depl.yaml` is set up to read the secret from `secret-env-variables`. But you have to inject these secrets by running the below command.

When the project is first set up, run the below command to inject environment variables from `.env` file into the pod

```sh
kubectl create secret generic secret-env-variables --from-env-file=.env
```

Every time the `.env` file is updated, you have to delete the `secret-env-variables` and recreate it.

```sh
# Get the Secret
kubectl delete secret secret-env-variables

kubectl create secret generic secret-env-variables --from-env-file=.env
```
