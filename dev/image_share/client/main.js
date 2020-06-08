import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

var img_data = {
  img_src: "myk.png",
  img_alt: "A laptop"
};
Template.images.helpers(img_data)