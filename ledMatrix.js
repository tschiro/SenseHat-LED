var express = require('express');				
var sensehat = require('node-sense-hat');
var senseLed = sensehat.Leds;

ledColor = {"red":[255,0,0],"green":[0,255,0],"blue":[0,0,255], "yellow":[255,255,0],"purple":[255,0,255],"aqua":[0,255,255]};

app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('view engine', 'ejs');

app.get('/', function(req,res) {
		if(req.query.x == undefined){	//first time through app.get, and when clear button pressed, req.query.x is undefined, so clear the senseLed
			senseLed.clear();			
		}
		else {								//x, y, and theColor are sent with the fetch call from ledMatrix.ejs (html file). Sent as string values.
			var x = parseInt(req.query.x); 
			var y = parseInt(req.query.y);
			var selectedColor = req.query.theColor;
			
			currentPixelColor = senseLed.sync.getPixel(x,y); //get the rgb value at pixel x,y. Returns an object.
			pixelColor = (JSON.stringify(currentPixelColor) == "[0,0,0]") ? ledColor[selectedColor]:[0,0,0]; //convert currentPixelColor to a string
				// and compare to [0,0,0] off). If so, use selectedColor to get the corresponding rgb values from ledColor array to define pixelColor.
			
			senseLed.setPixel(x,y,pixelColor);					
		}
		res.render('ledMatrix');						
});

//app.post('/led/clear', function(req,res){

//	senseLed.clear();
//	res.render('ledMatrix');	
//});

app.listen(3000, function() {
		
});



