const glob = require('glob');
const MiscController = require('./routes/misc/MiscController');
const MiscRoutes = require('./routes/misc/MiscRoutes');

import { Application } from 'express';


const routes = (app:Application) => {
	glob(`${__dirname}/routes/*Routes/*Routes.ts`, {}, (er:Error, files:string[]) => { // exports all files in '/routes/'
		if (er) throw er;
		files.forEach((file) => require(file)(app));
		MiscRoutes(app)
	});
};
export default routes;