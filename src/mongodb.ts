import { connect } from 'mongoose';

export const connectionDB = async () => {
    try {
        await connect(
            `${ process.env.MONGO_URL }`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
            });
        console.info('Connection to the database is established');
    } catch {
        console.error('Connection to the database is not possible');
    }
};