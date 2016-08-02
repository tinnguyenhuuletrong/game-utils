const assert = require('chai').assert;
const EJModifierType = require('../lib/enum.js').EJModifierType
const JProperties = require('../lib/properties.js')

describe('+ JProperties', function() {
	it('create, get, set base value', function() {
		var tmp = new JProperties("test", 10)
		assert.equal(tmp.getValue(), 10)

		tmp.once("change", (val) => {
			assert.equal(val, 20)
		})

		tmp.setValue(20)
		assert.equal(tmp.getValue(), 20)
	});

	it('modifier value', function() {
		var tmp = new JProperties("test", 10)
		assert.equal(tmp.getValue(), 10)

		var mod = tmp.createModifier(EJModifierType.ADD)
		mod.val = 100

		assert.equal(tmp.getValue(), 110)

		mod = tmp.createModifier(EJModifierType.ADD)
		mod.val = -5

		assert.equal(tmp.getValue(), 105)

		mod = tmp.createModifier(EJModifierType.PERCENT)
		mod.val = 0.8

		assert.equal(tmp.getValue(), 113)

		assert.equal(tmp.removeModifier(mod), true)

		assert.equal(tmp.getValue(), 105)

	});

	it('clamp value', function() {
		var tmp = new JProperties("test", 10)
		assert.equal(tmp.getValue(), 10)

		var mod = tmp.createModifier(EJModifierType.ADD)
		mod.val = 100

		mod = tmp.createModifier(EJModifierType.PERCENT)
		mod.val = 0.8

		tmp.setLimit(80, 110)

		// 110 insted of 118 
		assert.equal(tmp.getValue(), 110)
	});
});