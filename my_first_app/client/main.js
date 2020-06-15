import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import '../imports/api/startup.js';
import './main.html';

console.log("I am the client1")

Accounts.ui.config({
  passwordSignupFields: "USERNAME_AND_EMAIL"
});

// Template.images.helpers({image:img_data});
Template.images.helpers({image:Images.find({}, {sort: {createdOn:-1, rating:-1}})});  // {}: get hold of all elements
Template.body.helpers({username:function(){
  if(Meteor.user()){
    return Meteor.user().username;
    // return Meteor.user().emails[0].address;
  }
  else{
  return "Anonymous";
  }
}});  

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
  },

  'click .js-show-image-form':function(event){
    $("#image_add_form").modal('show');
  }
  
});

Template.image_add_form.events(
  {
    'submit .js-add-image':function(event){
      var img_src, img_alt;
      img_src = event.target.img_src.value;
      img_alt = event.target.img_alt.value;
      console.log("src: "+img_src);
      console.log("alt: "+img_alt);
      Images.insert({
        img_src : img_src,
        img_alt : img_alt,
        createdOn : new Date()
      }
      );
      return false; //To override the default browser behavior(here refreshing)
      
    }
  }
);