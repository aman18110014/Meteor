import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import '../imports/api/startup.js';
import './main.html';


// creating arrays of image data
// var img_data=[
// {
//   img_src:"img_2.jpg",
//   img_alt:"Image 2"
// },
// ]
// Template.pictures.helpers({images:img_data})

Template.pictures.helpers({images:Images.find()})
var i = 0;
Template.pictures.events({
  'click .js-image':function(event){
    if(i==0){
      $(event.target).css("opacity", "0.1")
      console.log(this._id);
      i = i + 1;
    }
    else{
      $(event.target).css("opacity", "1")
      i = 0;
    }
    
  },
// for deleting images from the collection
  'click .js-delete-img':function(event){
    var image_id = this._id;  //grabbing the id of the template
    console.log(image_id);
    $("#"+image_id).hide('slow', function(){
      Images.remove({"_id":image_id});  //_id is the mongo filter to grab the id
    })
  }
})

// Template.pictures.events({
//   'mouseover .js-image':function(event){
//     // console.log(event); this shows event.target gets the selected image
//     $(event.target).css("width", "60px")
//   },
//   'click .js-image':function(event){
//     $(event.target).attr("src","img_3.jpg")
//   }
// })


