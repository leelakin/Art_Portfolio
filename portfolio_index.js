(function(){
//MODULE
	var app = angular.module("artGallery", []);

//DATA
	var pics = [
		{
			title: "illustration",
			files:[{
					full:"illustration/monster.jpg",
					thumb:"illustration/thumbs/monster.jpg"
				},
				{
					full:"illustration/lion.jpg",
					thumb:"illustration/thumbs/lion.jpg"
				},
				{
					full:"illustration/koyo.png",
					thumb:"illustration/thumbs/koyo.png"
				},
				{
					full:"illustration/alien.jpg",
					thumb:"illustration/thumbs/alien.jpg"
				},
				{
					full:"illustration/pile.jpg",
					thumb:"illustration/thumbs/pile.jpg"
				},
				{
					full:"illustration/winter.jpg",
					thumb:"illustration/thumbs/winter.jpg"
				},
				{
					full:"illustration/sea.jpg",
					thumb:"illustration/thumbs/sea.jpg"
				},
				{
					full:"illustration/seadragon.jpg",
					thumb:"illustration/thumbs/seadragon.jpg"
				},
				{
					full:"illustration/deer.jpg",
					thumb:"illustration/thumbs/deer.jpg"
				},
				{
					full:"illustration/peru.jpg",
					thumb:"illustration/thumbs/peru.jpg"
				},
				{
					full:"illustration/citytheme.jpg",
					thumb:"illustration/thumbs/citytheme.jpg"
				},
				{
					full:"illustration/space.jpg",
					thumb:"illustration/thumbs/space.jpg"
				},
				{
					full:"illustration/bedouin.jpg",
					thumb:"illustration/thumbs/bedouin.jpg"
				},
				{
					full:"illustration/storm.jpg",
					thumb:"illustration/thumbs/storm.jpg"
				},
				{
					full:"illustration/water.jpg",
					thumb:"illustration/thumbs/water.jpg"
				},
				{
					full:"illustration/red.jpg",
					thumb:"illustration/thumbs/red.jpg"
				},
				{
					full:"illustration/hell.jpg",
					thumb:"illustration/thumbs/hell.jpg"
				}]
		},
		{
			title: "cartoon",
			files:[{
					full:"cartoon/spooky.jpg",
					thumb:"cartoon/thumbs/spooky.jpg"
				},
				{
					full:"cartoon/sherlock.jpg",
					thumb:"cartoon/thumbs/sherlock.jpg"
				},
				{
					full:"cartoon/cat.jpg",
					thumb:"cartoon/thumbs/cat.jpg"
				},
				{
					full:"cartoon/pegasus.jpg",
					thumb:"cartoon/thumbs/pegasus.jpg"
				},
				{
					full:"cartoon/alliance.jpg",
					thumb:"cartoon/thumbs/alliance.jpg"
				},
				{
					full:"cartoon/hunt.jpg",
					thumb:"cartoon/thumbs/hunt.jpg"
				},
				{
					full:"cartoon/sieben.jpg",
					thumb:"cartoon/thumbs/sieben.jpg"
				},
				{
					full:"cartoon/cactus.jpg",
					thumb:"cartoon/thumbs/cactus.jpg"
				},
				{
					full:"cartoon/doctor.jpg",
					thumb:"cartoon/thumbs/doctor.jpg"
				},
				{
					full:"cartoon/eyes.jpg",
					thumb:"cartoon/thumbs/eyes.jpg"
				}]
		},
		{
			title: "realism",
			files:[{
					full:"realism/wolf.jpg",
					thumb:"realism/thumbs/wolf.jpg"
				},
				{
					full:"realism/potc.gif",
					thumb:"realism/thumbs/potc.gif"
				},
				{
					full:"realism/hand.jpg",
					thumb:"realism/thumbs/hand.jpg"
				},
				{
					full:"realism/sculder.jpg",
					thumb:"realism/thumbs/sculder.jpg"
				},
				{
					full:"realism/wolf2.jpg",
					thumb:"realism/thumbs/wolf2.jpg"
				},
				{
					full:"realism/jake.jpg",
					thumb:"realism/thumbs/jake.jpg"
				}]
		},
	];

//CONTROLLER
	app.controller("ImageController", function(){
		this.imgs = pics;
		this.pos = 0;
		this.imgsConcat = [];
		this.mobilePos = 0;
		//this.activeCat = "illustration";
		this.showImg = function(imgpicked){
			$("#display").html("<img src=\""+ imgpicked +"\" class=\"fullimg\">");
			//full img in display --> ng-click launch this w/ picked img
		};
		this.imgsScroll = function(direction,category){
			//SHOULD ONLY APPLY TO OPEN CATEGORY (& reset for every new one)
			
			if(direction === "x"){
				//new category clicked; reset CSS margins of all & this.pos = 0
				//this might be the cause of the 'double click error'
				this.pos = 0;
				$(".images").css("margin-top", this.pos+"px");
			}
			/*check length of category img array first*/
			for(var i=0; i<this.imgs.length; i++){
				if(this.imgs[i].title === category){
					var imgArrayLength = this.imgs[i].files.length;
				}
			};
			if(direction==="up" && this.pos > 0){ 
				//-> .images{margin-top: plus 110px}
				this.pos -= 110;
				$(".images").css("margin-top", "-"+this.pos+"px");
			}else if(direction==="down" && this.pos < (imgArrayLength*110)-330){
				/*330px (3 images) should still be visible!*/
				//-> .images{margin-top: minus 110px}
				this.pos += 110;
				$(".images").css("margin-top", "-"+this.pos+"px");
			};
			console.log("position is now "+ this.pos)
			//if either end of the img band is reached, nothing happens
		};
		this.toggleShow = function(category, $event){
			//when category icon clicked, ONLY those contents show
			var $catbutton = $(event.target);
			var $imgbox = $catbutton.closest("#wrappernav").find(".imgbox");
			if($imgbox.hasClass("open")){//close it
				$imgbox.slideUp(600);
				$imgbox.removeClass("open");
			}else{//open it (but before close all others)
				$(".open").slideUp(600);
				//HERE ALL .IMGBOX HAVE TO BE BACK TO POS 0
				this.imgsScroll("x", category)
				$imgbox.slideDown(600);
				$imgbox.addClass("open");
			}
		};
		this.mobileHandler = function(){
			//merge all 3 image (full) galleries into this.imgsConcat
			for(var i=0, lengthz=this.imgs.length; i<lengthz; i++){ //loop through category objects array
				for(var j=0, length2=this.imgs[i].files.length; j<length2 ;j++){ //for each category, loop through files array
					this.imgsConcat.push(this.imgs[i].files[j].full);
				}
			}
			//& display first img, show side arrows
			var firstimg = this.imgsConcat[0];
			$("#display").css("padding","0px");
			$(".arrowmobile").css("display", "block");
			$("#display").html("<img src=\""+ firstimg +"\" class=\"fullimg\">");
			
		};
		this.mobileTurner = function(direction){//arrow back/forth go through this.imgsConcat
			var images = this.imgsConcat;
			if(direction==="right" && this.mobilePos<images.length-1){
				this.mobilePos+=1;
				if(this.mobilePos===32){
					$(".arrowmobile.right").hide();
				}else if(this.mobilePos===1){
					$(".arrowmobile.left").show();
				}
			}else if(direction==="left" && this.mobilePos>0){
				this.mobilePos-=1;
				if(this.mobilePos===31){
					$(".arrowmobile.right").show();
				}else if(this.mobilePos===0){
					$(".arrowmobile.left").hide();
				}
			}
			console.log(this.mobilePos);
			var disimg = images[this.mobilePos];
			$("#display").html("<img src=\""+ disimg +"\" class=\"fullimg\">");
		};
	});
})();