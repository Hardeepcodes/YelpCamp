var express = require("express");
var app = express();
var bodyParser= require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");

var campgrounds = [
	{name: "Salmon Creek", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"},
	{name: "Granite Hill", image: "https://www.reserveamerica.com/webphotos/racms/articles/images/fef91bb3-1dff-444d-b0e5-d14db129ce1d_image2_0-main-tent.jpg"},
	{name: "Mountain Goat's Rest", image: "https://i1.wp.com/theovercast.ca/wp-content/uploads/2017/05/camping.jpg?fit=1000%2C500&ssl=1"}
]

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
	res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/campgrounds/new", function(req, res){
	res.render("new");
})

app.post("/campgrounds", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = { name: name, image: image};

	campgrounds.push(newCampground);

	res.redirect("/campgrounds");
})

app.listen(3000, function(){
	console.log("YelpCamp has started!!");
});