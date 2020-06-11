import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

console.log("I am the client")

var img_data = [
    {
    img_src: "img_3.jpg",
    img_alt: "Image 3",
    label: "First image",
    desc: "This is my first image"
  },
  {
    img_src: "img_4.jpg",
    img_alt: "Image 4",
    label: "Second image",
    desc: "This is my second image"
  },
  {
    img_src: "img_5.jpg",
    img_alt: "Image 5",
    label: "Third image",
    desc: "This is my third image"
  },
];

Template.images.helpers({image:img_data});
Template.images.events(
{
  'click .js-image': function(event){
    $(event.target).css("width", "50px");
  }
}
);