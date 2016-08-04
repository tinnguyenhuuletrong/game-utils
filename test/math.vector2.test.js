const assert = require('chai').assert;
const expect = require('chai').expect
const JMath = require('../lib/math')
const Vector2 = JMath.Vector2
var MathHelper = JMath.Math

describe('+ JMath.Vector2', function() {
	it('Vector2 constructor', function() {
		var vec1 = Vector2.Zero()
		var b = Vector2.Up()
		var vec2 = Vector2.Zero()

		//Constant Constructor
		expect(Vector2.Zero().toArray()).to.deep.equal([0, 0])
		expect(Vector2.Up().toArray()).to.deep.equal([0, 1])
		expect(Vector2.Right().toArray()).to.deep.equal([1, 0])
		expect(Vector2.Left().toArray()).to.deep.equal([-1, 0])
		expect(Vector2.Down().toArray()).to.deep.equal([0, -1])
		expect(Vector2.One().toArray()).to.deep.equal([1, 1])

		//Init From Direction and Length
		var vec3 = (new Vector2(0, 5)).setLength(2)
		expect(vec3.toArray()).to.deep.equal([0, 2])

		//fromAngle to Vector
		expect(b.fromAngle(MathHelper.degToRad(90)).toArray()).to.deep.equal([0, 1])

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
		var a = Vector2.Zero()
		var b = Vector2.Up()
		var c = Vector2.Right()

		//Length
		expect(b.length()).to.equal(1)

		//normalize
		var n = new Vector2(5, 0)
		expect(n.normalize().toArray()).to.deep.equal([1, 0])

		//dot
		expect(b.dot(c)).to.equal(0)

		//angle in Radian
		expect(b.angle()).to.be.closeTo(MathHelper.degToRad(90), 0.01);

		//rotate around in Radian
		var rotateRes = c.rotateAround(a, MathHelper.degToRad(90)).toArray()
		expect(rotateRes[0]).to.closeTo(0, 0.005)
		expect(rotateRes[1]).to.closeTo(1, 0.005)

	});

	it('Vector2 operators', function() {
		var a = Vector2.Zero()
		var b = Vector2.Up()
		var c = Vector2.Right()

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
		var a = Vector2.Up()
		var b = Vector2.Right()
		var tmp = Vector2.Zero()

		//lerp To
		expect(tmp.lerp(b, 0.5).toArray()).to.deep.equal([0.5, 0])

		//lerp Between
		expect(tmp.lerpVectors(a, b, 0.5).toArray()).to.deep.equal([0.5, 0.5])
	});
});