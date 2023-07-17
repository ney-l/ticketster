import express from 'express';
import { json } from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

const PORT = 3000;
const SERVICE_NAME = 'tk-auth-srv';
const SERVICE_DISPLAY_NAME = 'Auth Service';

const app = express();

app.use(json());

/**
 * Routes 🚏
 */
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

/**
 * Start server 🚀
 */
app.listen(PORT, () => {
  console.log(`${SERVICE_DISPLAY_NAME} listening on http://${SERVICE_NAME}:${PORT} ⚡️`);
});
