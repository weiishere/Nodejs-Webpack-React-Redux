import { HashMap } from './common/hashmap';
import {
    addChild,
    base,
    LGlobal,
    LSystem,
    LSprite,
    LoadingSample2,
    init,
    LInit,
    LStage,
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
    LLoadManage
} from './common/lufylegend-1.9.1.min';

var Result = (function (nameSpeace) {
    nameSpeace.onresize = function () { LGlobal.resize(); }
    LGlobal.destroy = true; //保证游戏中的不用的对象能够顺利被释放
    //获取随机数
    var getRedom = function (minNum, maxNum) {
        switch (arguments.length) {
            case 1: return parseInt(Math.random() * minNum + 1);
            case 2: return parseInt(Math.random() * (maxNum - minNum + 1) + minNum);
            default: return 0;
        }
    }
    var backLayer, rabbit, person, cakeLayer, heartLayer, topTimeLayer, sound, loadingLayer, pausePanel;
    var dropTimer, gameTimer, speedTimer;
    var personCount = 0;
    var reSetValue = function (_nameSpeace) {
        _nameSpeace.cakeMap = new HashMap();
        _nameSpeace.drop_step = 5;//下落速度
        _nameSpeace.dropQuantity = 1500;//每几秒钟下落一个
        _nameSpeace.timeGoQuantity = 10000;//没几秒钟加速一次
        _nameSpeace.timeBulking = 2;//每次增加的速度增量
        _nameSpeace.getCakeCount = 0;
        _nameSpeace.lostCakeCount = 0;
        _nameSpeace.gameSecond = 0;
        _nameSpeace.isSoundLoaded = false;
        _nameSpeace.isStop = false;
    }
    reSetValue(nameSpeace);
    var levelName = ["静如呆子", "标准手残", "行动迅速", "眼疾手快", "动如脱兔"];
    var imglist = [];
    var imgData = new Array(
        { name: "ready", path: "/image/cake/start.jpg" },
        { name: "backBg", path: "/image/cake/backBg.png" },
        { name: "rabbit", path: "/image/cake/rabbit.png" },
        { name: "cloud", path: "/image/cake/cloud.png" },
        { name: "person", path: "/image/cake/person.png" },
        { name: "person2", path: "/image/cake/person_2.png" },
        { name: "heart", path: "/image/cake/heart.png" },
        { name: "cake_1", path: "/image/cake/cake_1.png" },
        { name: "cake_2", path: "/image/cake/cake_2.png" },
        { name: "cake_3", path: "/image/cake/cake_3.png" },
        { name: "cake_4", path: "/image/cake/cake_4.png" },
        { name: "cake_5", path: "/image/cake/cake_5.png" },
        { name: "cake_6", path: "/image/cake/cake_6.png" },
        { name: "cake_7", path: "/image/cake/cake_7.png" },
        { name: "cake_8", path: "/image/cake/cake_8.png" },
        { name: "zongzi", path: "/image/cake/zongzi.png" },
        { name: "tangyuan", path: "/image/cake/tangyuan.png" },
        { name: "jiaozi", path: "/image/cake/jiaozi.png" },
        { name: "menu", path: "/image/cake/menu.png" },
        { name: "reStart", path: "/image/cake/reStart.png" },
        { name: "btu_resume", path: "/image/cake/btu_resume.png" },
        { name: "btu_restart", path: "/image/cake/btu_restart.png" },
        { name: "btu_exit", path: "/image/cake/btu_exit.png" },
        { name: "pausePanel", path: "/image/cake/pausePanel.png" },
        { name: "btu_pause", path: "/image/cake/btu_pause.png" },
        { name: "number1_0", path: "/image/cake/number/0.png" },
        { name: "number1_1", path: "/image/cake/number/1.png" },
        { name: "number1_2", path: "/image/cake/number/2.png" },
        { name: "number1_3", path: "/image/cake/number/3.png" },
        { name: "number1_4", path: "/image/cake/number/4.png" },
        { name: "number1_5", path: "/image/cake/number/5.png" },
        { name: "number1_6", path: "/image/cake/number/6.png" },
        { name: "number1_7", path: "/image/cake/number/7.png" },
        { name: "number1_8", path: "/image/cake/number/8.png" },
        { name: "number1_9", path: "/image/cake/number/9.png" },
        { name: "number2_0", path: "/image/cake/number2/0.png" },
        { name: "number2_1", path: "/image/cake/number2/1.png" },
        { name: "number2_2", path: "/image/cake/number2/2.png" },
        { name: "number2_3", path: "/image/cake/number2/3.png" },
        { name: "number2_4", path: "/image/cake/number2/4.png" },
        { name: "number2_5", path: "/image/cake/number2/5.png" },
        { name: "number2_6", path: "/image/cake/number2/6.png" },
        { name: "number2_7", path: "/image/cake/number2/7.png" },
        { name: "number2_8", path: "/image/cake/number2/8.png" },
        { name: "number2_9", path: "/image/cake/number2/9.png" },
        { name: "resultTxt_0", path: "/image/cake/resultTxt_0.png" },
        { name: "resultTxt_1", path: "/image/cake/resultTxt_1.png" },
        { name: "resultTxt_2", path: "/image/cake/resultTxt_2.png" },
        { name: "resultTxt_3", path: "/image/cake/resultTxt_3.png" },
        { name: "resultTxt_4", path: "/image/cake/resultTxt_4.png" },
        { name: "scorePanel", path: "/image/cake/scorePanel.png" });

    function main() {
        LGlobal.stageScale = LStageScaleMode.EXACT_FIT;
        LSystem.screen(0.5);
        if (backLayer) {
            backLayer.removeAllChild(); backLayer.die();
        }

        backLayer = new LSprite();
        backLayer.graphics.drawRect(1, "#cccccc", [0, 0, LGlobal.width, LGlobal.height], true, "#000000");
        //var bitmapData = new LBitmapData(imglist["loading"]);
        //背景显示
        addChild(backLayer);
        loadingLayer = new LoadingSample2(50);
        backLayer.addChild(loadingLayer);
        LLoadManage.load(imgData, function (progress) {
            //document.getElementById("loadingBg_div").innerHTML = progress + "%";
            loadingLayer.setProgress(progress);
        }, gameInit);
    }
    //读取完所有图片，进行游戏标题画面的初始化工作
    function gameInit(result) {
        //取得图片读取结果
        imglist = result;
        //document.getElementById("loadingBg").style.display = "none";
        //移除进度条层//移除或者这样写 loadingLayer.remove();
        backLayer.removeChild(loadingLayer);
        backLayer.addChild(new LBitmap(new LBitmapData(imglist["ready"])));
        //加入玩家次数
        //var _textField = initTextField("欢迎你，第" + personCount + "位玩家", "#ffffff", 30, LGlobal.width, 20, true);
        //backLayer.addChild(_textField);//玩家统计
        //添加点击事件，点击画面则游戏开始
        if (sound) {
            sound.stop();
        }
        sound = new LSound();
        backLayer.addEventListener(LMouseEvent.MOUSE_UP, function () {
            gameStart();
        });
        LEvent.addEventListener(window, LKeyboardEvent.KEY_UP, function (event) { if (event.keyCode == 13) { gameStart(); } });
    }
    //游戏开始
    var gameStart = function () {
        backLayer.die();
        backLayer.removeAllChild();
        reSetValue(nameSpeace);
        //播放音频
        onup();
        //加载背景
        backLayer.addChild(new LBitmap(new LBitmapData(imglist["backBg"])));
        //加入月饼层
        cakeLayer = new LSprite();
        backLayer.addChild(cakeLayer);
        //加入心
        heartLayer = new LSprite();
        initHeart(3);
        backLayer.addChild(heartLayer);
        //加入时间层
        var topTimeMinute = new Number(0);
        topTimeMinute.x = (LGlobal.width - topTimeMinute.getWidth()) / 2 - 20; topTimeMinute.y = 16;
        var topTimeSecond = new Number(0);
        topTimeSecond.x = (LGlobal.width - topTimeSecond.getWidth()) / 2 + 24; topTimeSecond.y = 16;
        backLayer.addChild(topTimeMinute); backLayer.addChild(topTimeSecond);
        gameTimer = window.setInterval(function () {
            if (nameSpeace.isStop) { return; }
            nameSpeace.gameSecond++;
            if (nameSpeace.gameSecond % 60 == 0) {
                topTimeMinute.setNumber(topTimeMinute.value + 1);
                topTimeSecond.setNumber(0);
            } else {
                topTimeSecond.setNumber(nameSpeace.gameSecond % 60);
            }
        }, 1000);

        //加载兔子
        rabbit = new Rabbit();
        rabbit.speed = 5;
        backLayer.addChild(rabbit);
        //加载云朵
        var cloud = new LBitmap(new LBitmapData(imglist["cloud"]));
        cloud.y = 166;
        backLayer.addChild(cloud);
        //加载主角
        person = new Person();
        person.x = (LGlobal.width - person.getWidth()) / 2;
        person.y = LGlobal.height - person.getHeight();
        backLayer.addChild(person);
        backLayer.addEventListener(LEvent.ENTER_FRAME, onframe);
        //加入暂停按钮
        var btuPause = new LSprite();
        btuPause.addChild(new LBitmap(new LBitmapData(imglist["btu_pause"]))); btuPause.x = 580; btuPause.y = 0;
        btuPause.addEventListener(LMouseEvent.MOUSE_UP, function () { gamePause(); });
        backLayer.addChild(btuPause);
        //开始发月饼
        initFood();
        var timeIndex = 0;
        //计时撒月饼事件
        speedTimer = window.setInterval(function () {
            if (nameSpeace.isStop) { return; }
            timeIndex++;
            if (timeIndex == nameSpeace.timeGoQuantity / 100) {
                timeIndex = 0;
                nameSpeace.drop_step += nameSpeace.timeBulking;
                if (nameSpeace.dropQuantity >= 700) {
                    nameSpeace.dropQuantity -= 200;
                    initFood();
                }
            }
            if (nameSpeace.drop_step >= 25) {
                nameSpeace.drop_step = 25;//最大速度25
                window.clearInterval(speedTimer);
            }
        }, 100);
        //document.getElementById("_adv").style.display = "none";
    }
    //回到主界面
    var backMainPage = function () {
        backLayer.die();
        backLayer.removeAllChild();
        reSetValue(nameSpeace);
        backLayer.addChild(new LBitmap(new LBitmapData(imglist["ready"])));
        backLayer.addEventListener(LMouseEvent.MOUSE_DOWN, function () { gameStart(); });
        //LEvent.addEventListener(window, LKeyboardEvent.KEY_UP, function (event) { if (event.keyCode == 13) { gameStart(); } });
    }
    //游戏暂停
    var gamePause = function () {
        if (!nameSpeace.isStop) {
            nameSpeace.isStop = true;
            //加载游戏面板
            pausePanel = new LSprite();
            pausePanel.addChild(new LBitmap(new LBitmapData(imglist["pausePanel"])));
            backLayer.addChild(pausePanel);
            var btu_resume = new LSprite(); btu_resume.x = 207; btu_resume.y = 333; btu_resume.addChild(new LBitmap(new LBitmapData(imglist["btu_resume"])));
            var btu_restart = new LSprite(); btu_restart.x = 207; btu_restart.y = 427; btu_restart.addChild(new LBitmap(new LBitmapData(imglist["btu_restart"])));
            var btu_exit = new LSprite(); btu_exit.x = 207; btu_exit.y = 530; btu_exit.addChild(new LBitmap(new LBitmapData(imglist["btu_exit"])));
            pausePanel.addChild(btu_resume); pausePanel.addChild(btu_restart); pausePanel.addChild(btu_exit);
            btu_resume.addEventListener(LMouseEvent.MOUSE_UP, function () { gamePause() });
            btu_restart.addEventListener(LMouseEvent.MOUSE_UP, function () { gameStart() });
            btu_exit.addEventListener(LMouseEvent.MOUSE_UP, function () { backMainPage() });
        } else {
            nameSpeace.isStop = false;
            backLayer.removeChild(pausePanel);
        }
    }
    //游戏结束
    var gameOver = function (type, food) {
        //type=1:接到了非月饼type=2：掉落月饼超过3个
        window.clearInterval(speedTimer);
        window.clearInterval(gameTimer);
        window.clearInterval(dropTimer);
        //backLayer.die();
        var scorePanel = new LSprite();
        scorePanel.addChild(new LBitmap(new LBitmapData(imglist["scorePanel"])));
        var theTextField = initTextField("", "#ffcccc", 50, LGlobal.width, LGlobal.height / 2, true);
        theTextField.textAlign = "center"; theTextField.alpha = 0;
        if (type == 1) {
            //theTextField.text = "你接到" + food.CHname + "啦";
            theTextField.text = "接错月饼，游戏结束";
        } else {
            theTextField.text = "丢失3个以上月饼";
        }
        //cakeLayer.removeAllChild();
        nameSpeace.isStop = true;
        backLayer.addChild(theTextField);
        var tween2 = LTweenLite.to(theTextField, 3, {
            y: 430, alpha: 1, loop: false, ease: LEasing.Sine.easeOut, onComplete: function () {
                //加载成绩面板
                backLayer.die();
                //sound.stop();
                backLayer.removeChild(theTextField);
                backLayer.addChild(scorePanel);
                totalGameData(scorePanel);
            }
        });
        //初始化分享信息
    }
    function onframe() {
        if (!nameSpeace.isStop) {
            rabbit.run();
            for (var i = 0; i < cakeLayer.childList.length; i++) {
                cakeLayer.childList[i].onframe();
            }
        }
        if (nameSpeace.isSoundLoaded) {
            if (!sound.playing) sound.play();
        }
    }
    //初始化抛算月饼算法
    var initFood = function () {
        if (dropTimer) { window.clearInterval(dropTimer); }
        dropTimer = window.setInterval(function () {
            if (nameSpeace.isStop) { return; }
            var food;
            var readom = getRedom(1, 14);
            if (readom <= 8) {
                food = new Cake(readom);
            } else if (readom <= 10) {
                food = new Zongzi(readom);
            }
            else if (readom <= 12) {
                food = new Tangyuan(readom);
            }
            else if (readom <= 14) {
                food = new Jiaozi(readom);
            }
            food.x = rabbit.x;
            cakeLayer.addChild(food);
        }, nameSpeace.dropQuantity);
    }
    //加载心
    var initHeart = function (num) {
        heartLayer.removeAllChild();
        for (var i = 0; i < num; i++) {
            var heart = new LSprite();
            heart.addChild(new LBitmap(new LBitmapData(imglist["heart"])));
            heart.x = 13 + (heart.getWidth() + 3) * i; heart.y = 5;
            heartLayer.addChild(heart);
        }
    }
    //统计游戏数据
    var totalGameData = function (scorePanel) {
        var levelNameIndex = 0;
        if (nameSpeace.getCakeCount <= 20) levelNameIndex = 0;
        if (nameSpeace.getCakeCount > 20 && nameSpeace.getCakeCount <= 40) levelNameIndex = 1;
        if (nameSpeace.getCakeCount > 40 && nameSpeace.getCakeCount <= 70) levelNameIndex = 2;
        if (nameSpeace.getCakeCount > 70 && nameSpeace.getCakeCount <= 120) levelNameIndex = 3;
        if (nameSpeace.getCakeCount > 120) levelNameIndex = 4;
        /*var theTextField = initTextField(levelName[levelNameIndex], "#ffffff", 50, scorePanel.getWidth(), 200, true);
        scorePanel.addChild(theTextField);*/
        var resultTxtPic = new LSprite();
        resultTxtPic.addChild(new LBitmap(new LBitmapData(imglist["resultTxt_" + levelNameIndex])));
        resultTxtPic.x = (LGlobal.width - resultTxtPic.getWidth()) / 2; resultTxtPic.y = 200;
        scorePanel.addChild(resultTxtPic);
        for (var i = 1; i <= 8; i++) {
            var _count = new Number(0, "2");
            for (var item in nameSpeace.cakeMap.keys()) {
                var key = nameSpeace.cakeMap.keys()[item];
                if (parseInt(key) == i) {
                    _count = new Number(nameSpeace.cakeMap.get(key), "2");
                    continue;
                }
            }
            _count.x = scorePanel.getWidth() - 150;
            _count.y = 285 + 39 * i;
            scorePanel.addChild(_count);
        }
        var totalCount = new Number(nameSpeace.getCakeCount, "2"); totalCount.x = scorePanel.getWidth() - 180; totalCount.y = LGlobal.height - 320;
        scorePanel.addChild(totalCount);
        var btuBack = new LSprite(); btuBack.x = 40; btuBack.y = 680; btuBack.addChild(new LBitmap(new LBitmapData(imglist["menu"])));
        btuBack.addEventListener(LMouseEvent.MOUSE_UP, function () { backMainPage() });
        var reStart = new LSprite(); reStart.x = 415; reStart.y = 680; reStart.addChild(new LBitmap(new LBitmapData(imglist["reStart"])));
        reStart.addEventListener(LMouseEvent.MOUSE_UP, function () { gameStart() });
        scorePanel.addChild(btuBack); scorePanel.addChild(reStart);
    }
    //兔子类
    function Rabbit() {
        base(this, LSprite, []);
        var self = this;
        this.speed = 5;//每次移动的速度
        this.isRound = true;//是否移动到头，用于控制临时变相，在下次触碰前不变相
        self.setView();
    }
    Rabbit.prototype.setView = function () {
        var self = this;
        self.y = 60;
        self.addChild(new LBitmap(new LBitmapData(imglist["rabbit"])));
    }
    Rabbit.prototype.run = function () {
        var self = this;
        if (self.speed <= 0) {
            self.speed = getRedom(5, 7) * -1;//速度时快时慢
        } else {
            self.speed = getRedom(5, 7);//速度时快时慢
        }
        if (self.x <= 0) {
            self.isRound = false;
            self.speed = Math.abs(self.speed);
        } else if (self.x >= LGlobal.width - self.getWidth()) {
            self.isRound = false;
            self.speed = Math.abs(self.speed) * -1;
        }
        //可能临时变相
        var _isRound = getRedom(1, 70);
        //console.log(_isRound);
        //if (_isRound == 1 && self.isRound == false) {//加上这句话，变换方向之后，不撞墙就不会再变向
        if (_isRound == 1) {
            self.isRound = true;
            self.speed = self.speed * -1;
        }
        self.x += self.speed;
    }
    //主角
    function Person() {
        base(this, LSprite, []); var self = this;
        var isBeginMove = false;
        //if (!LGlobal.canTouch) {//判断当前浏览器是电脑还是只能手机，即判断是否可以触屏
        self.addEventListener(LMouseEvent.MOUSE_DOWN, function () { isBeginMove = true; });//按下
        self.addEventListener(LMouseEvent.MOUSE_UP, function () { isBeginMove = false; });//弹起
        backLayer.addEventListener(LMouseEvent.MOUSE_MOVE, move);//弹起
        //}
        var max_x = LGlobal.width - self.getWidth();
        this.lastPostion_x = 0;
        this.foodInPerson = new LSprite();
        function move(event) {
            if (isBeginMove) {
                if (self.x <= 0) { self.x = 1; return; }
                if (self.x > max_x) { self.x = max_x - 1; return; }
                self.x = event.offsetX - self.getWidth() / 2;
                self.lastPostion_x = self.x;
            }
        }
        this.foodInPerson.removeAllChild();
        self.setView();
    }
    Person.prototype.setView = function (isHaveFood) {
        var self = this;
        this.foodInPerson.scaleX = this.foodInPerson.scaleY = 0.3;
        self.foodInPerson.y = 0;
        this.foodInPerson.x = ((self.getWidth() + this.foodInPerson.getWidth()) / 2) - 8;
        self.addChild(this.foodInPerson);
        var _person = new LSprite();
        if (isHaveFood)
            _person.addChild(new LBitmap(new LBitmapData(imglist["person2"])));
        else
            _person.addChild(new LBitmap(new LBitmapData(imglist["person"])));
        self.addChild(_person);
    }
    Person.prototype.getFood = function (food) {
        var self = this;
        self.removeAllChild();
        this.foodInPerson.removeAllChild();
        this.foodInPerson.addChild(new LBitmap(new LBitmapData(imglist[food.imgListName])));
        self.setView(true);
        var theTextField;
        self.foodInPerson.y = -40;
        if (food instanceof Cake)
            theTextField = initTextField(nameSpeace.getCakeCount, "#ffffff", 40, self.getWidth(), -50, true);
        else
            theTextField = initTextField("你接到" + food.CHname + "啦", "#ffffff", 40, self.getWidth(), -50, true);
        theTextField.filters = null;
        //theTextField.textAlign = "center";
        self.addChild(theTextField);
        //var number = new LSprite();
        var tween = LTweenLite.to(theTextField, 0.8, {
            y: -150, alpha: 0, loop: false, ease: LEasing.Sine.easeOut, onComplete: function () { }
        });
    }
    //食物父类
    function Food(index) {
        base(this, LSprite, []);
        var self = this;
        self.y = 200;
        self.scaleX = self.scaleY = 0.3;
    }
    // Food.prototype.onframe = function () {
    //     var self = this;
    //     self.y += nameSpeace.drop_step;
    // }
    //Food.prototype.speed = drop_step;
    Food.prototype.hitIn = function () {
        var self = this;
        if (self instanceof Cake) {
            nameSpeace.getCakeCount++;
            if (nameSpeace.cakeMap.get(self.cakeIndex)) {
                var _count = parseInt(nameSpeace.cakeMap.get(self.cakeIndex));
                nameSpeace.cakeMap.put(self.cakeIndex, _count + 1);
            } else {
                nameSpeace.cakeMap.put(self.cakeIndex, 1);
            }
        } else {
            //接到了非月饼食物，游戏结束
            gameOver(1, self);
        }
    }//下落到篮子行为
    Food.prototype.hitFloor = function () {
        if (this instanceof Cake)
            nameSpeace.lostCakeCount++;
        if (nameSpeace.lostCakeCount >= 3) {
            //未接到月饼达到3个，游戏结束
            gameOver(2);
        } else {
            initHeart(3 - nameSpeace.lostCakeCount);
        }
        this.name = "";
        this.imgListName = "";
        this.cakeIndex = 0;
    }//下落到地面行为
    Food.prototype.setView = function (index) { }
    Food.prototype.onframe = function () {
        var self = this;
        var SW = self.getWidth(); var PW = person.getWidth();
        if (LGlobal.hitTestRect(self, person)) {
            if (((person.x - self.x) < SW / 2) && (((self.x + SW) - (person.x + PW)) < SW / 2) && (person.y - self.y <= 90) && (person.y - self.y >= 0)) {
                //与篮子发生碰撞
                self.hitIn();
                person.getFood(self);
                self.remove();
            }
        }
        if (self.y >= LGlobal.height) {
            //落到地上
            self.hitFloor();
            self.remove();
        } else {
            self.y += nameSpeace.drop_step;
        }
    }
    //月饼类
    function Cake(index) {
        base(this, Food, []); var self = this; self.cakeIndex = index; 
        this.CHname = "月饼";
        self.setView(index);
    }
    Cake.prototype.setView = function (index) {
        var self = this;
        self.imgListName = "cake_" + index;
        self.addChild(new LBitmap(new LBitmapData(imglist["cake_" + index])));
    }
    function Zongzi(index) {
        base(this, Food, []); var self = this;
        this.CHname = "粽子";
        self.setView(index);
    }
    function Tangyuan(index) {
        base(this, Food, []); var self = this;
        this.CHname = "汤圆";
        self.setView(index);
    }
    function Jiaozi(index) {
        base(this, Food, []); var self = this;
        this.CHname = "饺子";
        self.setView(index);
    }
    Zongzi.prototype.setView = function (index) {
        var self = this;
        self.imgListName = "zongzi";
        self.addChild(new LBitmap(new LBitmapData(imglist["zongzi"])));
    }

    Tangyuan.prototype.setView = function (index) {
        var self = this;
        self.imgListName = "tangyuan";
        self.addChild(new LBitmap(new LBitmapData(imglist["tangyuan"])));
    }

    Jiaozi.prototype.setView = function (index) {
        var self = this;
        self.imgListName = "jiaozi";
        self.addChild(new LBitmap(new LBitmapData(imglist["jiaozi"])));
    }


    var initTextField = function (text, color, size, x, y, iscenter) {
        var _text = new LTextField();
        _text.text = text; _text.color = color; _text.size = size;
        if (iscenter) {
            _text.x = (x - _text.getWidth()) / 2;
        } else { _text.x = x; }
        _text.y = y;
        var shadow = new LDropShadowFilter(2, 45, "#000000", 1);
        _text.filters = [shadow];
        return _text;
    }
    function Number(num, sharpType) {
        base(this, LSprite, []);
        var self = this;
        self.sharpType = sharpType || "1";
        self.value = 0;
        self.changeSpeed = 0.1;
        self.spacing = 0;//数字间隔
        self.scale = 1;//放大倍数
        self.sharpType = "1";//数字图形类别
        self.setView(num);
        self.value = num;

    }

    Number.prototype.setView = function (num) {
        var self = this;
        var digit = (num + "").split("");
        var spriteWrap = new LSprite();
        spriteWrap.x = 0;
        for (var i = 0; i < digit.length; i++) {
            var sprite = new LSprite();
            var num = parseInt(digit[i]);
            sprite.addChild(new LBitmap(new LBitmapData(imglist["number" + self.sharpType + "_" + num])));
            sprite.scaleX = sprite.scaleY = self.scale;
            spriteWrap.y = sprite.getHeight() / 2;
            sprite.y = -sprite.getHeight() / 2;
            sprite.x = spriteWrap.getWidth() + self.spacing;//i * (sprite.width * self.scale + self.spacing);
            spriteWrap.addChild(sprite);
            self.addChild(spriteWrap);
        }
    }
    Number.prototype.setNumber = function (num, callBack) {
        var self = this;
        self.value = num;
        var spriteWrap = self.getChildAt(0);
        LTweenLite.to(spriteWrap, self.changeSpeed, {
            scaleY: 0, onComplete: function () {
                self.removeAllChild();
                self.setView(num);
                spriteWrap = self.getChildAt(0);
                spriteWrap.scaleY = 0;
                LTweenLite.to(spriteWrap, self.changeSpeed, {
                    scaleY: 1, onComplete: function () { if (callBack) callBack.call(self); }
                });
            }
        });
    }
    //播放音频
    function onup(e) {
        if (!sound.playing) {
            var url = "/sound/cake/sound.";
            sound.load(url + "mp3," + url + "ogg," + url + "wav");
            sound.addEventListener(LEvent.COMPLETE, loadOver);
        }
    }
    function loadOver(e) {
        sound.play();
        nameSpeace.isSoundLoaded = true;
    }
    //获取随机数
    nameSpeace.getRedom = function (minNum, maxNum) {
        switch (arguments.length) {
            case 1: return parseInt(Math.random() * minNum + 1);
            case 2: return parseInt(Math.random() * (maxNum - minNum + 1) + minNum);
            default: return 0;
        }
    }
    var loadImages = function (url, callBack) {
        var img = new Image(); //创建一个Image对象，实现图片的预下载
        img.onload = function () { img.onload = null; callBack(img); }
        img.src = url;
    }
    // loadImages("/image/cake/load.gif", function (img) {
    //     document.getElementById("loadingBg").style.display = "block";
    //     init(30, "canvas", 640, 960, main);//加载canvas
    // });
    return {
        init: function () {
            //return init(30, "canvas", 640, 960, main);
            return LInit(30, "canvas", 640, 960, main, LEvent.INIT);
        },
        removeAll: function () {
            if (sound) { sound.stop(); }
            if (backLayer) { backLayer.removeAllChild(); backLayer.die(); }
        }
    }

})({});



//nameSpeaceort {Result};
module.exports = Result;
