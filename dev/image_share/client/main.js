import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

var img_data = [
  {
  img_src: "myk.png",
  img_alt: "A laptop"
},
{
  img_src: "img_1.jpg",
  img_alt: "Image 1"
},
];
Template.images.helpers({images1:img_data})