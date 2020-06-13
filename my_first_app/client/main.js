import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import '../imports/api/startup.js';
import './main.html';

console.log("I am the client1")

// Template.images.helpers({image:img_data});
Template.images.helpers({image:Images.find({}, {sort: {rating:-1}})});  // {}: get hold of all elements

Template.images.events(
{
  'click .js-image': function(event){
    $(event.target).css("width", "50px");
  },
  
  'click .js-del-image': function(event){
    var image_id = this._id;
    console.log(image_id);
    $("#"+image_id).hide("slow",function(){
      Images.remove({"_id":image_id});
    })
    },

    'click .js-rate-image': function(event){
      var rating = $(event.currentTarget).data("userrating");
      console.log(rating);
      var image_id = this.id;
      console.log(image_id);
      Images.update({"_id":image_id}, {$set: {rating:rating}});
    }
  
});