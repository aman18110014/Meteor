import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import '../imports/api/startup.js';
import './main.html';
import { Session } from 'meteor/session';

console.log("I am the client1")

Accounts.ui.config({
  passwordSignupFields: "USERNAME_AND_EMAIL"
});

// Template.images.helpers({image:img_data});
Template.images.helpers({
  image:function(){
    if(Session.get("userFilter")){
      return Images.find({createdBy:Session.get("userFilter")}, {sort: {createdOn:-1, rating:-1}});
    }
    else{
      return Images.find({}, {sort: {createdOn:-1, rating:-1}});
    }
  },
  filtering_images:function(){
    if(Session.get("userFilter")){
      return true;
    }
    else{
      return false;
    }
  },
  getUserName:function(){
    if(Session.get("userFilter")){
      var user = Meteor.users.findOne({_id:Session.get("userFilter")});
      return user.username;
    }
    else{
      return false;
    }
  },
  getUser:function(user_id){
    var user = Meteor.users.findOne({_id:user_id});
    if(user){
      return user.username;
    }
    else{
      return "anonymous";
    }
  }
});  // {}: get hold of all elements
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
  },

  'click .js-set-image-filter':function(event){
    Session.set("userFilter", this.createdBy);
  },

  'click .js-unset-image-filter':function(){
    Session.set("userFilter", undefined);
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
      if (Meteor.user()){
        Images.insert({
          img_src : img_src,
          img_alt : img_alt,
          createdOn : new Date(),
          createdBy : Meteor.user()._id
        });
      }
      
      return false; //To override the default browser behavior(here refreshing)
      
    }
  }
);