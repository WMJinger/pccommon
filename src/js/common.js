/*
    name:常用JS文件
    note:jQuery以外的库，配置方法不写在此文件
    date:2016-12-28
    author:UI
*/
$(function() {
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
    // 默认自定义单选
    defineRadio();
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
        var imgcss1={'height':'100%','width':'auto','marginTop':'auto'};
        $(this).css(imgcss1);
        $(this).css('marginLeft',(parseInt($(this).parent().width()) - $(this).width())/2 + 'px');
     }else{
        var imgcss2={'height':'auto','width':'100%','marginLeft':'auto'};
        $(this).css(imgcss2);
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
    if (position=='center' || position===null || position==='') {
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
function setPicSize(obj){
    var list=obj.children('span');
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
        // alert(picObj[0].width+'高度：'+picObj[0].height);
        if(picObj[0].width/picObj[0].height>=4/3){
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

        if ($(this).attr('url') && $(this).attr('url')!=='') {
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
    var fcss={
        'height':$(window).height()-$('.default-head-content').height()-1+'px',
        'width':$(window).width()-$('.default-slide-nav-wrap').width()+'px'
    }
    $('.default-right-content').css(fcss);
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
/* 
    name:响应式表格改写,减少重绘次数
    date:2017-01-17
    argument：单元格最小宽度，每次自减个数，展开标志出现在第几列
    author:吴明姜
*/
function responsiveTable(obj,minWidth,foldTd){
    var _table=obj;
    var oth_html=[];
    //保存tr值
    _table.find('th').each(function(i){
        oth_html[i]=$(this).html();
    });
    // 保存td值
    var tr_length=_table.find('tr').length-1;
    var $td=_table.find('td');
    var otd_html=[];
    for(var i=0,k=0;i<tr_length;i++){//行
        otd_html[i]=[]; 
        for(var j=0;j<oth_html.length;j++){//列
            otd_html[i][j]= _table.find('td').eq(k).html();
            k++;
        }
    }
    resizeTable(_table,oth_html,otd_html);
    function resizeTable(tableObj,ths,tds){
        var otd_num=tableObj.find('tr').first().children('th').length;
        var ave_td_w=$(window).width()/otd_num;
        var tableTemp='';
        var trTemp='',tdTemp='';
        var snum=ths.length-parseInt($(window).width()/minWidth);//需缩放的td个数
        if (snum<=0) {
            snum=0;
        }
        // 拼接th行
        for(var j=0;j<ths.length-snum;j++){
            
            trTemp=trTemp+'<th>'+ths[j]+'</th>';
        }
        tableTemp='<tr>'+trTemp+'</tr>';
        trTemp='';

        //拼接内容行
        for(var i=0;i<tr_length;i++){   //表格除首行行数
            // 原始行
            for(var q=0;q<tds[i].length-snum;q++){
                // 添加展开标记
                if((q+1)==foldTd && snum!==0){
                    tdTemp=tdTemp+'<td>'+tds[i][q]+'<span class="fold" foldId="'+i+'">+</span>'+'</td>';
                }else{
                    //拼接本行td
                    tdTemp=tdTemp+'<td>'+tds[i][q]+'</td>';
                }
            }
            tableTemp=tableTemp+'<tr>'+tdTemp+'</tr>';
            tdTemp='';
            // 收缩行
            for(var k=tds[i].length-snum;k<tds[i].length;k++){
                tdTemp=tdTemp+'<tr class="child" foldId="'+i+'"><td>'+ths[k]+'</td><td colspan='+(tds[i].length-snum-1)+'>'+tds[i][k]+'</td></tr>';
            }
            tableTemp=tableTemp+tdTemp;
            tdTemp='';
        }
        tableObj.empty().append(tableTemp);
    }
    obj.on('click','.fold',function(e){
        var span_fold_id=$(this).attr('foldId');
        if ($(this).html()=='+') {
            $(this).parent().parent().parent().find("tr[foldId='"+span_fold_id+"']").show();
            $(this).html('-');
        }else{
            $(this).parent().parent().parent().find("tr[foldId='"+span_fold_id+"']").hide();
            $(this).html('+');
        }
    });
    $(window).bind('resize',function(){
        var timer=0;
        if(timer)
        {
            clearTimeout(timer);
            timer=0;
        }
        timer=setTimeout(resizeTable(_table,oth_html,otd_html),300);
    });
}
/* 
    name:滑屏表格-兼容IE8+
    date:2017-01-17
    argument：单元格最小宽度，每次自减个数，展开标志出现在第几列
    author:吴明姜
*/
function slideTable(tableObj){
    var pl=parseInt(tableObj.find('.table-slide-th').css('paddingLeft').replace('px','')) || 0;
    var showLi=tableObj.find('.slide-li');
    var showLiw=showLi.width();
    var slideUl=showLi.find('ul');
    var slideLi=slideUl.eq(0).find('li');
    var slideLiw=slideLi.width();
    var slideUlw=slideLi.length*slideLiw;

    slideUl.css('width',slideUlw+'px');//设置滚动ul宽度,收缩表格与滑动表格共用时不兼容IE8，待调整；
    if(slideUlw>showLiw){
        // 左滑动
        var slideGap = slideLiw;
        $('#nextQuestion').bind('click',function() {
            var endPoint = slideUlw - showLiw; //左滑动终点
            var realLeft = slideUl.position().left-pl; //实际偏移量
            if (-realLeft > endPoint || (endPoint + realLeft) <= slideGap) {
                slideUl.animate({
                    left: -endPoint + 'px'
                }, 200);
                $('#nextQuestion').addClass('enabled');
            } else {
                slideUl.animate({
                    left: (slideUl.position().left - slideGap-pl) + 'px'
                }, 200);
                $('#nextQuestion').removeClass('enabled');
            }
            $('#prevQuestion').removeClass('enabled');
        });
        // 右滑动
        $('#prevQuestion').bind('click',function() {
            var endPoint = 0; //右滑动终点
            var realLeft = slideUl.position().left-pl; //实际偏移量
            if (-realLeft <= slideGap) {
                slideUl.animate({
                    left: -endPoint + 'px'
                }, 200);
                $('#prevQuestion').addClass('enabled');
            } else {
                slideUl.animate({
                    left: (slideUl.position().left + slideGap-pl) + 'px'
                }, 200);
                $('#prevQuestion').removeClass('enabled');
            }
            $('#nextQuestion').removeClass('enabled');
        });
    }else{
        $('#prevQuestion').addClass('enabled');
        $('#nextQuestion').addClass('enabled');
    }
}
/* 
    name:自定义单选多选
    date:2017-01-23
    author:吴明姜
*/
function defineRadio(){
    $('body').on('click','.define-radio',function(){
        if(!$(this).hasClass('disabled')){
            var radioName=$(this).attr('name');
            $('.define-radio[name='+radioName+']').each(function(){
                if(!$(this).hasClass('disabled')){
                    $(this).removeClass('checked')
                }
            });
            $(this).addClass('checked');
        }
    });
    $('body').on('click','.define-cbox',function(){
        if(!$(this).hasClass('disabled')){
            if($(this).hasClass('checked')){
                $(this).removeClass('checked');
            }else{
                $(this).addClass('checked');
            }
        }
    });
}
/* 
    name:获取单选、多选的值
    date:2017-01-23
    author:吴明姜
*/
function inputval(name){
    var radioObj=$('.define-radio[name='+name+']');
    var cboxObj_name=$('.define-cbox[name='+name+']').eq(0);
    var cboxObj_id=$('.define-cbox[id='+name+']').eq(0);
    var val='';
    if (radioObj.length!==0){ 
        radioObj.each(function(){
            if ($(this).hasClass('checked')) {
                val=$(this).html();
            }
        });
    }else if (cboxObj_name.length!==0){
        val=cboxObj_name.html();
    }else if(cboxObj_id.length!==0){
        val=cboxObj_id.html();
    }
    return val;
}
/* 
    name:设置单选、多选的值
    date:2017-01-23
    author:吴明姜
*/
function inputset(id,name,value){
    if (!value) {
        value=name;
    }
    var radioObj=$('.define-radio[name='+id+']');
    var cboxObj_id=$('.define-cbox[id='+id+']');
    var cboxObj_name=$('.define-cbox[name='+id+']');
    if (radioObj.length!==0) {
        radioObj.removeClass('checked');
        radioObj.each(function(){
            if ($(this).html()==value) {
                $(this).addClass('checked');
            }
        })
    }else if(cboxObj_id.length!==0){
        cboxObj_id.addClass('checked');
    }else if(cboxObj_name.length!==0){
        cboxObj_name.addClass('checked');
    }else{
        console.log("找不到指定元素！");
    }
}







