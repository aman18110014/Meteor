import { Mongo } from 'meteor/mongo';
if(Meteor.isServer){
    Meteor.startup(function(){
        if(Images.find().count()==0){
            Images.insert(
                {
                    img_src: "img_3.jpg",
                    img_alt: "Image 3",
                    label: "First image",
                    desc: "This is my first image"
                  }
            );
        }
    });
}