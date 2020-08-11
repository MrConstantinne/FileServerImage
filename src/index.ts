import app from './app';
import dotenv from 'dotenv';

import { startConnectionDB } from './database';

dotenv.config();

const main = async () => {

    const PORT = process.env.PORT

    await Promise.all([
        startConnectionDB(),
        app.listen(PORT, () => {
            console.info(`Сервер: ${ PORT }` )
        })
    ]);
};

main();