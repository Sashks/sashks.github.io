let mobilenet;
let video;
let label = '';
let temp;
let counter = 0;
let isChecked = false;
let isChecked2 = false;

function modelReady() {
  console.log('Model READY!');
  mobilenet.predict(gotResults);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
  } else {
    label = results[0].className;
    mobilenet.predict(gotResults);

  }
}

function detectMob() {
   if (/Mobi|Android/i.test(navigator.userAgent)) {
     return true;
   } else {
     return false;
   }
}
	
function setup() {
	if(detectMob()){
		createCanvas(windowWidth, windowHeight);  
		video = createCapture({
			video: {
				facingMode: {
					exact: "environment"
				}
			}
		});
	} else {
		createCanvas(640, 525);  
		video = createCapture(VIDEO);
	}
	video.hide();
	background(0);
	mobilenet = ml5.imageClassifier('MobileNet', video, modelReady);
}
	
function draw() {
	isChecked ? background('#97ba75') : background('#ccc');
	image(video, 0, 0);
	fill(255);
	textSize(32);   		
	isChecked = document.getElementById("myCheckBox").checked;
	
	if(isChecked){
		console.log("Text To Speech is Enabled!");
		if(temp != label) {
			var speech = new SpeechSynthesisUtterance(label);
			speech.rate = 3;
			speechSynthesis.speak(speech); 
			console.log("speach ready");
		}
	} else {
		console.log("Text To Speech is Disabled!");
	}
	temp = label;
	text(label, 20 , height - 10);
}




