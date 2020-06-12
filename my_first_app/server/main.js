import { Meteor } from 'meteor/meteor';
import '../imports/api/startup.js';

console.log(Images.find().count());
console.log("I am the server")
