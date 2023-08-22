# Ticketster 🎟️

Welcome aboard the Ticketster Express! 🎟️ 🚀

Ticketster, your friendly neighborhood app for buying and selling tickets, invites you on a journey through its setup, configuration, and best practices. Hang on tight, because here's the inside scoop on how to harness its power!

## **🎤 About Ticketster**

Welcome to the Ticketster app - where the buying and selling of tickets comes alive with ease!

## **🔧 Prerequisites**

Before you embark on this thrilling coding adventure, ensure your toolkit is equipped with:

- **Node.js**: The beating heart of our app.
- **Kubernetes**: Our orchestration maestro.
- **Docker**: Keeping our app neatly containerized.
- **[ingress-nginx](www.kubernetes.github.io/ingress-nginx/deploy)**: The doorway into our Kubernetes domain.

## **⚙️ Setting Up Your Development Environment**

1. **Prepare Your Tools**: Have the prerequisites ready and roaring.

2. **Localhost Configuration**:

   - Tweak `/etc/hosts` to bridge the gap between the loopback address and `ticketster.com`:

   ```txt
     127.0.0.1 ticketster.com
   ```

   - Not sure how? Follow this handy [guide](https://gist.github.com/ney-l/e10efa56c1e6bcd17b1b222e4e59e61a) to map hostnames to IP addresses.
   - Freshen things up by restarting any running Skaffold tasks.
   - Give it a whirl! Open `http://ticketster.com/api/users/current` in your browser, and you should be greeted by the Auth service.

## **🚀 Dive Deep into Kubernetes Pods**

- **Basic Shell Access**:

  ```sh
  # Discover the magic ID of your pod
  kubectl get pods

  # Step inside for a closer look
  kubectl exec -it <pod_id> sh
  ```

- **For MongoDB Aficionados**:

  ```sh
  # Locate your MongoDB pod ID
  kubectl get pods

  # Step inside the world of MongoDB
  kubectl exec -it <mongo_pod_id> -- mongosh
  ```

  Dive out with a swift `Ctrl` + `D#`.

## **🌱 Cultivating New Services**

Follow these steps to plant a new microservice in the Ticketster garden:

1. Designate a new folder for your sprouting microservice.
2. Set up `package.json` and shower it with dependencies.
3. Fashion a Dockerfile and its sidekick, `.dockerignore`.
4. Craft `index.ts` as the heartbeat of your project.
5. Build the Docker image and send it off into the wide world of Docker Hub.
6. Write the Kubernetes manifest for deployment and service.
7. If your service has secrets, conjure a secret object.
8. Let `skaffold.yaml` know about your new addition.
9. Does your service need a database companion? Write the Kubernetes manifest for a MongoDB deployment and service.

## **🌍 Environment Variables & Secrets**

Your microservice's environment variables cozy up inside the `./<service-name>/.env` file. But, the Kubernetes dance requires a few steps:

1. Inject secrets from `.env` into your pod:

   ```sh
   kubectl create secret generic <service-name>-secret-env-variables --from-env-file=.env
   ```

2. Updated `.env`? Refresh your secrets:

   ```sh
   kubectl delete secret <service-name>-secret-env-variables
   kubectl create secret generic <service-name>-secret-env-variables --from-env-file=.env
   ```

## **🚪 Port Forwarding Fun**

Create magical tunnels between your machine and the pod:

```sh
kubectl port-forward <pod-id> <port>:<port-on-the-pod>
```

## **✨ Guidelines for Microservice Mastery**

- Replicate an existing microservice for a rapid launch.
- Replenish with the necessary dependencies.
- Craft a Docker image of your microservice masterpiece.
- Architect a Kubernetes deployment file.
- Synchronize with `skaffold.yaml`.
- Set up ingress rules like a pro.

## **📚 MongoDB Command Cheat Sheet**

Once inside MongoDB (see the steps above):

- `show dbs;`: List all databases
- `use orders;`: Switch to using `orders` db
- `show tables`: Show tables inside the selected db
- `db.tickets.find()`: Show everything inside `tickets` table

---

Happy coding, fellow Ticketster! 🎟️🎉🚀
