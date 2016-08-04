"use strict";
const THREE = require("three")

/*
	ThreeJS Math
	 	Documents: http://threejs.org/docs/#Reference/Math/Math
*/
var TMath = THREE.Math
module.exports.Math = TMath

/*
	ThreeJS Vector2
	 	Documents: http://threejs.org/docs/#Reference/Math/Vector2
*/
var Vector2 = THREE.Vector2
module.exports.Vector2 = Vector2

//
//Constant Constructor
//
Vector2.Zero = function() {
	return new Vector2(0, 0)
}
Vector2.One = function() {
	return new Vector2(1, 1)
}
Vector2.Right = function() {
	return new Vector2(1, 0)
}
Vector2.Up = function() {
	return new Vector2(0, 1)
}
Vector2.Left = function() {
	return new Vector2(-1, 0)
}
Vector2.Down = function() {
	return new Vector2(0, -1)
}

//
//Expand Init Vector From Radian Angle
//
Vector2.prototype.fromAngle = function(radianAngle) {
	this.x = parseFloat(Math.cos(radianAngle).toFixed(6))
	this.y = parseFloat(Math.sin(radianAngle).toFixed(6))
	return this
}