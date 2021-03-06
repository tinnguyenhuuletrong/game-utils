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
		this.Min = null
		this.Max = null
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

		if (this.Min !== null && this.Max !== null)
			val = Utils.Clamp(val, this.Min, this.Max)

		return val
	}

	setValue(val) {
		this.Base = val
		this.emit("change", this)
	}

	createModifier(type, val) {
		if (!Utils.EnumValueValid(type, Enum.EJModifierType))
			throw new Error("ModifierType Invalid")

		var self = this
		var mod = {
			_id: Utils.GenerateID(),
			type: type,
			_val: 0,
			get val() {
				return this._val
			},
			set val(val) {
				this._val = val
				self.emit("change", self)
			}
		}

		this._ModifierList.push(mod)

		//Assign Defaule value
		if (val !== null)
			mod.val = val

		return mod
	}

	removeModifier(mod) {
		var udid = mod._id
		var Data = this._ModifierList
		for (var i = 0; i < Data.length; i++) {
			if (Data[i]._id === udid) {
				this._ModifierList.splice(i, 1)
				this.emit("change", this)
				return true
			}
		}
		return false
	}
}

module.exports = JProperties