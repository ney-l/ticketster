import express from 'express';
import { json } from 'body-parser';

const PORT = 3000;
const SERVICE_NAME = 'tk-auth-srv';

const app = express();

app.use(json());

app.listen(PORT, () => {
  console.log(`Listening on http://${SERVICE_NAME}:${PORT} ⚡️`);
});
