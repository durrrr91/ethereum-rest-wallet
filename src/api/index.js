import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import wallets from './wallets';
import walletActions from './walletActions';

export default ({ config, db }) => {
	let api = Router();
	api.use('/facets', facets({ config, db }));
	api.use('/wallets', wallets({ config, db }));
	
	api.get('/getBalance/:address', walletActions.getBalance);
	api.post('/transaction', walletActions.sendTransaction);

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
