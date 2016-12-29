/*
    name:常用JS文件
    note:jQuery以外的库，配置方法不写在此文件
    date:2016-12-28
    author:UI
*/
$(function() {
    // 弹窗居中
    popWindow();
    // 九宫格图片
    setPicSize();
    // 响应式图片
    responsiveImg();
});
/* 
    name:弹出窗口
    date:2016-12-28
    author:吴明姜
*/
function popWindow(){
    // 设置弹窗内容最大高度
    $('.pop-content').css('max-height', $(window).height()*0.7 + 'px');
    $(window).on('resize',function() {
        // 设置弹框div位置
        $('.pop-wrap').each(function(){
            setPosition($(this));
        });
        setPosition($('.tipsPop-wrap'));
        // 图片自适应
        responsiveImg();
    });
    $('.pop-close').click(function() {
        $('.shade').hide();
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
    console.log(tw/th+'----'+pw/ph);
    if (tw/th>=pw/ph) {
        $(this).css('height','100%');
        $(this).css('width','auto');
        $(this).css('marginTop','auto');
        $(this).css('marginLeft',(parseInt($(this).parent().width()) - $(this).width())/2 + 'px');
     }else{
        $(this).css('width','100%');
        $(this).css('height','auto');
        $(this).css('marginLeft','auto');
        $(this).css('marginTop',(parseInt($(this).parent().height()) - $(this).height())/2 + 'px');
    }
    });
}
/* 
    name:设置居中位置
    date:2016-12-28
    author:吴明姜
*/
function setPosition(pop) {
    pop.css('top', ($(window).height() - pop.height()) / 2 + 'px');
    pop.css('left', ($(window).width() - pop.width()) / 2 + 'px');
}
/* 
    name:操作提示弹窗
    date:2016-12-28
    author:吴明姜
*/
function tipsPop(type,content,time){
    var innertxt='<div class="tipsPop-wrap">'+
        '<i class="tipsPop-close"></i>'+
        '<p class="{{type}}"><i></i>{{content}}</p>'+
    '</div>';
    $('body').append(innertxt.replace('{{type}}',type)
        .replace('{{content}}',content));
    setPosition($('.tipsPop-wrap'));
    // 淡出
    $('.tipsPop-close').click(function() {
        $(this).parent().fadeTo("normal", 0.01, function(){
            $(this).slideUp("slow", function() {
                $(this).remove();
            });
        });
    });
    setTimeout(function(){
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




