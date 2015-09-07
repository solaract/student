/**
 * Created by zxy on 2015/8/15.
 */
(function(){
    var li_team = document.getElementsByClassName('li_team')[0];
    var li_stu = document.getElementsByClassName('li_stu')[0];
    var slide = document.getElementsByClassName('nav_slide')[0];
    var con_team = document.getElementsByClassName('team')[0];
    var con_stu = document.getElementsByClassName('stu')[0];
    var distance,
        touch,
        start,
        move,
        end,
        startX,
        endX,
        resultX,
        startY,
        endY,
        resultY,
        default_d,
        default_Y,
        trans = true;
    default_d = 12;
    default_Y = 30;
    
    window.onload = function(){
    	if(window.getComputedStyle){
	        distance = window.getComputedStyle(slide,null).width;
	    }
	    else{
	        distance = slide.currentStyle.width;
	    }
    	if(window.location.hash === "#info"){
    		li_stu.style.color = '#26b0eb';
	        li_team.style.color = '#8bcef2';
	        slide.style.marginLeft = distance;
	        con_team.style.opacity = 0.3;
	        con_stu.style.opacity = 1;
	        con_team.style.display = 'none';
            con_stu.style.display = 'block';
            window.location.hash = '';
    	}
    }
    var cancel = function cancel(e){
        var event = e||window.event;
        if(event.preventDefault){
            event.preventDefault();
        }
        if(event.returnValue){
            event.returnValue = false;
        }
        return false;
    };
    var trans_team = function trans_team(){
        li_team.style.color = '#26b0eb';
        li_stu.style.color = '#8bcef2';
        slide.style.marginLeft = '0px';
        con_stu.style.opacity = 0.3;
        setTimeout(function(){
            con_team.style.display = 'block';
            con_stu.style.display = 'none';
            setTimeout(function(){
                con_team.style.opacity = 1;
            },100);
        },300);
    };
    var trans_stu = function trans_stu(){

        li_stu.style.color = '#26b0eb';
        li_team.style.color = '#8bcef2';
        slide.style.marginLeft = distance;
        con_team.style.opacity = 0.3;
        setTimeout(function(){
            con_team.style.display = 'none';
            con_stu.style.display = 'block';
            setTimeout(function(){
                con_stu.style.opacity = 1;
            },100);

        },300);
    };
    if (window.navigator.msPointerEnabled) {
        /*Events for IE only*/
        touch = "MSPointerOver";
        move = "MSPointerMove";
        end = "MSPointerUp";
        start = "MSPointerDown"
    }
    else{
        touch = "touchstart";
        move = "touchmove";
        end = "touchend";
        start = "touchstart";
    }

    li_team.addEventListener(touch, function () {
        /*Add mouse over event for touch*/
        document.onclick  = function(e){
              cancel(e);
        };
        trans_team();
    });
    li_stu.addEventListener(touch,function(){
        document.onclick  = function(e){
            cancel(e);
        };
        trans_stu();
    });
    con_stu.addEventListener(start,function(e){
        document.onclick  = function(e){
            cancel(e);
        };
        e = e||window.event;
        var touch_event = e.touches[0];
        if(touch_event.pageX){
            startX = touch_event.pageX;
            startY = touch_event.pageY;
        }
        else{
            startX = touch_event.clientX;
            startY = touch_event.clientY;
        }
        trans = true;
    });
    con_stu.addEventListener(move,function(e){
        e = e||window.event;
        var touch_event = e.touches[0];
        if(touch_event.pageX){
            endX = touch_event.pageX;
            endY = touch_event.pageY;
        }
        else{
            endX = touch_event.clientX;
            endY = touch_event.clientY;
        }

        resultX = endX-startX;
        resultY = Math.abs(endY-startY);
        if(resultY > default_Y){
        	trans = false;
        }
        if(resultX > default_d&&trans){
            trans_team();
            resultX = 0;
            resultY = 0;
            document.onclick = null;
            endX = startX;
            endY = startY;
        }
    });
    con_stu.addEventListener(end,function(){
//        if(resultX > default_d){
//            trans_team();
//            resultX = 0;
//        }
        document.onclick = null;
    });
    con_team.addEventListener(start,function(e){
        document.onclick  = function(e){
            cancel(e);
        };
        e = e||window.event;
        var touch_event = e.touches[0];
        if(touch_event.pageX){
            startX = touch_event.pageX;
            startY = touch_event.pageY;
        }
        else{
            startX = touch_event.clientX;
            startY = touch_event.clientY;
        }
        trans = true;
    });
    con_team.addEventListener(move,function(e){
        e = e||window.event;
        var touch_event = e.touches[0];
        if(touch_event.pageX){
            endX = touch_event.pageX;
            endY = touch_event.pageY;
        }
        else{
            endX = touch_event.clientX;
            endY = touch_event.clientY;
        }
        resultX = startX - endX;
        resultY = Math.abs(startY - endY);
        if(resultY > default_Y){
        	trans = false;
        }
        if(resultX > default_d&&trans){

            trans_stu();
            resultX = 0;
            resultY = 0;
            document.onclick = null;
            endX = startX;
            endY = startY;
        }

    });
    con_team.addEventListener(end,function(){
//        if(resultX > default_d){
//            trans_stu();
//            resultX = 0;
//        }
        document.onclick = null;
    });
})();