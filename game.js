var buttonClr= ["red" , "blue","green","yellow"];
var gamepattern = [];
var userpattern = [];

var started = false;
var level = 0;




$(document).keypress(function(event)
{
	if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
         started = true;
  }  
});


$(".btn").click(function()
    {  
    var userchosencolor =  $(this).attr('id');
    userpattern.push(userchosencolor);

    playing(userchosencolor);

    $("#"+userchosencolor).addClass("pressed");
    setTimeout(function() {
    $("#"+userchosencolor).removeClass('pressed');
    }, 100);

    checkanswer(userpattern.length-1);
});




function checkanswer(currentlevel)
{
	if(gamepattern[currentlevel]===userpattern[currentlevel])
	{  
         if (userpattern.length === gamepattern.length)
         {  

	
		setTimeout(function() {
        nextSequence();}, 1000);
		}
	}

	else
	{   playing("wrong");
        

      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

       userpattern = [];
       gamepattern = [];
       level = 0;
       started = false;


	}
}


function nextSequence() {
    userpattern = [];
    level++;
    $("#level-title").text("Level "+level);
    var random = Math.random()*4;
    random = Math.floor(random);

    var randomColor = buttonClr[random];
    gamepattern.push(randomColor);
    playing(randomColor);
    $("#"+randomColor).fadeTo(100, 0.3, function(){$(this).fadeTo(500, 1.0);});


}






function playing(name)
{
    new Audio("sounds/"+name+".mp3").play();
}