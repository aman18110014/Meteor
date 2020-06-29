Images = new Mongo.Collection("pictures");
console.log(Images.find().count());

// Implementing security to allow the access 
Images.allow({
    insert:function(userId, doc){
        console.log("Testing security of Image.insert()");
        if(Meteor.user()){
            //force the user that it is using the correct username for insertion
            if(doc.createdBy !=  userId){
                return false;
            }
            else{ return  true;}
        }
        return false;
    },
    remove:function(userId, doc){
        console.log("Testing security of Image.remove()");
        if(Meteor.user()){
            if(doc.createdBy !=  userId){
                return false;
            }
            else{ return  true;}
        }
        return false;
    }
})