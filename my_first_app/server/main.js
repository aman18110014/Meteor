import { Meteor } from 'meteor/meteor';
import '../imports/api/startup.js';
Images = new Mongo.Collection("images");
console.log(Images.find().count());
console.log("I am the server")
