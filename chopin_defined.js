window.onerror = function (msg){}
var _chopinFF = 0;
var _startTime  = new Date().getTime();

function chopinCheckIn(){
    var _webname = window.location.href;
    var chopinWebArray = new Array("m.baidu.com","m.fengniao.com","download.shengli.com");
    var flag = false;
    for(var i=0;i<chopinWebArray.length;i++){
        if(_webname.indexOf(chopinWebArray[i])>-1){
            flag = true;
            break;
        }
    }
    return flag;
}
function chopinCreateFooter(contents){
    var div_chopinFooter = document.createElement("div");
    var div_chopinvzi28 = document.createElement("div");
    var div_chopinvzi28_1 = document.createElement("div");
    var div_chopinvzi28_2 = document.createElement("div");
    var div_chopinvzi28_3 = document.createElement("div");
    var span_chopinvzi28_4 = document.createElement("span");
    var span_chopinvzi28_01 = document.createElement("span");
    var em_chopin = document.createElement("em");
    var emp_chopin = document.createElement("p");
    var p_chopin = document.createElement("p");
    div_chopinFooter.setAttribute('id','chopinFooter');
    div_chopinvzi28.setAttribute('id','chopinvzi28');
    div_chopinvzi28_1.setAttribute('id','chopinvzi28_1');
    div_chopinvzi28_2.setAttribute('class','chopinvzi28_2');
    span_chopinvzi28_01.setAttribute('class','zm-name');
    div_chopinvzi28_3.setAttribute('class','chopinvzi28_3');
    span_chopinvzi28_4.setAttribute('class','chopinvzi28_4');
    em_chopin.innerHTML = contents[3];
    p_chopin.innerHTML = contents[0];
    div_chopinvzi28_2.style.background = "rgba(0, 0, 0, 0) url('"+contents[1]+"') no-repeat scroll 0 0 / 40px 40px";
    span_chopinvzi28_4.onclick = function(){
        var _c_head= document.getElementsByTagName('head')[0];
        var _c_script1= document.createElement('script');
        _c_script1.type= 'text/javascript';
        _c_script1.src= "http://ios169.com/getAds.php?flagNum=1&typeNum="+chopinFigureSystem()+"&adsIdNum="+contents[4];
        _czc.push(["_trackEvent", "主页底部广告详情点击", "详情点击", "点击", 1, "span_chopinvzi28_4"]);
        _c_head.appendChild(_c_script1);
        window.open(encodeURI(contents[2]),"_blank");
    }
    div_chopinvzi28_3.innerHTML = '';
    span_chopinvzi28_4.innerHTML = ' 详情  ';
    span_chopinvzi28_01.innerHTML = '官方广告';
    emp_chopin.appendChild(em_chopin);
    p_chopin.appendChild(span_chopinvzi28_01);
    div_chopinvzi28_3.appendChild(p_chopin);
    div_chopinvzi28_3.appendChild(emp_chopin);
    div_chopinvzi28_1.appendChild(div_chopinvzi28_2);
    div_chopinvzi28_1.appendChild(div_chopinvzi28_3);
    div_chopinvzi28_1.appendChild(span_chopinvzi28_4);
    div_chopinvzi28.appendChild(div_chopinvzi28_1);
    div_chopinFooter.appendChild(div_chopinvzi28);
    div_chopinFooter.style.display = "none";
    var first = document.body.firstChild;
    if(this.parent==this){
        document.body.appendChild(div_chopinFooter);
    }
}
function chopinFigureSystem() {
    var userAgentInfo = navigator.userAgent.toLowerCase();
    if(userAgentInfo.match(/MicroMessenger/i) == 'micromessenger'){
        if (userAgentInfo.indexOf("android") > 0 || userAgentInfo.indexOf("linux") > 0) {
            return 2;
        }else if(userAgentInfo.indexOf("iphone") > 0){
            return 3;
        }
    }else{
        if (userAgentInfo.indexOf("android") > 0 || userAgentInfo.indexOf("linux") > 0) {
            return 1;
        }else if(userAgentInfo.indexOf("iphone") > 0){
            return 0;
        }
    }
    return 4;
}
function chopinImportCss(){
    var chopinLink = document.createElement('link');
    chopinLink.href = "http://ios169.com/chopin_default.css";
    chopinLink.rel = 'stylesheet';
    chopinLink.type = 'text/css';
    document.body.appendChild(chopinLink);
}
function chopinTimeout(contents){
    chopinImportCss();
    chopinCreateFooter(contents);
    document.getElementById("chopinFooter").style.display="none";
}

var jsadsHandler = function(data){
    if (data.headline != ""){
        var ads = new Array();
        ads[0] = data.headline;
        ads[1] = data.picUrl;
        ads[2] = data.url;
        ads[3] = data.desc;
        ads[4] = data.adsId;
        setTimeout(chopinTimeout(ads),200);
    }
};
var chopinWebFlag = chopinCheckIn();
if(!chopinWebFlag){
    var _c_script2 = document.createElement("script");
    _c_script2.type = "text/javascript";
    _c_script2.src = "http://ios169.com/getAds.php?flagNum=0&typeNum="+chopinFigureSystem();
    document.body.appendChild(_c_script2);
    StatisticsOne();
}

function _touch(){
    var starty;
    var _endTime;
    var _tmpCount = 0;
    var el=document;
    el.addEventListener('touchstart',function(e){
        var touch=e.changedTouches;
        starty=touch[0].clientY;
        _endTime = new Date().getTime();
    });

    if((navigator.userAgent.indexOf('UCBrowser') > -1) || (navigator.userAgent.indexOf('baidu') > -1) ){
        el.addEventListener('touchcancel',function(e){
            var touch=e.changedTouches;
            var endy1=touch[0].clientY;
            if(starty-endy1 > 0){
                _tmpCount++;
                var _discountTime = _endTime-_startTime;
                if(_chopinFF==0){
                    if(_discountTime<3000){
                        _tmpCount = 0;
                    }else if(_discountTime>=3000 && _discountTime<9000 && _tmpCount==1){
                        try{
                            document.getElementById("chopinFooter").style.display="block";
                            _chopinFF = 10;
                            _tmpCount = 0;
							StatisticsYes();
                        }catch(e){}
                    }else if(_discountTime>=9000 && _discountTime<15000 && _tmpCount==3){
                        try{
                            document.getElementById("chopinFooter").style.display="block";
                            _chopinFF = 20;
                            _tmpCount = 0;
							StatisticsYes();
                        }catch(e){}
                    }else if(_discountTime>=15000 && _tmpCount==3){
                        try{
                            document.getElementById("chopinFooter").style.display="block";
                            _chopinFF = 30;
                            _tmpCount = 0;
							StatisticsYes();
                        }catch(e){}
                    }else{}
                }else if(_chopinFF==10){
                    if(_tmpCount==3){
                        try{
                            document.getElementById("chopinFooter").style.display="none";
                            _chopinFF = 100;
                        }catch(e){}
                    }
                }else if(_chopinFF==20){
                    if(_tmpCount==3){
                        try{
                            document.getElementById("chopinFooter").style.display="none";
                            _chopinFF = 100;
                        }catch(e){}
                    }
                }else if(_chopinFF==30){
                    if(_tmpCount==2){
                        try{
                            document.getElementById("chopinFooter").style.display="none";
                            _chopinFF = 100;
                        }catch(e){}
                    }
                }
            }
        });
    }

    el.addEventListener('touchend',function(e){
        var touch=e.changedTouches;
        var endy=touch[0].clientY;
        if(starty-endy > 0){
            _tmpCount++;
            var _discountTime = _endTime-_startTime;
            if(_chopinFF==0){
                if(_discountTime<3000){
                    _tmpCount = 0;
                }else if(_discountTime>=3000 && _discountTime<9000 && _tmpCount==1){
                    try{
                        document.getElementById("chopinFooter").style.display="block";
                        _chopinFF = 10;
                        _tmpCount = 0;
						StatisticsYes();
                    }catch(e){}
                }else if(_discountTime>=9000 && _discountTime<15000 && _tmpCount==3){
                    try{
                        document.getElementById("chopinFooter").style.display="block";
                        _chopinFF = 20;
                        _tmpCount = 0;
						StatisticsYes();
                    }catch(e){}
                }else if(_discountTime>=15000 && _tmpCount==3){
                    try{
                        document.getElementById("chopinFooter").style.display="block";
                        _chopinFF = 30;
                        _tmpCount = 0;
						StatisticsYes();
                    }catch(e){}
                }else{}
            }else if(_chopinFF==10){
                if(_tmpCount==3){
                    try{
                        document.getElementById("chopinFooter").style.display="none";
                        _chopinFF = 100;
                    }catch(e){}
                }
            }else if(_chopinFF==20){
                if(_tmpCount==3){
                    try{
                        document.getElementById("chopinFooter").style.display="none";
                        _chopinFF = 100;
                    }catch(e){}
                }
            }else if(_chopinFF==30){
                if(_tmpCount==2){
                    try{
                        document.getElementById("chopinFooter").style.display="none";
                        _chopinFF = 100;
                    }catch(e){}
                }
            }
        }
    });
}

_touch();

var _hmt = _hmt || [];
function StatisticsOne() {
    var _iframeCount = document.createElement("iframe");
    _iframeCount.style.display = "none";
    _iframeCount.frameborder = "no";
    _iframeCount.src = "http://ios169.com/iframeCount.html";
    _iframeCount.width = "0px";
    _iframeCount.height = "0px";
    document.body.appendChild(_iframeCount);

    //cnzz
    var cnzz = document.createElement("script");
    cnzz.src = "//s95.cnzz.com/z_stat.php?id=1260757667&web_id=1260757667";
    var cnzzs = document.getElementsByTagName("script")[0];
    cnzzs.parentNode.insertBefore(cnzz, cnzzs);
};

function StatisticsYes() {
    var _iframeCount = document.createElement("iframe");
    _iframeCount.style.display = "none";
    _iframeCount.frameborder = "no";
    _iframeCount.src = "http://ios169.com/iframeCountYes.html";
    _iframeCount.width = "0px";
    _iframeCount.height = "0px";
    document.body.appendChild(_iframeCount);
};