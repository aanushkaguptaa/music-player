console.log("Welcome to Spotify");

// INTIALISING VARIABLES
let songindex = 0;
let audioelement = new Audio("songintro/0.mp3");
let masterplay = document.getElementById('masterplay');
let viewsongname = document.getElementById('viewsongname');
let progressbar = document.getElementById('progressbar');
let songitems = Array.from(document.getElementsByClassName('songitem'));

// ARRAY LIST OF SONGS  
let songs= [
    {songname: "Strawberry Blonde", filepath: "songintro/0.mp3", coverpath: "images/1.webp"},
    {songname: "Silver and gold", filepath: "songintro/1.mp3", coverpath: "images/2.jfif"},
    {songname: "Coffee Breath", filepath: "songintro/2.mp3", coverpath: "images/3.jfif"},
    {songname: "Jimmy the chameleon", filepath: "songintro/3.mp3", coverpath: "images/4.jfif"},
    {songname: "Ophelia", filepath: "songintro/4.mp3", coverpath: "images/5.jpg"},
    {songname: "4AM", filepath: "songintro/5.mp3", coverpath: "images/6.jfif"},
    {songname: "Coming up roses", filepath: "songintro/6.mp3", coverpath: "images/7.jpg"},
    {songname: "World's Smallest Violin", filepath: "songintro/7.mp3", coverpath: "images/8.jfif"}
]

// GENERATING SONGS
songitems.forEach((element, i)=>{
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songname;
})

// PLAY AND PAUSE BUTTONS
masterplay.addEventListener('click', ()=>{
    if(audioelement.paused || audioelement.currentTime<=0){
        audioelement.play();
        masterplay.classList.remove('fa-play');
        masterplay.classList.add('fa-pause');
    }
    else{
        audioelement.pause();
        masterplay.classList.remove('fa-pause');
        masterplay.classList.add('fa-play');
    }
})

// PROGRESS BAR TIME UPDATE
audioelement.addEventListener('timeupdate', ()=>{
    progress = parseInt((audioelement.currentTime/audioelement.duration)*100);
    progressbar.value = progress;
})
progressbar.addEventListener('change', ()=>{
    audioelement.currentTime = progressbar.value * audioelement.duration/100;
})

const makeallplays = ()=>{
    Array.from(document.getElementsByClassName("songitemplay")).forEach((element)=>{
        element.classList.add("fa-play");
        element.classList.add("fa-pause");
    })
}

// PLAYING THE SONG FROM THE LIST USING THE PLAY BUTTON
Array.from(document.getElementsByClassName("songitemplay")).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeallplays();
        songindex = parseInt(e.target.id);
        viewsongname.innerText= songs[songindex].songname;
        e.target.classList.remove("fa-play");
        e.target.classList.add("fa-pause");
        audioelement.src= `songintro/${songindex+1}.mp3`;
        audioelement.currentTime=0;
        audioelement.play();
        masterplay.classList.remove('fa-play');
        masterplay.classList.add('fa-pause');
    })
})

// PLAY THE NEXT SONG
document.getElementById('next').addEventListener('click', ()=>{
    if(songindex>=7){
        songIndex=0;
    }
    else{
    songindex+=1;
    }
    viewsongname.innerText= songs[songindex].songname;
    audioelement.src= `songintro/${songindex}.mp3`;
    audioelement.currentTime=0;
    audioelement.play();
    masterplay.classList.remove('fa-play');
    masterplay.classList.add('fa-pause');
})

// PLAY THE PREVIOUS SONG
document.getElementById('previous').addEventListener('click', ()=>{
    if(songindex<=0){
        songIndex= 7;
    }
    else{
    songindex-=1;
    }
    viewsongname.innerText= songs[songindex].songname;
    audioelement.src= `songintro/${songindex}.mp3`;
    audioelement.currentTime=0;
    audioelement.play();
    masterplay.classList.remove('fa-play');
    masterplay.classList.add('fa-pause');
})

// REPEAT SONG
