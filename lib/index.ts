import config from './config';
import server from './server';

const start = async (): Promise<void> => {
	try {
		await server.listen(config.port);
	} catch (err) {
		server.log.error(err);
		process.exit(666);
	}
};

process.on('uncaughtException', (error) => {
	console.error(error);
	process.exit(331);
});
process.on('unhandledRejection', (error) => {
	console.error(error);
	process.exit(332);
});

start();
