import express from 'express';
import { json } from 'body-parser';

const PORT = 3000;
const SERVICE_NAME = 'tk-auth-srv';
const SERVICE_DISPLAY_NAME = 'Auth Service';

const app = express();

app.use(json());

app.get('/api/users/me', (req, res) => {
  return res.json({
    currentUser: {},
    _meta: { serviceName: SERVICE_DISPLAY_NAME },
  });
});

app.listen(PORT, () => {
  console.log(
    `${SERVICE_DISPLAY_NAME} listening on http://${SERVICE_NAME}:${PORT} ⚡️`
  );
});
