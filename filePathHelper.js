/**
 * Helper functions referred from https://github.com/webpack/webpack/blob/master/lib/ModuleFilenameHelpers.js
 */

const asRegExp = test => {
	if (typeof test === "string") {
		test = new RegExp("^" + test.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"));
	}
	return test;
};

function matchPart(str, test) {
	if (!test) return true;
	test = asRegExp(test);
	if (Array.isArray(test)) {
		return test.map(asRegExp).some(regExp => regExp.test(str));
	} else {
		return test.test(str);
	}
}

function matchObject(obj, str) {
	if (obj.test) {
		if (!matchPart(str, obj.test)) {
			return false;
		}
	}
	if (obj.include) {
		if (!matchPart(str, obj.include)) {
			return false;
		}
	}
	if (obj.exclude) {
		if (matchPart(str, obj.exclude)) {
			return false;
		}
	}
	return true;
}

module.exports = {
	matchPart,
	matchObject,
};

