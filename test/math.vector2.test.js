const assert = require('chai').assert;
const expect = require('chai').expect
const JMath = require('../lib/math')
const Vector2 = JMath.Vector2
var MathHelper = JMath.Math

describe('+ JMath.Vector2', function() {
	it('Vector2 constructor', function() {
		var vec1 = new Vector2(0, 0)
		var vec2 = new Vector2()

		//Init From Direction and Length
		var vec3 = (new Vector2(0,5)).setLength(2)
		expect(vec3.toArray()).to.deep.equal([0, 2])

		//From Array
		vec2.fromArray([-1, -100])
		expect(vec2.toArray()).to.deep.equal([-1, -100])

		//Set
		vec1.set(1, 1)
		expect(vec1.toArray()).to.deep.equal([1, 1])

		//Partial Set
		vec1.setX(100)
		vec1.setY(200)
		expect(vec1.toArray()).to.deep.equal([100, 200])

		//Direct Get
		expect(vec1.x).to.equal(100)
		expect(vec1.y).to.equal(200)

		//Index Get
		expect(vec1.getComponent(0)).to.equal(100)
		expect(vec1.getComponent(1)).to.equal(200)
	});

	it('Vector2 properties', function() {
		var a = new Vector2(0, 0)
		var b = new Vector2(0, 1)
		var c = new Vector2(1, 0)

		//Length
		expect(b.length()).to.equal(1)

		//normalize
		var n = new Vector2(5, 0)
		expect(n.normalize().toArray()).to.deep.equal([1, 0])

		//dot
		expect(b.dot(c)).to.equal(0)

		//angle in Radian
		expect(b.angle()).to.be.closeTo(MathHelper.degToRad(90), 0.01);

	});

	it('Vector2 operators', function() {
		var a = new Vector2(0, 0)
		var b = new Vector2(0, 1)
		var c = new Vector2(1, 0)

		//scalar
		expect(b.clone().multiplyScalar(2).toArray()).to.deep.equal([0, 2])

		//add manual
		var tmp = a.clone()
		tmp.add(b)
		tmp.add(c)
		expect(tmp.toArray()).to.deep.equal([1, 1])

		//add multiple
		tmp = a.clone()
		tmp.addVectors(b, c)
		expect(tmp.toArray()).to.deep.equal([1, 1])

		//negate
		tmp = b.clone()
		tmp.negate()
		expect(tmp.toArray()).to.deep.equal([-0, -1])		
	});

	it('Vector2 lerp', function() {
		var a = new Vector2(0, 1)
		var b = new Vector2(1, 0)
		var tmp = new Vector2()

		//lerp To
		expect(tmp.lerp(b, 0.5).toArray()).to.deep.equal([0.5, 0])

		//lerp Between
		expect(tmp.lerpVectors(a, b, 0.5).toArray()).to.deep.equal([0.5, 0.5])
	});

});