// this is image_share.js
import { Mongo } from 'meteor/mongo';
// Images = new Mongo.Collection("images");
Images = new Mongo.Collection("images");
// set up security on Images collection

Images.allow({
	insert:function(userId, doc){
		console.log("testing security on image insert");
		if(Meteor.user()){
			if(userId != doc.createdBy){
				return false;
			}
			else{
				return true;
			}
		}
		return false;
	},
	remove:function(userId, doc){
		console.log("testing security on image delete");
		return true;
	}
})