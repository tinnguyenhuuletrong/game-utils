const assert = require('chai').assert;
const expect = require('chai').expect
const EJModifierType = require('../lib/enum.js').EJModifierType
const JProperties = require('../lib/properties.js')
const JState = require('../lib/state.js')

describe('+ JState', function() {
	it('create, get, set properties', function() {
		var tmp = new JState("test")

		//Default Obj State
		expect(tmp.toObject()).to.deep.equal({
			Name: "test",
			_id: tmp._id,
			Prop: {}
		});

		//Add Prop
		tmp.addProperty(new JProperties("damage", 10))

		expect(tmp.toObject()).to.deep.equal({
			Name: "test",
			_id: tmp._id,
			Prop: {
				damage: 10
			}
		});

		//Get Prop Value
		expect(tmp.getProperty("damage").getValue()).to.equal(10)
	});

	it('state Patch', function() {
		var tmp = new JState("test")

		tmp.addProperty(new JProperties("damage", 10))
		tmp.addProperty(new JProperties("def", 20))
		tmp.addProperty(new JProperties("atkspeed", 1.5))

		//Default Obj State
		expect(tmp.toObjectDiff()).to.deep.equal({
			Name: "test",
			_id: tmp._id,
			Prop: {
				damage: 10,
				def: 20,
				atkspeed: 1.5
			}
		});

		//Modifier
		var mod = tmp.getProperty("atkspeed").createModifier(EJModifierType.PERCENT, 0.5)

		//Patch Only atkSpeed
		expect(tmp.toObjectDiff()).to.deep.equal({
			Name: "test",
			_id: tmp._id,
			Prop: {
				atkspeed: 2.25
			}
		});

		//Nothing Change
		expect(tmp.toObjectDiff()).to.deep.equal({
			Name: "test",
			_id: tmp._id,
			Prop: {}
		});

		mod.val = 2

		//Patch Only atkSpeed
		expect(tmp.toObjectDiff()).to.deep.equal({
			Name: "test",
			_id: tmp._id,
			Prop: {
				atkspeed: 4.5
			}
		});

		//Modify it
		mod.val = 0.5

		//Remove Prop
		expect(tmp.removeProperty("atkspeed")).to.equal(true)
		expect(tmp.removeProperty("atkspeed1")).to.equal(false)

		//Modify it again
		mod.val = 1

		//Modify damage
		tmp.getProperty("damage").createModifier(EJModifierType.PERCENT, 0.5)

		//Should be empty because of pro removed
		expect(tmp.toObjectDiff()).to.deep.equal({
			Name: "test",
			_id: tmp._id,
			Prop: {
				damage: 15
			}
		});
	});

	it('exception', function() {
		var tmp = new JState("test")

		var func = () => {
			tmp.addProperty("damage")
		}

		expect(func).to.throw("Type Mismatch");
	});
});