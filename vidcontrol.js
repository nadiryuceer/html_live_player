
var player, playpause, seekslider,curtime,durtime,mutebtn, reqfullscreen, isfs=false, pbrsw, pbr, screenshot;

function initPlayer(){
	//getting variables present on index.html
	playpause = document.getElementById('ppbutton');
	seekslider= document.getElementById('seekslider');
	curtime= document.getElementById('curtime');
	durtime= document.getElementById('durtime');
	mutebtn=document.getElementById('mutebtn');
	reqfullscreen= document.getElementById('fullscreenbtn');
	pbr = document.getElementById('pbrate');
	pbrsw= document.getElementById('pbrsw');
	screenshot = document.getElementById('screenshot');
	//Initialization of video player
        var url = "video/out.mpd";
        player = dashjs.MediaPlayer().create();
        player.initialize(document.querySelector("#videoPlayer"), url, true);

	//Triggers
	playpause.addEventListener("click", Playpause,false);
	seekslider.addEventListener("change", Seeker ,false);
	mutebtn.addEventListener("click", MuteUnmute, false);
	reqfullscreen.addEventListener("click", Reqfullscreen, false);
	pbrsw.addEventListener("click", ChangePBR, false);
	screenshot.addEventListener("click", TakeSS, false);
	player.getVideoElement().addEventListener("timeupdate", Dynamicseek, false);
	player.getVideoElement().addEventListener("click", Playpause, false);
	player.getVideoElement().addEventListener("double-click", Reqfullscreen, false);
	player.seek(0); 
}

function Playpause(){
	if(player.isPaused()){
	  player.play();
	  playpause.style.background = "url(pause.png)";
	}else{
	  player.pause();
	  playpause.style.background = "url(play.png)";
}
}

function Seeker(){
	player.seek(player.duration()*(seekslider.value/100));
}
function Dynamicseek(){
	if(!player.isSeeking())
	seekslider.value=player.time() * (100/player.duration());
	var curmins = Math.floor(player.time() / 60);
	var cursecs = Math.floor(player.time() % 60);
	var durmins = Math.floor(player.duration() / 60);
	var dursecs = Math.floor(player.duration() % 60);
	if(cursecs<10) cursecs = "0" + cursecs;
	if(dursecs<10) dursecs = "0" + dursecs;
	curtime.innerHTML = curmins + ":" + cursecs;
	durtime.innerHTML = durmins + ":" + dursecs;
}

function MuteUnmute(){
	if(player.isMuted()){
	  player.setMute(false);
	  mutebtn.innerHTML = "Mute";
	}else{
	  player.setMute(true);
	  mutebtn.innerHTML = "Unmute";
}
}
function Reqfullscreen(){
	var vid = player.getVideoElement();
	if(!isfs){
	if (vid.requestFullScreen)vid.requestFullScreen();
        else if (vid.mozRequestFullScreen)vid.mozRequestFullScreen();
        else if (vid.webkitRequestFullScreen)vid.webkitRequestFullScreen();
	}
	else{
	if (vid.exitFullScreen)vid.exitFullScreen();
        else if (vid.mozexitFullScreen)vid.mozexitFullScreen();
        else if (vid.webkitexitFullScreen)vid.webkitexitFullScreen();
}
}
function ChangePBR(){
	if(player.getPlaybackRate() == 2.0) player.setPlaybackRate(0.5);
	else player.setPlaybackRate(player.getPlaybackRate() + 0.5);
	pbr.innerHTML = player.getPlaybackRate() + "x";
}

function TakeSS(){
	var canvas = document.createElement('canvas');
	canvas.width = player.getVideoElement().videoWidth;
	canvas.height = player.getVideoElement().videoHeight;
	var ctx = canvas.getContext('2d');
	ctx.drawImage(player.getVideoElement(),0,0);
	var a =document.createElement('a');
	a.href=canvas.toDataURL('image/jpeg');
	a.download="ss.jpg";
	a.click();
}
//Automatic initialization after html page load
window.onload=initPlayer;

