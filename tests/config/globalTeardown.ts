import server from '../../lib/server';
import { db } from '../../lib/db';

module.exports = (async () => {
	try {
		await db.destroy();
		server.close();
		process.exit(0);
	} catch (err) {
		server.log.error(err);
		server.close();
		process.exit(23);
	}
}) as () => Promise<void>;
