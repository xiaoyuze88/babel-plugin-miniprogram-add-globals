const { matchObject } = require('./filePathHelper');

function babelPluginMiniprogramAddGlobals(babel) {
	const { template } = babel;
	return {
		name: 'miniprogram-add-globals',
		visitor: {
			Program(path, { file, opts }) {
				if (!opts) return;

				const { globals } = opts;
				const { filename } = file.opts;

				if (!matchObject(opts, filename)) return;
				if (!Array.isArray(globals)) return;

				const globalStr = globals.join(', ');

				path.unshiftContainer('body', template(`const { ${globalStr} } = global;\n`)());
			},
		}
	};
}

module.exports = babelPluginMiniprogramAddGlobals;