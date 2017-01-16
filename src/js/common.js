/*
    name:常用JS文件
    note:jQuery以外的库，配置方法不写在此文件
    date:2016-12-28
    author:UI
*/
$(function() {
    // 九宫格图片
    setPicSize();
    // 响应式图片
    responsiveImg();
    // 默认左侧菜单
    defaultLeftNav();
    setLeftNavSize();
    //右侧框架
    setframeContentSize();
    //默认选项卡
    defaultTab('click');
    // 双向选项卡
    bothDefaultTab('click');
    // 竖向多级选项卡
    verDefaultTab('click');
});
/* 
    name:弹出窗口
    date:2016-12-28
    author:吴明姜
*/
function popWindow(winobj,width,height){
    $('body').append('<div class="shade"></div>');
    // 设置弹窗内容最大高度
    if (height) {
        $('.pop-content').css('height', height);
    }else if (height=='auto' || !height) {}{
        $('.pop-content').css('max-height', $(window).height()*0.7 + 'px');
    }
    if (width) {
        winobj.css('width',width);
    }else{
        winobj.css('width','50%');
    }
    setPositionCenter(winobj);
    winobj.show();
    var timer=0;
    $(window).bind('resize',function(){
        if(timer)
        {
            clearTimeout(timer);
            timer=0;
        }
        timer=setTimeout(function(){
            setPositionCenter(winobj);
        },300);
    });
    $('.pop-close').click(function() {
        $('.shade').remove();
        $(this).parent().parent().hide();
    });
}
/* 
    name:响应式图片
    date:2016-12-28
    author:吴明姜
*/
function responsiveImg(){
    $('.responsive-img').each(function(){
    $(this).parent().css('overflow','hidden');
    var pw=$(this).parent().width();
    var ph=$(this).parent().height();
    var tw=$(this).width();
    var th=$(this).height();
    if (tw/th>=pw/ph) {
        var css={'height':'100%','width':'auto','marginTop':'auto'};
        $(this).css(css);
        $(this).css('marginLeft',(parseInt($(this).parent().width()) - $(this).width())/2 + 'px');
     }else{
        var css={'height':'auto','width':'100%','marginLeft':'auto'};
        $(this).css(css);
        $(this).css('marginTop',(parseInt($(this).parent().height()) - $(this).height())/2 + 'px');
    }
    });
    resizefun(responsiveImg);
}
/* 
    name:设置居中位置
    date:2016-12-28
    author:吴明姜
*/
function setPositionCenter(pop) {
    var pcss={'top':'','left':''};
    pcss.top=($(window).height() - pop.height()) / 2 + 'px';
    pcss.left=($(window).width() - pop.width()) / 2 + 'px';
    pop.css(pcss);
}
/* 
    name:设置居上位置
    date:2017-01-11
    author:吴明姜
*/
function setPositionTop(pop) {
    var pcss={'top':'','left':''};
    pcss.top='10%';
    pcss.left=($(window).width() - pop.width()) / 2 + 'px';
    pop.css(pcss);
}
/* 
    name:操作提示弹窗
    date:2016-12-28
    author:吴明姜
*/
function tipsPop(type,content,time,position){
    var innertxt='<div class="tipsPop-wrap">'+
        '<i class="tipsPop-close"></i>'+
        '<p class="{{type}}"><i></i>{{content}}</p>'+
    '</div>';
    $('body').append(innertxt.replace('{{type}}',type)
        .replace('{{content}}',content));
    if (position=='center' || position==null || position=='') {
        setPositionCenter($('.tipsPop-wrap'));
    }else if(position=='top') {
        setPositionTop($('.tipsPop-wrap'));
    }
    // 淡出
    $('.tipsPop-close').click(function() {
        $(this).parent().fadeTo("normal", 0.01, function(){
            $(this).slideUp("slow", function() {
                $(this).remove();
            });
        });
    });
    var timer=0;
    if (timer) {
        clearTimeout(timer);
        timer=0;
    }
    timer=setTimeout(function(){
        $('.tipsPop-wrap').fadeTo("normal", 0.01, function(){
            $(this).slideUp("slow", function() {
                $(this).remove();
            });
        });
    },time);
}
/* 
    name:九宫格图片 图片自适应4:3比例 S
    date:2016-12-28
    author:吴明姜
*/
function setPicSize(){
    var list=$("#sudoku > span");
    for(var i=0;i<list.length;i++){
        if(list.length==1){
            list[i].style["width"]="100%";
        }else if(list.length==2){
            list[i].style["width"]="49%";
        }else if(list.length>=2){
            list[i].style["width"]="32%";
        }
        list[i].style["height"]=3*list[i].offsetWidth/4+"px";
        var picObj=list[i].getElementsByTagName('img');
        var img = new Image();
        img.src = picObj[0].src;
        if(img.width/img.height>=4/3){
            picObj[0].style["height"]="100%";
            picObj[0].style["width"]="auto";
            picObj[0].style["marginTop"]='auto';
            picObj[0].style["marginLeft"]=(parseInt(list[i].offsetWidth) - picObj[0].width)/2 + 'px';
        }else{
            picObj[0].style["width"]="100%";
            picObj[0].style["height"]="auto";
            picObj[0].style["marginLeft"]='auto';
            picObj[0].style["marginTop"]=(parseInt(list[i].style.height) - picObj[0].height)/2 + 'px';
        }
    }
}
/* 
    name:默认左侧菜单,可设置无限级，兼容IE7+
    date:2017-01-07
    author:吴明姜
*/
function defaultLeftNav(){
    // 展开收缩事件
    $('.default-slide-nav-wrap').on('click','.slide-link',function(e){
        if(!$(this).hasClass('on')){
            $(this).addClass('on');
            $(this).next('ul').slideDown();
        }else{
            $(this).removeClass('on');
            $(this).next('ul').slideUp();
        }
        // 如果左侧导航收缩，则展开
        if($('.slide-nav-btn').hasClass('on')){
            $('.default-slide-nav-wrap').animate({width:'200px'},300);
            $('.default-right-content').animate({width:($('.default-right-content').width()-150)+'px',paddingLeft:'200px'},300);
            $('.slide-nav-btn').removeClass('on');
        }
        
        // 添加current
        if($(this).parent().attr('class')=='first-nav-li'){
            $('.first-nav-li').removeClass('current');
            $(this).parent().addClass('current');
        }

        if ($(this).attr('url') && $(this).attr('url')!='') {
            $(".frame-content").attr("src",$(this).attr('url'));
        }
        e.stopPropagation();
    });
    $('.slide-nav-btn').bind('click',function(){
        // 收起菜单
        $('.first-nav-li ul').slideUp();
        $('.first-nav-li .slide-link').removeClass('on');
        // 改变宽度
        if(!$(this).hasClass('on')){
            $(this).addClass('on');
            $('.default-slide-nav-wrap').animate({width:'50px'},300);
            $('.default-right-content').animate({width:($('.default-right-content').width()+150)+'px',paddingLeft:'50px'},300);
        }else{
            $(this).removeClass('on');
            $('.default-slide-nav-wrap').animate({width:'200px'},300);
            $('.default-right-content').animate({width:($('.default-right-content').width()-150)+'px',paddingLeft:'200px'},300);
        }
    });
}
/* 
    name:设置左菜单宽高
    date:2017-01-09
    author:吴明姜
*/
function setLeftNavSize(){
    // 设置导航高度
    $('.default-slide-nav-wrap').css('height',$(window).height()-$('.default-head-content').height()-1+'px');
    // 设置导航项高度
    $('.default-slide-nav').css('height',$(window).height()-$('.default-head-content').height()-$('.slide-nav-top').height()-1+'px');
    resizefun(setLeftNavSize);
}
/* 
    name:iframe右框架
    date:2017-01-07
    author:吴明姜
*/
function setframeContentSize(){
    // 设置右框架高度
    $('.default-right-content').css('height',$(window).height()-$('.default-head-content').height()-1+'px')
    .css('width',$(window).width()-$('.default-slide-nav-wrap').width()+'px');
    resizefun(setframeContentSize);
}
/* 
    name:窗口resize函数，设置定时器减轻负荷
    date:2017-01-07
    author:吴明姜
*/
function resizefun(fun){
    var timer=0;
    $(window).bind('resize',function(){
        if(timer)
        {
            clearTimeout(timer);
            timer=0;
        }
        timer=setTimeout(fun,300);
    });
}
/* 
    name:横向简单选项卡-超出滚动
    date:2017-01-13
    author:吴明姜
*/
function horScrollTab(obj,event){
    var scrollTabWrap=obj.find('.scroll-tab-wrap');
    var scrollTabLi=obj.find('.scroll-tab-li');
    var scrollTabContent=obj.find('.scroll-tab-li-con');
    var scrollTab=obj.find('.hor-scroll-tab');
    var scrollBar=obj.find('.scroll-tab-bar');
    scrollTabWrap.on(event, '.scroll-tab-li', function() {
        scrollTabLi.removeClass('current');
        $(this).addClass('current');
        scrollTabContent.hide();
        scrollTabContent.eq($(this).index()).show();
    });
    if (scrollTabLi.width() * scrollTabLi.length > scrollTabWrap.width()) {
        obj.find('.scroll-tab-preview').css('display', 'inline-block');
        obj.find('.scroll-tab-next').css('display', 'inline-block');
    }
    // 左滑动
    var moveGap = scrollTabLi.width();
    scrollTab.on('click', '.scroll-tab-next', function() {
        var endPoint = scrollBar.width() - scrollTabWrap.width(); //左滑动终点
        var realLeft = scrollBar.position().left - 20; //实际偏移量
        if (-realLeft > endPoint || (endPoint + realLeft) <= moveGap) {
            scrollBar.animate({
                left: -endPoint + 'px'
            }, 200);
        } else {
            scrollBar.animate({
                left: (scrollBar.position().left - moveGap) + 'px'
            }, 200);
            moveGap += 1;
        }
    });
    // 右滑动
    scrollTab.on('click', '.scroll-tab-preview', function() {
        var endPoint = 0; //右滑动终点
        var realLeft = scrollBar.position().left - 20; //实际偏移量
        if (-realLeft < moveGap) {
            scrollBar.animate({
                left: endPoint + 'px'
            }, 200);
        } else {
            scrollBar.animate({
                left: (scrollBar.position().left + moveGap) + 'px'
            }, 200);
            moveGap += 1;
        }
    });
}
/* 
    name:横向简单选项卡
    date:2017-01-16
    author:吴明姜
*/
function defaultTab(event){
    $('.hor-default-wrap').on(event, '.hor-tab-li', function() {
        var pobj=$(this).parent().parent();
        pobj.find('.hor-tab-li').removeClass('current');
        $(this).addClass('current');
        pobj.find('.hor-tab-li-content').hide();
        pobj.find('.hor-tab-li-content').eq($(this).index()).show();
    });
}
/* 
    name:双向选项卡
    date:2017-01-16
    author:吴明姜
*/
function bothDefaultTab(event){
    $('.left-tab-menu-li').bind(event,function(e){
        $(this).parent().children('li').removeClass('current');
        $(this).addClass('current');
        $(this).find('.right-tab-wrap').children('li').removeClass('current');
        $(this).find('.right-tab-wrap').children('li').eq(0).addClass('current');
        $(this).find('.right-tab-wrap').show();
        e.stopPropagation();
    });
    $('.right-tab-li').bind(event,function(e){
        $(this).parent().children('li').removeClass('current');
        $(this).addClass('current');
        $(this).find('.right-tab-li-con').show();
        e.stopPropagation();
    });
}
/* 
    name:竖向多级选项卡
    date:2017-01-16
    author:吴明姜
*/
function verDefaultTab(event){
    $('.ver-tab-menu li').bind(event,function(e){
        if($(this).children('ul').hasClass('on')){
            $(this).children('ul').slideUp();
            $(this).children('ul').removeClass('on');
        }else{
           $(this).children('ul').slideDown(); 
           $(this).children('ul').addClass('on');
        }
        $('.ver-tab-menu li').removeClass('current');
        $(this).addClass('current');
        e.stopPropagation();
    });
}



