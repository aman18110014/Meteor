Images = new Mongo.Collection("pictures");
console.log("startup.js says  "+Images.find().count());  