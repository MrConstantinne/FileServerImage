import app from './app';

import { connectionDB } from './mongodb';

const PORT = process.env.PORT || 3000;

connectionDB();

app.listen(PORT, () => {
    console.info(`The server is running on the port: ${ PORT }` );
});
