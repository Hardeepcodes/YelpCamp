var express = require("express"),
    app = express(),
    bodyParser= require("body-parser"),
	mongoose = require("mongoose"),
	Campground = require("./models/campground"),
	seedDb = require("./seeds")

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true, useUnifiedTopology: true});	
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

seedDb();

// Campground.create({

// 		name: "Granite Hill", 
// 		image: "https://www.reserveamerica.com/webphotos/racms/articles/images/fef91bb3-1dff-444d-b0e5-d14db129ce1d_image2_0-main-tent.jpg",
// 		description: "Beautiful Granite Hill"

// 	}, function(err, campground){
// 		if(err){
// 			console.log(err);
// 		} else{
// 			console.log(campground);
// 		}
// 	});

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else{
			res.render("index", {campgrounds: allCampgrounds});
		}
	})
});

app.post("/campgrounds", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = { name: name, image: image, description: desc};

	Campground.create(newCampground, function(err, newly){
		if(err){
			console.log(err);
		} else {
			res.redirect("/campgrounds");
		}
	});
});

app.get("/campgrounds/new", function(req, res){
	res.render("new");
});

app.get("/campgrounds/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			res.render("show", {campground: foundCampground});
		}
	});
});

app.listen(3000, function(){
	console.log("YelpCamp has started!!");
});