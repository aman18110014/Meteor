import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
// import '../imports/api/startup.js';
import './main.html';
import '../lib/collections.js';


// creating arrays of image data
// var img_data=[
// {
//   img_src:"img_2.jpg",
//   img_alt:"Image 2"
// },
// ]
// Template.pictures.helpers({images:img_data})

// routing
Router.configure({  //mother router
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  this.render('heading',{ //what to render
    to:'main' //where to render
  });
});
Router.route('/images', function () {
  this.render('navbar',{
    to:'navbar'
  });
  this.render('pictures',{
    to:'main'
  });
});
Router.route('/image/:_id', function(){
  this.render('navbar',{
    to:'navbar'
  });
  this.render('image',{
    to:'main',
    data:function(){
      console.log(this.params._id);
      return Images.findOne({_id:this.params._id}); //for this particular route which parameter comes in
    }
  })
});

Session.set("imageLimit",8);

Accounts.ui.config({
  passwordSignupFields: "USERNAME_AND_EMAIL"
})
lastScrollTop = 0;
$(window).scroll(function(event){
  //test if we are near the bottom
  if($(window).scrollTop()+$(window).height() > $(document).height() - 100){
    var scrollTop = $(this).scrollTop();
    if(scrollTop > lastScrollTop){
      Session.set("imageLimit", Session.get("imageLimit")+4);
    }
    lastScrollTop = scrollTop;
  }
})

Template.pictures.helpers({
  
  images:function(){
  // If you call Session.get('currentList') from inside a template, 
  // the template will automatically be rerendered whenever 
  // Session.set('currentList', x) is called
    if(Session.get("userFilter")){  //clicked on createdBy for filtering
      return Images.find({createdBy:Session.get("userFilter")},{sort:{ createdOn:-1, rating:-1}, limit:Session.get("imageLimit")});
    }
    else{
      return Images.find({},{sort:{ createdOn:-1, rating:-1}, limit:Session.get("imageLimit")});
    } 
  },

  filtering_img:function(){
    if(Session.get("userFilter")){
      return true;
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
      return "Anonymous";
    }
  },

  getFilteredUser:function(){
    if(Session.get("userFilter")){
      console.log(Session.get("userFilter")); //Session.get("userFilter") returns the id
      var user = Meteor.users.findOne({_id:Session.get("userFilter")});
      return user.username;
    }
  }
})

Template.heading.helpers({  //We have to put username variable in the heading template
  username:function(){
    if(Meteor.user()){
      return Meteor.user().username;
      // return Meteor.user().emails[0].address;
    }
    else{
      return "Anonymous";
    }
  }
});

var i = 0;
Template.pictures.events({
  'click .js-image':function(event){
    if(i==0){
      $(event.target).css("opacity", "0.1")
      console.log(this._id);
      i = i + 1;
    }
    else{
      $(event.target).css("opacity", "1") //target applies the event listner to the element on ehich it is clicked on
      i = 0;
    }   
  },

// for deleting images from the collection
  'click .js-delete-img':function(event){
    var image_id = this._id;  //grabbing the id of the template
    // console.log(image_id);
    $("#"+image_id).hide('slow', function(){
      Images.remove({"_id":image_id});  //_id is the mongo filter to grab the id
    })
  },

  // for rating images
  'click .js-rating':function(event){
    var rating = $(event.currentTarget).data('userrating'); //currentTarget returns the element when clicked
    var image_id = this.id;
    // console.log(rating);
    console.log(image_id);
    if(rating == 5){
      $("#A"+image_id).css("background","#FFFAFA");
    }
    else {
      $("#A"+image_id).css("background","");
    }
    
    Images.update(  //updating the image attributes
      {_id:image_id}, {$set:{rating:rating}}
    );
  },

  // for filtering images based on createUser
  'click .js-set-image-filter':function(event){
    Session.set("userFilter", this.createdBy);
  },

  'click .js-remove-filter':function(event){
    Session.set("userFilter", undefined); //falsify the session made above
  }
})

// implementing night mode
var j=0;
Template.heading.events({
  'click #js-mode':function(event){
  if(j==0){
    $(".body").css("background", "black");
    $(".body").css("color", "white");
    $(".thumbnail").css("background", "black");
    $(".caption").css("color", "white");
    $(".navbar").css("background", "black");
    j=1;
  }
  else{
    $(".body").css("background", "");
    $(".body").css("color", "");
    $(".thumbnail").css("background", "");
    $(".caption").css("color", "");
    $(".navbar").css("background", "");
    j=0;
  }
  }
})

Template.image_add_form.events({
  'submit .js-add-img':function(event){
    var img_src, img_alt;
    img_src = event.target.img_src_f.value;
    img_alt = event.target.img_alt_f.value;
    // console.log(img_src,img_alt);
    //insert only when user is logged in
    if(Meteor.user()){
      Images.insert({
        img_src:img_src,
        img_alt:img_alt,
        createdOn: new Date(),
        createdBy: Meteor.user()._id  //different id than template
      })
    } 
    return false;
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


