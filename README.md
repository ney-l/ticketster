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

Then you should be able to open `http://ticketster.com/api/users/me` in the browser and see a response from the Auth service
