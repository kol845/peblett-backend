const glob = require('glob');
const MiscController = require('./routes/misc/MiscController');
const MiscRoutes = require('./routes/misc/MiscRoutes');


module.exports = (app) => {
	glob(`${__dirname}/routes/*Routes/*Routes.js`, {}, (er, files) => { // exports all files in '/routes/'
		if (er) throw er;
		files.forEach((file) => require(file)(app));
		MiscRoutes(app)
	});
};
