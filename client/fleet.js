var ttsInput, txtPhone, textMsgNum, textMsg, txtFilename, txtContents, txtRead, txtDelete;




$(document).ready(function() {
  // Handler for .ready() called.
  gm.system.init();

  initAutoTestButtons();
});

initAutoTestButtons = function()
{

	

	// Create Expandable regions
	// x$(".group").addClass("closed");
	// x$(".group .title").on("click", function() {
	// 	var el = x$(this.parentNode);
	// 	if (el.hasClass("closed"))
	// 		el.removeClass("closed");
	// 	else
	// 		el.addClass("closed");
	// });
	
	// BUTTON AND INPUT WIDGETS
	

	
	
	// Audio Control
	// var playBtn = new gm.widgets.Button({ callBack: play, label: "Play",
 //        parentElement: document.getElementById('audio-play') });
	// playBtn.render();

	// var pauseBtn = new gm.widgets.Button({ callBack: pause, label: "Pause",
 //        parentElement: document.getElementById('audio-pause') });
	// pauseBtn.render();
	
	// var seekBtn = new gm.widgets.Button({ callBack: seek, label: "Seek to 30 sec",
 //        parentElement: document.getElementById('audio-seek') });
	// seekBtn.render();
	
	// var stopBtn = new gm.widgets.Button({ callBack: stop, label: "Stop",
 //        parentElement: document.getElementById('audio-stop') });
	// stopBtn.render();
	

	// console.log(gm);

//	play();
}


var audioHandle;

var play = function() {
  console.log('PLAY ', Session.get('baseUrl'));
	var mp3Url = Session.get('baseUrl') + '/preview/Fleet/media/Knight%20Rider%20Theme%20Song%20Bass.mp3';
	audioHandle = gm.media.play(mp3Url, 'mixedAudio');
	console.log('clicked', mp3Url);
};

var pause = function(e) {
	gm.media.pause(audioHandle);
};

var stop = function() {
	gm.media.stop(audioHandle);
};

var seek = function() {
	gm.media.seek(audioHandle, 30000);
};
