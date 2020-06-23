import { Meteor } from 'meteor/meteor';
import '../imports/api/startup.js';
import '../imports/api/collections.js'
console.log(Images.find().count());
console.log("I am the server")

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