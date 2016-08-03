"use strict";
const EventEmitter = require('events');
const JProperties = require('./properties.js')

var Utils = require("./utils.js")
var Enum = require("./enum.js")

class JState extends EventEmitter {
	constructor(name, props) {
		super()
		this._id = Utils.GenerateID()
		this.Name = name
		this.Props = props || {}

		this._ChangeMonitor = {}
	}

	_onPropChange(prop) {
		this._ChangeMonitor[prop.Name] = true
	}

	reset() {
		this._ChangeMonitor = {}
	}

	addProperty(prop) {
		if (!(prop instanceof JProperties))
			throw new Error("Type Mismatch")

		//Register on Change
		prop.on("change", prop => {
			this._onPropChange(prop)
		})

		//Add Prop
		this._onPropChange(prop)

		this.Props[prop.Name] = prop
	}

	removeProperty(name) {
		var ins = this.Props[name]
		if (ins === undefined)
			return false

		ins.removeAllListeners("change")
		delete this._ChangeMonitor[name]
		delete this.Props[name]
		return true
	}

	getProperty(name) {
		return this.Props[name]
	}

	toObject() {
		var res = {
			_id: this._id,
			Name: this.Name,
			Prop: {}
		}

		for (var key in this.Props) {
			var itm = this.Props[key]
			res.Prop[key] = itm.getValue()
		}
		return res
	}

	toObjectDiff() {
		var res = {
			_id: this._id,
			Name: this.Name,
			Prop: {}
		}

		for (var key in this._ChangeMonitor) {
			var itm = this.Props[key]
			res.Prop[key] = itm.getValue()
		}
		this.reset()
		return res
	}
}

module.exports = JState