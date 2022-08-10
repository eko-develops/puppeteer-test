const config = {
	width: 1000,
	height: 1080,
};

const browserConfig = {
	headless: false,
	defaultViewport: {
		width: config.width,
		height: config.height,
	},
	args: [`--window-size=${config.width},${config.height}`],
};

module.exports = { config, browserConfig };
