import { connect } from 'mongoose';

export const startConnectionDB = async () => {
    try {
        await connect(
            `${process.env.MONGO_DB_URIS}`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
            });
        console.info('БД - ок');
    } catch {
        console.error('Подключение к БД невозможно')
    }
};