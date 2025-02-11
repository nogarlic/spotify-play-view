
var currentPlayedSong = document.getElementById("myAudio"); 
let isPlaying = false;

const btnPlayPause = document.querySelector(".playpause-track");


function playpauseTrack(){
    // isPlaying ? console.log('Yeah') : console.log('No');
    isPlaying ? pauseAudio() : playAudio();
}

function playAudio() { 
    // console.log('Playing');
    currentPlayedSong.play(); 
    isPlaying = true;
    let playpauseTrack = document.querySelector(".playpause-track");
    playpauseTrack.innerHTML = '<i class="fa fa-pause-circle fa-4x"></i>';
} 

function pauseAudio() { 
    // console.log('Pausing');
    currentPlayedSong.pause(); 
    isPlaying = false;
    let playpauseTrack = document.querySelector(".playpause-track");
    playpauseTrack.innerHTML = '<i class="fa fa-play-circle fa-4x"></i>';
}

const btnSeek = document.querySelector(".seek_slider");
const btnNext = document.querySelector(".next-track");
const btnPrev = document.querySelector(".prev-track");

btnPlayPause.addEventListener('click', playpauseTrack);
btnNext.addEventListener('click', nextTrack);
btnPrev.addEventListener('click', prevTrack);
// btnPlayPause.addEventListener('click', playpauseTrack);
btnSeek.addEventListener('change', seekTo);
var au = document.getElementById("myAudio");

au.onloadedmetadata = function() {
    let total_duration = document.querySelector('.total-duration');
    let durationMinutes = Math.floor(au.duration / 60);
    let durationSeconds = Math.floor(au.duration - durationMinutes * 60);
    if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    // if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
};
let total_duration = document.querySelector('.total-duration');
let durationMinutes = Math.floor(au.duration / 60);
let durationSeconds = Math.floor(au.duration - durationMinutes * 60);
if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
total_duration.textContent = durationMinutes + ":" + durationSeconds;

let updateTimer;
clearInterval(updateTimer);
let current_time = document.querySelector('.current-time');
updateTimer = setInterval(setUpdate, 1000);
let seek_slider = document.querySelector('.seek_slider');

function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(au.duration)) {
        seekPosition = au.currentTime * (100 / au.duration);
        seek_slider.value = seekPosition;
        
        let currentMinutes = Math.floor(au.currentTime / 60);
        let currentSeconds = Math.floor(au.currentTime - currentMinutes * 60);
        
        if(currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        
        current_time.textContent = currentMinutes + ":" + currentSeconds;
    } else console.log(au.duration);
};

function seekTo(){
    let seekto = au.duration * (seek_slider.value / 100);
    au.currentTime = seekto;
}

let currentPlayingTitle = document.querySelector('#song-title');
let currentPlayingSinger = document.querySelector('#singer');
// let currentPlayingVideo = document.querySelector("#myVideoSource");
// let currentPlayingSong = document.querySelector("#myAudioSource")

let data = {};

fetch("./playlist.json")
    .then(response => response.json())
    .then(json => {
        data = json;
        console.log("Playlist loaded:", data);
    })
    .catch(error => console.error("Error loading playlist:", error));
let songnum = 0;

function nextTrack(){
    if (songnum < data.playlist.length-1) {
        songnum = songnum + 1;
        console.log(songnum);
        currentPlayingTitle.textContent = data.playlist[songnum].song;
        currentPlayingSinger.textContent = data.playlist[songnum].singer;
        document.querySelector('video').src = data.playlist[songnum].video;
        document.querySelector('audio').src = data.playlist[songnum].audio;
        playAudio();

        let lyrics = document.querySelector(".lyrics-detail");
        lyrics.innerHTML = data.playlist[songnum].lyrics;
    }
}

function prevTrack(){
    if (songnum > 0) {
        songnum = songnum - 1;
        console.log(songnum);
        currentPlayingTitle.textContent = data.playlist[songnum].song;
        currentPlayingSinger.textContent = data.playlist[songnum].singer;
        document.querySelector('video').src = data.playlist[songnum].video;
        document.querySelector('audio').src = data.playlist[songnum].audio;
        playAudio();

        let lyrics = document.querySelector(".lyrics-detail");
        lyrics.innerHTML = data.playlist[songnum].lyrics;
    }
}
