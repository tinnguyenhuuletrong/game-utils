"use strict";
const EventEmitter = require('events');

var Utils = require("./utils.js")
var Enum = require("./enum.js")
class JProperties extends EventEmitter {

	constructor(name, defaultVal) {
		super()

		this.Name = name
		this.Base = defaultVal
		this._ModifierList = []
	}

	setLimit(min, max) {
		this.Min = min
		this.Max = max
	}

	getValue() {
		var addValue = 0
		var perValue = 0

		this._ModifierList.forEach(itm => {
			if (itm.type === Enum.EJModifierType.ADD)
				addValue += itm.val
			else if (itm.type === Enum.EJModifierType.PERCENT)
				perValue += itm.val
		})

		var val = this.Base + addValue + this.Base * perValue

		if (this.Min != -1 && this.Max != -1)
			val = Utils.Clamp(val, this.Min, this.Max)

		return val
	}

	setValue(val) {
		this.emit("change", val)
		this.Base = val
	}

	createModifier(type, val = 0) {
		if (!Utils.EnumValueValid(type, Enum.EJModifierType))
			throw Exception("ModifierType Invalid")

		var mod = {
			_id: Utils.GenerateID(),
			type: type,
			val: val
		}
		this._ModifierList.push(mod)

		return mod
	}

	removeModifier(mod) {
		var udid = mod._id
		var Data = this._ModifierList
		for (var i = 0; i < Data.length; i++) {
			if (Data[i]._id === udid) {
				this._ModifierList.splice(i, 1)
				return true
			}
		}
		return false
	}
}

module.exports = JProperties