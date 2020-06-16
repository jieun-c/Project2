$(document).ready(function(){
    var slide = $(".slide_item");
    var current = 0;
    
    console.log(slide);
    
    //초기화
    slide.eq(current).css("left","0");
    slide.eq(current).find(".textBox").stop().animate({top:"40%", opacity:"1"},1000);

    //자동 슬라이드
    setInterval(function(){
        var prev = slide.eq(current);
        slideShow(prev, 0, "-100%");

        current++;

        if(current >= slide.length){
            
            current = 0;

            slide.eq(0).find(".textBox").css({top:"30%", opacity:"0"});
            slide.eq(1).find(".textBox").css({top:"30%", opacity:"0"});
            slide.eq(2).find(".textBox").css({top:"30%", opacity:"0"});
            slide.eq(3).find(".textBox").animate({top:"30%", opacity:"0"});
        }

        var next = slide.eq(current);
        slideShow(next, "100%", 0);


    },4000);

    function slideShow(tg, start, end){
        tg.css("left",start).stop().animate({left:end},1000);
        tg.find(".textBox").stop().delay(1000).animate({top:"40%", opacity:"1"},1000);
    }
    
            ////////////////////////////////////////////////////////////main 2 
    var acmBtn = $("#accommodation > #acmBtn > li"),
        acmImg1 = $("#accommodation > #acmImg1"),
        acmImg2 = $("#accommodation > #acmImg2");
    
    var btnIndex = 0;
    
        //img1Width = acmImg1.width() + 30 + "px",
        //img2Width = acmImg2.width() + "px";

    
    acmBtn.click(function(){
        var tg = acmBtn.index(this);
        btnIndex = tg;
        
        acmBtn.removeClass("on");
        $(this).addClass("on");
        
        acmSlide("-100%", "30px", 0);
        
    });
    
    function acmSlide(hidden, leftShow, rightShow){
        txtChange();
        
        acmImg1.stop().animate({left: hidden}, 500, function(){
            imgChange();
            acmImg1.stop().animate({left: leftShow},500);
        });
        
        acmImg2.stop().animate({right: hidden}, 500, function(){
            acmImg2.stop().animate({right: rightShow}, 500);
        });
    }
    
    //텍스트 변경
    function txtChange(){
        switch(btnIndex){
            case 0: 
                $("#acmBox2 > p").text("Deluxe");
                break;
            case 1: 
                $("#acmBox2 > p").text("DeluxeMountain");
                break;
            case 2: 
                $("#acmBox2 > p").text("Executive");
                break;
            case 3: 
                $("#acmBox2 > p").text("ExecutiveMountain");
                break;
            case 4: 
                $("#acmBox2 > p").text("Suite");
                break;
            default: 
                break;
        }
    }
    
    //이미지 변경        
    function imgChange(){
        switch(btnIndex){
            case 0: 
                acmImg1.attr("src","../img/2/deluxe1.jpg");
                acmImg2.attr("src","../img/2/deluxe2.jpg");
                break;
            case 1: 
                acmImg1.delay(1000).attr("src","../img/2/deluxeMountain1.jpg");
                acmImg2.delay(1000).attr("src","../img/2/deluxeMountain3.jpg");
                break;
            case 2: 
                acmImg1.attr("src","../img/2/executive1.jpg");
                acmImg2.attr("src","../img/2/executive3.jpg");
                break;
            case 3: 
                acmImg1.attr("src","../img/2/executiveMountain1.jpg");
                acmImg2.attr("src","../img/2/executiveMountain2.jpg");
                break;
            case 4: 
                acmImg1.attr("src","../img/2/suite4.jpg");
                acmImg2.attr("src","../img/2/suite7.jpg");
                break;
            default: 
                break;
        }
    }
    
    
    //main2 화면 탑이 현재 활성화되어있는 창의 반보다 작아지면  
    //헤더 애니메이션 효과
    
    var main = $("#main2").height();
    
    $(window).scroll(function(){
        var w = $(window).outerHeight()/2;
        console.log(w);
        console.log(main);
    });
    
        ///////////////////////////////////////////////////////////////////////main3 
    var swiper = new Swiper('.swiper-container', {
        speed : 1000,
        centeredSlides: true,
        grabCursor: true,
        slidesPerView: 'auto',
        loop:true,
        slideToClickedSlide: true,
        //spaceBetween: 100,
    });
    
    var prmBtn = $("#prmBtn > li");
    
    //버튼 --> 슬라이드 제어
    prmBtn.click(function(){
        var btn = $(this).index();
        
        var din = $(".dining").index();
        var acc = $(".accommodation").index();
        var etc = $(".etc").index();
        
        prmBtn.removeClass("on");
        $(this).addClass("on");
        
        switch(btn){
            case 0:
                swiper.slideToLoop(din, 1000, false);
                break;
            case 1:
                swiper.slideToLoop(acc, 1000, false);
                break;
            case 2:
                swiper.slideToLoop(etc, 1000, false);
                break;
            default:
                break;
        }
        
        
    });
    
    //슬라이드 --> 버튼 제어 (클릭) ::: 이미지는 넘어가는데 버튼 색상이 바뀌지 않는 일부 버그 해결 필요(액티브)
    $(".swiper-slide").click(function(){
        
        if($(this).hasClass("swiper-slide-active") || $(this).hasClass("swiper-slide-duplicate-active")){
            if($(this).hasClass("dining")){
                prmBtn.removeClass("on");
                prmBtn.eq(0).addClass("on");
            }else if($(this).hasClass("accommodation")){
                prmBtn.removeClass("on");
                prmBtn.eq(1).addClass("on");
            }else if($(this).hasClass("etc")){
                prmBtn.removeClass("on");
                prmBtn.eq(2).addClass("on");
            }else{
                console.log("카테고리 클래스를 찾을 수 없습니다.");
                
            }
        }else{
            //움직이는동안 클릭하면 액티브가 되지 않음
            console.log("액티브 클래스를 찾을 수 없습니다."); 
        }
        
    });
    
    /*
     만약 슬라이드 클래스 이름에 'active'가 들어간다면
    버튼:  클래스이름에 다이닝이 있는지 찾는다 > (리무브 후) 0번버튼 클래스 on
          클래스 이름에 숙박이 있는지 찾는다 > (리무브 후) 1번버튼 클래스 on
          클래스 이름에 etc가 있는지 찾는다 > (리무브 후) 2번버튼  클래스 on
    */
    
    /*
    
    //슬라이드 --> 버튼 제어 (드래그)
    $(".swiper-slide").draggable({
        stop: function(){
            console.log("ddd");
        }
    });
    
    
    
    box.draggable({                         
        drag:function(){                  
            positionInfo.find('.ol').text(box.offset().left);
            positionInfo.find('.ot').text(box.offset().top);
            positionInfo.find('.pl').text(box.position().left);
            positionInfo.find('.pt').text(box.position().top);
        }
    });
    $(".swiper-container").draggable(function(){
        
        console.log("inner");
        
        if($(".swiper-wrapper > div").hasClass("swiper-slide-active")){
            if($(".swiper-wrapper > div").hasClass("dining")){
                prmBtn.removeClass("on");
                prmBtn.eq(0).addClass("on");
                console.log("다이닝");
            }else if($(".swiper-wrapper > div").hasClass("accommodation")){
                prmBtn.removeClass("on");
                prmBtn.eq(1).addClass("on");
                console.log("숙박");
            }else{
                prmBtn.removeClass("on");
                prmBtn.eq(2).addClass("on");
                console.log("기타");
            }

        }else{
            console.log("error");
        }
        
        
        console.log("inner");
        
    });
    
    */
    
});
    
    
    
    
    
    
    
    
    