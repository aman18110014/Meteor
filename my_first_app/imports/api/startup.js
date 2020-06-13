import { Mongo } from 'meteor/mongo';
Images = new Mongo.Collection("images");
if(Meteor.isServer){
    Meteor.startup(function(){
        if(Images.find().count()==0){
            for(var i=1; i<23; i++){
                Images.insert(
                    {
                        img_src: "img_"+i+".jpg",
                        img_alt: "Image number "+i,
                      },
                );
            }
            console.log("starrtup.js says: "+Images.find().count());
        }
    });
}