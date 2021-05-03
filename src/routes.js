const glob = require('glob');

module.exports = (app) => {
	glob(`${__dirname}/routes/**/*Routes.js`, {}, (er, files) => { // exports all files in '/routes/'
		if (er) throw er;
		files.forEach((file) => require(file)(app));
	});
};
