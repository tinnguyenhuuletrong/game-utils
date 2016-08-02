const assert = require('chai').assert;
const EJModifierType = require('../lib/enum.js').EJModifierType
const JProperties = require('../lib/properties.js')

describe('+ JProperties', function() {
	it('create, get, set base value', function() {
		var tmp = new JProperties("test", 10)
		assert.equal(tmp.getValue(), 10)

		//Base Change Notify
		tmp.once("change", (val) => {
			assert.equal(val, 20)
		})

		tmp.setValue(20)
		assert.equal(tmp.getValue(), 20)
	});

	it('modifier value', function() {
		var tmp = new JProperties("test", 10)
		
		//Base Value
		assert.equal(tmp.getValue(), 10)

		var mod = tmp.createModifier(EJModifierType.ADD)
		mod.val = 100

		//1st Modify Value
		assert.equal(tmp.getValue(), 110)

		mod = tmp.createModifier(EJModifierType.ADD)
		mod.val = -5

		//2nd Modify Value
		assert.equal(tmp.getValue(), 105)

		mod = tmp.createModifier(EJModifierType.PERCENT)
		mod.val = 0.8

		//3nd Modify Value
		assert.equal(tmp.getValue(), 113)

		//Remove last one
		assert.equal(tmp.removeModifier(mod), true)

		//Check Final Value
		assert.equal(tmp.getValue(), 105)

	});

	it('clamp value', function() {
		var tmp = new JProperties("test", 10)
		assert.equal(tmp.getValue(), 10)

		//Some Modifier
		var mod = tmp.createModifier(EJModifierType.ADD, 100)
		mod = tmp.createModifier(EJModifierType.PERCENT, 0.8)

		tmp.setLimit(80, 110)

		// 110 insted of 118 
		assert.equal(tmp.getValue(), 110)
	});
});