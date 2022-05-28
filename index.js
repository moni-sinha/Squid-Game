// variables
var light="red";
var start=1;
var runner=0;
// var repeater=null;
var timeReducer=10000;
var minusTime=0;
var sing=new Audio("Assets/audio.mp3");
var kill=new Audio("Assets/end.mp3");
var win=new Audio("Assets/win.mp3");
var timeleft=35;
var ele=document.getElementById('remaining_time');
var timer;
var lightFunction;
var started=false;
var num;
// start game
// $(document).keypress(function(){
    
// })
// Countdown function
function countDown()
{
    if(!started)return;
    if(timeleft==-1)
    {
        clearTimeout(timer);
        //  clearInterval(repeater);
         $("#player456").stop();
         loseDisplay();
        return;
    }
    else
    {
        if(timeleft<10)
        ele.innerHTML="0"+timeleft;
        else
        ele.innerHTML=timeleft;
        timeleft--;
    };

}

// play audio
function playAudio(){
    sing.play();
}
function pauseAudio(){
    sing.pause();
}
function playKill(){
    kill.play();
}
function pauseKill(){
    kill.pause();
}
function playwin(){
    win.play();
}
//changing light
function Tored(){
    if(!started)return;
    light="red";
    $("#lightCenter").removeClass("green");
    $("#lightCenter").addClass("red");
    $("#killerdoll").removeClass("notLooking");
    $("#killerdoll").addClass("Looking");
    pauseAudio();
    // checkRed();
    setTimeout(checkRed,200);
    setTimeout(Togreen,500);
}
function Togreen(){
    if(!started)return;
    light="green";
    $("#lightCenter").removeClass("red");
    $("#lightCenter").addClass("green");
    $("#killerdoll").removeClass("Looking");
    $("#killerdoll").addClass("notLooking");
    playAudio();
    num=Math.floor(Math.random()*4+1);
    setTimeout(Tored,num*1000)
}
function checkRed()
{
    if(!started)return;
    if(light=="red"&&runner==1)
    {
        $("#player456").stop();
        loseDisplay();
        return;
    }
    else return;
}
function loseDisplay()
{
    if(!started)return;
    $("#first_container").hide();
    var lost = `<div id="box">
    <h1 style="line-height: 35px; background-color: #333;">So sad how you couldn't win a kids' game even though your life depended on it</h1>
    <p style="background-color: #333;">Refresh the page to play again.</p>
</div>`;
$(lost).hide().appendTo('body').fadeIn(2000);
playKill();
started=false;
// clearInterval(timer);
clearTimeout(timer);
};
function winDisplay() {
    if(!started)return;
    $('#first_container').hide();
    var win = `<div id="box">
            <h1 style="line-height: 35px; background-color: #333;">Congratulations, you survived!</h1>
            <p style="background-color: #333;">Refresh the page to play again.</p>
    </div>`;
    $(win).hide().appendTo('body').fadeIn(2000);
    playwin();
    started=false;
    clearInterval(timer);
};
$(document).ready(function(){
    $("#start_button").click(function(){
        if(!started)
    {
        started=true;
        $("#start_game").hide();
        $("#lightCenter").removeClass("red");
        $("#lightCenter").addClass("green");
        light="green";
        playAudio();
        timer=setInterval(countDown,1000);
        num=Math.floor(Math.random()*5+2);
        setTimeout(Tored,num*100);
        $("#moveButton").prop('disabled',false);
        $("#stopButton").prop('disabled',false);
    }
    });
    $("#moveButton").click(function(){
        $("#player456").animate({
            left: 1000}, timeReducer, "linear", winDisplay);
        runner=1;

    });
    $("#stopButton").click(function(){
        $("#player456").stop();
        minusTime = Math.floor($('#player456').position().left);

        timeReducer = ((1100 - minusTime)/1100)*10000;
        runner = 0;
    });
});