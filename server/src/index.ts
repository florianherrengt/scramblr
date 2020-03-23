require('dotenv').config();
import 'reflect-metadata';
import { createApp } from './app';

(async () => {
    const port = process.env.PORT || 8080;
    const app = await createApp();
    app.listen(port, () => {
        console.info(`server listening on  http://localhost:${port}`);
    });
})();
