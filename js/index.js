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
        default_d;
    default_d = 10;
    if(window.getComputedStyle){
        distance = window.getComputedStyle(slide,null).width;
    }
    else{
        distance = slide.currentStyle.width;
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
        }
        else{
            startX = touch_event.clientX;
        }

    });
    con_stu.addEventListener(move,function(e){
        e = e||window.event;
        var touch_event = e.touches[0];
        if(touch_event.pageX){
            endX = touch_event.pageX;
        }
        else{
            endX = touch_event.clientX;
        }

        resultX = endX-startX;
        if(resultX > default_d){
            trans_team();
            resultX = 0;
            document.onclick = null;
            endX = startX;
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
        }
        else{
            startX = touch_event.clientX;
        }
    });
    con_team.addEventListener(move,function(e){
        e = e||window.event;
        var touch_event = e.touches[0];
        if(touch_event.pageX){
            endX = touch_event.pageX;
        }
        else{
            endX = touch_event.clientX;
        }
        resultX = startX - endX;
        if(resultX > default_d){
            trans_stu();
            resultX = 0;
            document.onclick = null;
            endX = startX;
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