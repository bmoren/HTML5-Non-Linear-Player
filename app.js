//init
var gui = new dat.GUI();
// var player = new randomPlayer();

//player object
var randomPlayer = function(){
	//Storage
	this.video1 = $('#video1')
	this.video2 = $('#video2');
	this.v1d
	this.v2d
	this.v1ct
	this.v2ct

	//Settings
	this.changeThresh = 0.25
	this.totalClips = 5;

	setInterval(function(){ //Check to see if its time to switch to the next video

		this.v1d = this.video1.get(0).duration;
		this.v1ct = this.video1.get(0).currentTime;
		this.v2d = this.video2.get(0).duration;
		this.v2ct = this.video2.get(0).currentTime;

		if(this.v1ct >= this.v1d - this.changeThresh){
			toggle(this.video2, this.video1);
		}

		if(this.v2ct >= this.v2d - this.changeThresh){
			toggle(this.video1, this.video2);
		}

	}, 100);


	function toggle(element, pElement){
		//start playing before the clip comes to the front.
		element.get(0).play();

		//eliminate any delay in starting the clip... !need to test with audio.
		setTimeout(function(){
			element.css('z-index', '500');
			pElement.css('z-index', '0');
			var getRand = Math.floor(  Math.random() * this.totalClips +1  );
			pElement.attr({ 'src': 'data/' + getRand + '.mp4' });
			pElement.get(0).pause();
		}, 150)

	}
}