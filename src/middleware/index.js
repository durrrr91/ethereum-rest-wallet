import { Router } from 'express';

export default ({ config, db }) => {
	let routes = Router();

	// add middleware here
	// routes.use('/api/', function (req, res, next) {
	// 	console.log('Time:', Date.now())
	// 	next()
	// })
	return routes;
}
