import $ from 'jquery';

import {
    addChild,
    base,
    LGlobal,
    LSystem,
    LSprite,
    LoadingSample3,
    LAnimationTimeline,
    LAnimation,
    init,
    LStage,
    LShape,
    LBitmap,
    LBitmapData,
    LTextField,
    LDropShadowFilter,
    LSound,
    LMouseEvent,
    LEvent,
    LKeyboardEvent,
    LStageScaleMode,
    LTweenLite,
    LEasing,
    LLoadManage,
    LoadingSample1,
    LMouseEventContainer
} from './common/lufylegend-1.8.6.min';

var Result = (function () {
    "use strict";
    //声明游戏变量
    var loadingLayer, backLayer, graphicsMap, nextLayer, background, stageLayer, gameInfoLayer, man;
    var STAGE_SETP = 2;//下降速度
    var stageSpeed = 70;//增加地板的速度
    var dorpSpeed = 10;//初始下落速度
    var G = 1;//重力加速度
    var JumpG = 2;//起跳加速度，直接影响跳高高度
    var charaMaxSpeed = 45;//主角最大速度
    var imglist = {};
    var downDistance = 0;
    var gameMode = "normal";//普通模式normal，混乱模式chaos
    var isGameStop = false;
    //获取随机数
    var getRedom = function (maxNum) {
        var result = parseInt(Math.random() * 10) + 1;
        while (result > maxNum) { result = parseInt(Math.random() * 10) + 1; }
        return result;
    }
    var imgData = new Array(
        { name: "back", path: "/image/dropMan/sky_1.gif" },
        { name: "back2", path: "/image/dropMan/sky_2.jpg" },
        { name: "man", path: "/image/dropMan/yellowPerson.png" },
        { name: "floor_1", path: "/image/dropMan/floor_1.png" },
        { name: "floor_2", path: "/image/dropMan/floor_2.png" },
        { name: "floor_3", path: "/image/dropMan/floor_5.png" },
        { name: "floor_4", path: "/image/dropMan/floor_6.png" },
        { name: "floor_5", path: "/image/dropMan/floor_3.png" });

    //init(30, "canvas", 400, 640, main);//加载canvas
    var loader;
    var _stageSpeed = stageSpeed;
    function main() {
        STAGE_SETP = 2;//下降速度
        stageSpeed = 70;//增加地板的速度
        dorpSpeed = 10;//初始下落速度
        G = 1;//重力加速度
        gameMode = "normal";//普通模式normal，混乱模式chaos
        isGameStop = false;
        _stageSpeed = stageSpeed;
        //背景层初始化
        backLayer = new LSprite();
        //在背景层上绘制黑色背景
        backLayer.graphics.drawRect(1, "#cccccc", [0, 0, LGlobal.width, LGlobal.height], true, "#000000");
        //背景显示
        addChild(backLayer);
        //进度条读取层初始化
        loadingLayer = new LoadingSample3(50);
        //进度条读取层初始化
        backLayer.addChild(loadingLayer);
        //利用LLoadManager类，读取所有图片，并显示进度条进程
        LLoadManage.load(imgData, function (progress) {
            loadingLayer.setProgress(progress);
        }, gameInit);
    }
    //读取完所有图片，进行游戏标题画面的初始化工作
    function gameInit(result) {
        //取得图片读取结果
        imglist = result;
        //移除进度条层//移除或者这样写 loadingLayer.remove();
        backLayer.removeChild(loadingLayer);
        loadingLayer = null;
        //显示游戏标题
        var title = new LTextField();
        title.y = 100; title.size = 26; title.color = "#ffffff"; title.text = "下一百层你是哥";
        title.x = (LGlobal.width - title.getWidth()) / 2;
        backLayer.addChild(title);
        //显示说明文字
        backLayer.graphics.drawRect(1, "#ffffff", [(LGlobal.width - 230) / 2, 235, 230, 40]);
        var txtClick = new LTextField();
        //alert(LGlobal.width +"---"+ txtClick.getWidth());
        txtClick.y = 240; txtClick.size = 18; txtClick.color = "#ffffff"; txtClick.text = "点击开始游戏";
        txtClick.x = (LGlobal.width - txtClick.getWidth()) / 2;
        backLayer.addChild(txtClick);
        //添加点击事件，点击画面则游戏开始
        backLayer.addEventListener(LMouseEvent.MOUSE_UP, gameStart);
        LEvent.addEventListener(window, LKeyboardEvent.KEY_UP, function (event) {
            if (event.keyCode == 13) {
                gameStart();
            }
        });
    }
    //游戏画面初始化
    function gameStart() {
        //背景层清空
        backLayer.die();//die函数表示移除所有的时间监听
        backLayer.removeAllChild();
        //背景图片显示
        background = new Background();
        background.changeSky("back2");//改变背景
        man = new Chara();//主角初始化
        man.changeAction();
        backLayer.addChild(background);
        backLayer.addChild(man);
        stageInit();//初始化地板
        addStage();//新增地板
        man.x = stageLayer.childList[0].x + (stageLayer.childList[0].getWidth() - man.width) / 2;
        backLayer.addEventListener(LEvent.ENTER_FRAME, onframe);
    }
    function onframe() {
        background.run();
        man.onframe();
        if (_stageSpeed-- < 0) {
            _stageSpeed = stageSpeed;
            addStage();
        }
        if (man.y >= LGlobal.height) {
            alert("Game over，摔死，得分：" + downDistance);
            backLayer.die();
            backLayer.removeAllChild();
            main();
            return;
        }
        var touchChild = null;
        for (var i in stageLayer.childList) {
            if (!stageLayer.childList.hasOwnProperty(i)) { continue; }
            var _child = stageLayer.childList[i];
            _child.onframe();
            if (_child.y + _child.getHeight() < 0) { stageLayer.removeChild(_child); }//清除已经溢顶的地板
            //判断主角是否接触地板(由于图片右边有虚位，所以减掉5像素)
            if ((man._charaOld + man.speed + man.height > _child.y) && (man.x + man.width - 5 > _child.x) && (man.x < _child.x + _child.getWidth())) {
                if (man.y > _child.y) { continue; }//防止主角头上的地板影响
                touchChild = _child;
            }
        }
        if (touchChild) {
            man.isAir = false;
            man.speed = dorpSpeed;
            man.y = touchChild.y - man.height;
            man.changeAction();
            touchChild.hitRun();//地板行为
        } else {
            man.isAir = true;
        }
        downDistance++;
        gameInfoLayer.text = "下落距离:" + (downDistance / 10);
    }
    //初始化地板
    function stageInit() {
        stageLayer = new LSprite();
        backLayer.addChild(stageLayer);
    }
    //新增地板
    function addStage() {
        var floorIndex = getRedom(7);
        var mstage;
        switch (floorIndex) {
            case 1: mstage = new Floor01(); break;
            case 2: mstage = new Floor01(); break;
            case 3: mstage = new Floor01(); break;
            case 4: mstage = new Floor02(); break;
            case 5: mstage = new Floor03(); break;
            case 6: mstage = new Floor04(); break;
            case 7: mstage = new Floor05(); break;
        }
        do {
            var isAdd = true;
            //mstage.y = gameMode == "normal" ? 480 : Math.random() * (480 - mstage.getHeight());
            mstage.x = Math.random() * (LGlobal.width - mstage.getWidth());//防止地板溢出
            if (gameMode == "normal") {
                mstage.y = LGlobal.height;
            } else if (gameMode == "chaos") {
                mstage.y = Math.random() * (LGlobal.height - mstage.getHeight());
                for (var i in stageLayer.childList) {
                    var _child = stageLayer.childList[i];
                    if (_child.y > mstage.y - mstage.getHeight()) { isAdd = false; break; }
                }
            }
        } while (!isAdd) {
            stageLayer.addChild(mstage);
        }
    }
    //背景图片显示
    function Background(bgImgName) {
        //在构造器中只需调用base(this, LSprite, []); 方法既可实现继承，三个参数分别为函数自身, 被继承的父类, 父类构造器的参数
        base(this, LSprite, []);
        var self = this;
        self.bitmapData = new LBitmapData(imglist[bgImgName || "back"]);
        self.bitmap1 = new LBitmap(self.bitmapData);
        self.bitmap1.y = 0;
        self.addChild(self.bitmap1);
        self.bitmap2 = new LBitmap(self.bitmapData);
        self.bitmap2.y = self.bitmap2.getHeight();//这里注意一下Height和getHeight的区别
        self.addChild(self.bitmap2);
        self.bitmap3 = new LBitmap(self.bitmapData);
        self.bitmap3.y = self.bitmap3.getHeight() * 2;
        self.addChild(self.bitmap3);

        gameInfoLayer = new LTextField();
        gameInfoLayer.y = 3; gameInfoLayer.size = 12; gameInfoLayer.color = "#ffffff"; gameInfoLayer.text = "分数:0";
        gameInfoLayer.x = (LGlobal.width - gameInfoLayer.getWidth()) / 2;
        var shadow = new LDropShadowFilter(1, 45, "#000000", 1);
        gameInfoLayer.filters = [shadow];
        self.addChild(gameInfoLayer);
        //alert(self.getChildIndex(gameInfoLayer));
        //为了便于代码折叠和显示，就不使用“Background.prototype.run=...”了
        self.run = function () {
            var self = this;
            self.bitmap1.y -= STAGE_SETP;
            self.bitmap2.y -= STAGE_SETP;
            self.bitmap3.y -= STAGE_SETP;
            var height = self.bitmap1.getHeight();
            if (self.bitmap1.y < -height) { self.bitmap1.y = height * 2 + (self.bitmap1.y + height) }//注意这里，当移动到最下面的时候，y不一定等于-height
            if (self.bitmap2.y < -height) { self.bitmap2.y = height * 2 + (self.bitmap2.y + height) }
            if (self.bitmap3.y < -height) { self.bitmap3.y = height * 2 + (self.bitmap3.y + height) }
        }
        self.changeSky = function (imgName) {
            self.remove(self.bitmap1);
            self.remove(self.bitmap2);
            self.remove(self.bitmap3);

            self.bitmapData = new LBitmapData(imglist[imgName]);
            self.bitmap1 = new LBitmap(self.bitmapData);
            self.bitmap1.y = 0;
            self.addChild(self.bitmap1);
            self.bitmap2 = new LBitmap(self.bitmapData);
            self.bitmap2.y = self.bitmap2.getHeight();//这里注意一下Height和getHeight的区别
            self.addChild(self.bitmap2);
            self.bitmap3 = new LBitmap(self.bitmapData);
            self.bitmap3.y = self.bitmap3.getHeight() * 2;
            self.addChild(self.bitmap3);
            self.setChildIndex(gameInfoLayer, self.getChildIndex(gameInfoLayer) + 3);//将分数层置于顶层
        }
    }
    //地板父类
    function Floor() {
        base(this, LSprite, []);
        var self = this;
        self.hy = 0;//控制游戏主角相对于地板的位置
        self.setView();
    }
    Floor.prototype.onframe = function () { var self = this; self.y -= STAGE_SETP; }
    Floor.prototype.hitRun = function () { }//地板行为，比如强制左移或者右移、弹起
    Floor.prototype.setView = function () { }//用于给地板设置不同的样式
    //地板类型1（普通层）
    function Floor01() { base(this, Floor, []); }//普通
    function Floor02() { base(this, Floor, []); }//地板类型2（自动弹跳层）
    function Floor03() { base(this, Floor, []); }//地板类型2（自动消失）
    function Floor04() { base(this, Floor, []); }//左移类型
    function Floor05() { base(this, Floor, []); }//右移类型
    Floor01.prototype.setView = function () {
        var self = this;
        self.bitmap = new LBitmap(new LBitmapData(imglist["floor_1"]));
        self.addChild(self.bitmap);
    }
    Floor02.prototype.setView = function () {
        var self = this;
        self.bitmap = new LBitmap(new LBitmapData(imglist["floor_2"]));
        self.addChild(self.bitmap);
    }
    Floor02.prototype.hitRun = function () {
        //让主角跳个不停，哈哈
        if (man.isAir) { return; }
        if (man.isJump) { return; }
        man.isJump = true;
        man.isAir = true;
    }
    Floor03.prototype.setView = function () {
        var self = this;
        var list = LGlobal.divideCoordinate(240, 10, 1, 3);
        var data = new LBitmapData(imglist["floor_3"], 0, 0, 80, 10);
        self.anime = new LAnimation(self, data, list);
    }
    Floor03.prototype.hitRun = function () {
        man.x++;//往右转
    }
    Floor03.prototype.onframe = function () {
        var self = this; self.y -= STAGE_SETP;
        self.anime.onframe();
        self.anime.setAction(0);
    }
    Floor04.prototype.setView = function () {
        var self = this;
        var list = LGlobal.divideCoordinate(240, 10, 1, 3);
        var data = new LBitmapData(imglist["floor_4"], 0, 0, 80, 10);
        self.anime = new LAnimation(self, data, list);
    }
    Floor04.prototype.hitRun = function () {
        man.x--;//往左转
    }
    Floor04.prototype.onframe = function () {
        var self = this; self.y -= STAGE_SETP;
        self.anime.onframe();
        self.anime.setAction(0);
    }
    Floor05.prototype.setView = function () {
        var self = this;
        var list = LGlobal.divideCoordinate(240, 10, 1, 3);
        var data = new LBitmapData(imglist["floor_5"], 0, 0, 80, 10);
        self.anime = new LAnimation(self, data, list);
    }
    Floor05.prototype.isDisappear = false;
    Floor05.prototype.hitRun = function () {
        var self = this;
        if (!self.isDisappear) {
            self.isDisappear = true;
            self.timer = window.setInterval(function () { stageLayer.removeChild(self); window.clearInterval(self.timer); }, 2000);
        }
    }
    //游戏主角
    function Chara() {
        base(this, LSprite, []);
        var self = this;
        self.width = 44;
        self.height = 51;
        self.moveType = "stop";//左移还是右移
        self.hp = 3;//当前血量
        self.mxshp = 3;//最大血量
        self.hpCtrl = 0;//血量恢复的速度
        self.isAir = true;//主角是否处于悬空状态
        self.isJump = false;
        self.index = 0;//主角动作的快慢
        self.moveSpeed = 5;//主角每一步的速度
        self.speed = dorpSpeed;//主角初始下落速度
        self._charaOld = 0;//主角每次下落之前的Y坐标
        var list = LGlobal.divideCoordinate(220, 204, 4, 5);
        var data = new LBitmapData(imglist["man"], 0, 0, 44, 51);
        //self.anime = new LAnimation(self, data, list);
        self.anime = new LAnimationTimeline(data, list);
        self.addChild(self.anime);//使用LAnimationTimeline的话一定要加入这句
        self.anime.speed = 0.01;//动作帧速度
    }
    Chara.prototype.onframe = function () {
        
        var self = this;console.log(self.speed);
        self._charaOld = self.y;
        if (self.isJump) {
            self.isAir = true;
            self.isJump = true;
            self.y -= self.speed * JumpG;
            self.speed -= G;//还有重力
            self._charaOld = self.y;
            if (self.speed == 0) {//跳跃到顶点，开始下落
                self.isJump = false;
                self.speed = dorpSpeed;
            }
        } else {
            self.y += self.speed;
            self.speed += G / 10;//还有重力
        }
        if (self.speed > charaMaxSpeed) self.speed = charaMaxSpeed;
        if (self.y > LGlobal.height) {
            self.hp = 0;
        } else if (self.moveType == "left") {
            self.x -= self.moveSpeed;
        } else if (self.moveType == "right") {
            self.x += self.moveSpeed;
        } else if (self.moveType == "up") {
            if (self.isAir) { return; }
            if (self.isJump) { return; }
            self.isJump = true;
            self.isAir = true;
        }

        if (self.x < 0) { self.x = 0; } else if (self.x > LGlobal.width - self.width) { self.x = LGlobal.width - self.width }//防止左右溢出
        if (self.index-- > 0) {
            return;
        }
        self.index = 10;
        self.anime.onframe();
    }
    Chara.prototype.changeAction = function () {
        var self = this;
        //self.anime.speed = 1;
        if (self.moveType == "left") {
            self.anime.setAction(1);
        } else if (self.moveType == "right") {
            self.anime.setAction(0);
        } else {
            //self.anime.speed = 3;
            self.anime.setAction(3);
        }
        if (self.isAir) {
            if (self.isJump) { self.anime.setAction(3); return; }//跳跃的时候如果需要摆动动作就注释掉
            self.anime.setAction(2);
        }
    }
    //通过键盘事件来控制
    if (!LGlobal.canTouch) {//判断当前浏览器是电脑还是只能手机，即判断是否可以触屏
        LEvent.addEventListener(window, LKeyboardEvent.KEY_DOWN, down);//按下
        LEvent.addEventListener(window, LKeyboardEvent.KEY_UP, up);//弹起
    }
    function up(event) {
        if (!man) return;
        man.moveType = "stop";
        man.changeAction();
    }
    function down(event) {
        if (!man) return;
        //alert(event.keyCode);
        if (event.keyCode == 37) {
            man.moveType = "left";
        } else if (event.keyCode == 39) {
            man.moveType = "right";
        } else if (event.keyCode == 38) {
            man.moveType = "up";
        } else if (event.keyCode == 32) {
            if (!isGameStop) {
                LGlobal.setFrameRate(100000);
                isGameStop = true;
            } else {
                LGlobal.setFrameRate(30);
                isGameStop = false;
            }
        }
        man.changeAction();
    }

    return {
        init: function () {
            //return init(30, "canvas", 640, 960, main);
            return init(30, "canvas_dropMan", 400, 640, main,LEvent.INIT);
            //return LInit(30, "canvas", 640, 960, main, LEvent.INIT);
        },
        removeAll: function () { if (backLayer) { backLayer.removeAllChild(); backLayer.die(); backLayer.die(); } }
    }

})({});



//export {Result};
module.exports = Result;
