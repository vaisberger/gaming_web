var comingsoon=document.querySelectorAll(".games_icon div");
var privious;
for(var i=0;i<comingsoon.length;i++){
    comingsoon[i].onclick=function(){
        var classes=this.classList;
        if(classes.contains("show")){
            classes.remove("show")
        }
        else{
            if(privious!=null)
            privious.classList.remove("show")
            privious=this;
            classes.add("show")
        }
    }
}