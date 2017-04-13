var pGetRand;
var getRand;

//Settings
var settings = {
	changeThresh : 0.1,
	totalClips  : 5,
	pathToClips : "data/",
	pbRate : 1,
	mode : 'non-repeating-rand',

}

//init //press 'h' to hide the gui
var gui = new dat.GUI();
// gui.add(settings, 'changeThresh').name("Cut Thresh (sec)");
gui.add(settings, 'totalClips').name("Total # of clips");
gui.add(settings, 'mode', [ 'random', 'non-repeating-rand', 'linear' ] ).name("Playback Mode");
gui.add(settings, 'pathToClips').name("Clips Folder");
// gui.add(settings, 'pbRate', 0,3).name("Playback Speed").step(0.25);

//Storage
var video1 = $('#video1');
var video2 = $('#video2');
var v1d,v2d,v1ct,v2ct;
var linearTracker = 1;
var gate1 = true;
var gate2 = false;

setInterval(function(){ //Check to see if its time to switch to the next video

	video1.get(0).playbackRate = settings.pbRate;
	video2.get(0).playbackRate = settings.pbRate;

	v1d = video1.get(0).duration;
	v1ct = video1.get(0).currentTime;
	v2d = video2.get(0).duration;
	v2ct = video2.get(0).currentTime;

	if(v1ct >= v1d - settings.changeThresh){
		if(gate1){
			toggle(video2, video1);
			gate1 = false;
			gate2 = true;
		}
	}

	if(v2ct >= v2d - settings.changeThresh){
		if(gate2){
		toggle(video1, video2);
		gate2 = false;
		gate1 = true;
		}
	}
	// console.log(v1d, v1ct);
}, 100); //keep this a bit slower so it dosent trigger multiple times


function toggle(element, pElement){
	//start playing before the clip comes to the front.
	element.get(0).play();

	//eliminate any delay in starting the clip... !need to test with audio.
	setTimeout(function(){
		element.css('z-index', '500');
		pElement.css('z-index', '0');
		if(settings.mode == 'random'){
			getRand = Math.floor(  Math.random() * settings.totalClips +1  )
		}

		if(settings.mode == 'linear'){
			if(linearTracker >= settings.totalClips){
				linearTracker = 1;
			}else{
				linearTracker ++
			}

			getRand = linearTracker
			console.log(linearTracker);
		}

		if(settings.mode == 'non-repeating-rand'){
			getRand = Math.floor(  Math.random() * settings.totalClips +1  )
			while(getRand == pGetRand){ //are we the same, if so try again until we are not.
				console.log("try again",getRand,pGetRand);
				getRand = Math.floor(  Math.random() * settings.totalClips +1  )
			}
			pGetRand = getRand
		}

		pElement.attr({ 'src': settings.pathToClips + getRand + '.mp4' });
		pElement.get(0).pause();
	}, 150)

	//always keep the gui at the front :)
	$('.dg').css('z-index', '9999');

}
