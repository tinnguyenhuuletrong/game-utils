"use strict";
var uuid = require('node-uuid');

class Utils {
	static GenerateID() {
		return uuid.v4();
	}

	static EnumValueValid(val, EnumType) {
		for (var key in EnumType) {
			if (EnumType[key] === val)
				return true
		}

		return false
	}

	static Clamp(num, min, max) {
		return num < min ? min : num > max ? max : num;
	}
}

module.exports = Utils