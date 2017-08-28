import { HashMap } from './common/hashmap';
import $ from 'jquery';

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
} from './common/lufylegend-1.9.10.min';

var Result = (function (nameSpeace) {
    "use strict";
    // <reference path="lufylegend-1.9.10.min.js" />
    //alert("版本:V2.8");
        nameSpeace.onresize = function () { LGlobal.resize(); }
        LGlobal.destroy = true; //保证游戏中的不用的对象能够顺利被释放
        //LGlobal.preventDefault = false;
        LGlobal.stageScale = LStageScaleMode.EXACT_FIT;
        //LGlobal.aspectRatio = PORTRAIT;//LANDSCAPE

        var getParameterByName = function (name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegnameSpeace("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }
        // var paramKey = ["mid", "gameType", "fightId", "type", "key", "memberMobile"];
        // nameSpeace.param = {}
        // paramKey.forEach(function (item) { param[item] = getParameterByName(item); });
        // nameSpeace.getParam = function (par) {
        //     var para = {
        //         "key": "180332802859F171D6CDCB647E99498A",
        //         "ts": (new Date()).valueOf(),//时间戳
        //         "si": $.md5("2016sgyx_" + (new Date()).valueOf()),
        //         "pa": JSON.stringify(par)
        //     }
        //     return para;
        // }
        // var MD5_key = "";
        // if (param.fightId) {
        //     MD5_key = $.md5(param.memberMobile + "" + param.fightId) + "180332802859F171D6CDCB647E99498A";
        // } else {
        //     MD5_key = $.md5(param.mid + "" + param.gameType) + "180332802859F171D6CDCB647E99498A";
        // }
        // if (MD5_key != param.key) {
        //     $("#errorDiv").show();
        //     return false;
        // }
        //function orientationChange2() {
        //    if (window.orientation != 0) {
        //        document.getElementById("LANDSCAPE").style.display = "block";
        //    } else {
        //        document.getElementById("LANDSCAPE").style.display = "none";
        //    }
        //}
        //addEventListener('load', function(){
        //    orientationChange2();
        //    window.onorientationchange = orientationChange2;
        //});
        var MySoundPlayer,eventBackLayer,loadingLayer;
        var backLayer = null;
        //全局变量
        (function (nameSpeace) {
            nameSpeace.isClearCacheImg = true;
            nameSpeace.time = 0;
            nameSpeace.score1;
            nameSpeace.score2;
            nameSpeace.but_voice;
            nameSpeace.but_game;
            nameSpeace.item_x = 10;
            nameSpeace.item_y = 10;
            //nameSpeace.bgBlocks;
            //nameSpeace.BlocksWrap;
            //nameSpeace.activeBlock = undefined;
            nameSpeace.imglist=[];
            nameSpeace.score_x = [];//横向清除行
            nameSpeace.score_y = [];//纵向清除列
            nameSpeace.version = "v2.53";
            nameSpeace.mySoundPlayer;
            nameSpeace.imgData = new Array(
                { name: "number1_0", path: "/image/1010/number1/number1_0.png" },
                { name: "number1_1", path: "/image/1010/number1/number1_1.png" },
                { name: "number1_2", path: "/image/1010/number1/number1_2.png" },
                { name: "number1_3", path: "/image/1010/number1/number1_3.png" },
                { name: "number1_4", path: "/image/1010/number1/number1_4.png" },
                { name: "number1_5", path: "/image/1010/number1/number1_5.png" },
                { name: "number1_6", path: "/image/1010/number1/number1_6.png" },
                { name: "number1_7", path: "/image/1010/number1/number1_7.png" },
                { name: "number1_8", path: "/image/1010/number1/number1_8.png" },
                { name: "number1_9", path: "/image/1010/number1/number1_9.png" },
                { name: "number2_0", path: "/image/1010/number2/number1_0.png" },
                { name: "number2_1", path: "/image/1010/number2/number1_1.png" },
                { name: "number2_2", path: "/image/1010/number2/number1_2.png" },
                { name: "number2_3", path: "/image/1010/number2/number1_3.png" },
                { name: "number2_4", path: "/image/1010/number2/number1_4.png" },
                { name: "number2_5", path: "/image/1010/number2/number1_5.png" },
                { name: "number2_6", path: "/image/1010/number2/number1_6.png" },
                { name: "number2_7", path: "/image/1010/number2/number1_7.png" },
                { name: "number2_8", path: "/image/1010/number2/number1_8.png" },
                { name: "number2_9", path: "/image/1010/number2/number1_9.png" },
                { name: "icon_voice_close", path: "/image/1010/icon_voice_close.png" },
                { name: "icon_share", path: "/image/1010/icon_share.png" },
                { name: "over_bg", path: "/image/1010/over_bg.png" },
                { name: "stop", path: "/image/1010/stop.png" },
                { name: "play", path: "/image/1010/play.png" },
                { name: "jiangbei", path: "/image/1010/jiangbei.png" },
                { name: "fk_de_2", path: "/image/1010/fk_de_2.png" },
                { name: "icon_voice", path: "/image/1010/icon_voice.png" }
            );
            if (nameSpeace.isClearCacheImg) {
                for (var i = 0; i < nameSpeace.imgData.length; i++) {
                    if (nameSpeace.imgData[i].type) { continue; }
                    nameSpeace.imgData[i].path = nameSpeace.imgData[i].path + "?v=" +nameSpeace.version;// + $.now();
                }
            }
            // imgData.push({ name: "dropIn", path: "sound/s_dropIn.wav" });
            // imgData.push({ name: "dropInFail", path: "sound/s_dropInFail.wav" });
            // imgData.push({ name: "gameover", path: "sound/s_gameover.wav" });
            // imgData.push({ name: "getScore", path: "sound/s_getScore.wav" });
            //nameSpeace.dataList = imgData;
        })(nameSpeace);
        //工具及扩展
        (function () {
            nameSpeace.extend = function () {
                var target = arguments[0] || {}, i = 1, length = arguments.length, deep = false, options;
                if (typeof target === "boolean") {
                    deep = target;
                    target = arguments[1] || {};
                    i = 2;
                }
                if (typeof target !== "object" && !jQuery.isFunction(target))
                    target = {};
                if (length == i) { target = this; --i; }
                for (i = 0; i < length; i++)
                    if ((options = arguments[i]) != null)
                        for (var name in options) {
                            var src = target[name], copy = options[name];
                            if (target === copy) continue;
                            if (deep && copy && typeof copy === "object" && !copy.nodeType)
                                target[name] = $.extend(deep,
                                    src || (copy.length != null ? [] : {}), copy);
                            else
                                if (copy !== undefined) target[name] = copy;
                        }
                return target;
            };
            //获取随机数
            nameSpeace.getRedom = function (minNum, maxNum) {
                switch (arguments.length) {
                    case 1: return parseInt(Math.random() * minNum + 1);
                    case 2: return parseInt(Math.random() * (maxNum - minNum + 1) + minNum);
                    default: return 0;
                }
            }
            nameSpeace.soundList = ["s_dropIn.wav", "s_dropInFail.wav", "s_gameover.wav", "s_getScore.wav"];
            nameSpeace.soundArray = [];
            // nameSpeace.loadSound = function () {
            //     if (!LSound.webAudioEnabled) { return; }
            //     //预加载音频，每次加载一个到soundArray
            //     for (var j = 0; j < soundList.length; j++) {
            //         var soundRole = soundList[j];
            //         var isContain = false;
            //         for (var i = 0; i < soundArray.length; i++) {
            //             if (soundArray[i].name == soundRole) {
            //                 isContain = true;
            //                 theSound = soundArray[i].sound;
            //                 break;
            //             }
            //         }
            //         if (!isContain) {
            //             var _sound = new LSound();
            //             soundArray.push({ name: soundRole, sound: _sound });
            //             _sound.load("sound/" + soundRole);
            //             //console.log(soundRole);
            //             break;
            //         }
            //     }
            // }
            nameSpeace.playSound = function (soundRole, callBack) {
                if (!isAllowPlay) { return false; }
                document.getElementById(soundRole).play();
            }
            //居中
            LTextField.prototype.align = function (parent) {
                if (parent) {
                    this.x = (parent.getWidth() - this.getWidth()) / 2;
                } else {
                    this.x = (LGlobal.width - this.getWidth()) / 2;
                }
            }
            LTextField.prototype.alignY = function (parent) {
                if (parent) {
                    this.y = (parent.getHeight() - this.getHeight()) / 2;
                } else {
                    this.y = (LGlobal.height - this.getHeight()) / 2;
                }
            }
            LSprite.prototype.ObjectList = function (typeName) {
                var _arr = new Array();
                for (var i = 0, l = this.childList.length; i < l; i++) {
                    var item = this.childList[i];
                    if (item.type === typeName) {
                        _arr.push(item);
                    }
                }
                return _arr;
            }
            LShape.prototype.relationSprite = null;
            LSprite.prototype.align = function (parent) {
                if (parent) {
                    this.x = (parent.getWidth() - this.getWidth()) / 2;
                } else {
                    this.x = (LGlobal.width - this.getWidth()) / 2;
                }
            }
            LSprite.prototype.isActive = false;
            LSprite.prototype.alignY = function (parent) {
                if (parent) {
                    this.y = (parent.getHeight() - this.getHeight()) / 2;
                } else {
                    this.y = (LGlobal.height - this.getHeight()) / 2;
                }
            }
            //居中
            //加入层
            nameSpeace.createSprite = function (option, callBack) {
                if (typeof option == "function") {
                    var _sprite = new LSprite();
                    option.call(_sprite);
                    return _sprite;
                }
                var _option = nameSpeace.extend({
                    x: 0,
                    y: 0,
                    image: "",
                    click: undefined,
                }, option || {});
                var _sprite = new LSprite();
                _sprite.x = _option.x;
                _sprite.y = _option.y;
                if (_option.image != "") {
                    var bitmap = new LBitmap(new LBitmapData(nameSpeace.imglist[_option.image]));
                    _sprite.addChild(bitmap);
                }
                if (_option.click) {
                    _sprite.addEventListener(LMouseEvent.MOUSE_UP, function (e) {
                        _option.click.call(_sprite, e);
                    });
                }
                if (callBack) {
                    callBack.call(_sprite);
                }
                return _sprite;
            }
            nameSpeace.createText = function (text, option, callBack) {
                var _option = nameSpeace.extend({
                    x: 0,
                    y: 0,
                    color: "#ae7318",
                    size: 20
                }, option || {});
                var _text = new LTextField();
                _text.text = text;
                _text.size = _option.size;
                _text.color = _option.color;
                _text.y = _option.y;
                _text.x = _option.x;
                if (callBack) { callBack.call(_text); }
                return _text;
            }
            function Trip(text, time) {
                base(this, LSprite, []);
                this.text = text; this.time = time;
                this.setView();
                return this;
            }
            Trip.prototype.setView = function () {
                var _self = this;
                var shape = new LShape();
                var _text = nameSpeace.createText(_self.text, { color: "#fff", size: 24 });

                shape.graphics.drawRect(0, "#ff0000", [10, 10, _text.getWidth() + 40, 50], true, "#000000");
                shape.y = 800; _text.y = 820;
                shape.x = (LGlobal.width - shape.getWidth()) / 2;
                _text.x = (LGlobal.width - _text.getWidth()) / 2 + 10;
                _self.addChild(shape);
                _self.addChild(_text);
                _self.close = function () { LTweenLite.to(_self, 0.6, { loop: false, ease: LEasing.Sine.easeOut, alpha: 0, onComplete: function () { _self.remove(); } }); }
                if (_self.time != 0) {
                    window.setTimeout(function () {
                        _self.close();
                    }, _self.time);
                }
            }
            Trip.prototype.text = "";
            Trip.prototype.time = "";
            Trip.prototype.close = function () { };
            Array.prototype.isContain = function (item) {
                var isPass = false;
                //this.forEach(function (e) { if (e == item) { isPass = true; return false; } });//forEach循环无法跳出，暂时弃用
                for (var i = 0; i < this.length; i++) { if (this[i] == item) { isPass = true; break; } }
                return isPass;
            }
            nameSpeace.Trip = Trip;
        })();
        var bgBlocks = new Array();
        var blockShape1 = new LShape();
        var blockShape2 = new LShape();
        var blockShape3 = new LShape();
        var score_x = [];//横向清除行
        var score_y = [];//纵向清除列
        var isAllowPlay = true;
        var isDisableScreen = false;
        var gameMainPanel,BlocksWrap,activeBlock=undefined;
        var main = function () {
            //LSystem.screen(LStage.FULL_SCREEN);
            LSystem.screen(0.5);
            backLayer = nameSpeace.createSprite();
            backLayer.graphics.drawRect(1, "#cccccc", [0, 0, LGlobal.width, LGlobal.height], true, "#000000");
            eventBackLayer = nameSpeace.createSprite();
            eventBackLayer.graphics.drawRect(1, "#cccccc", [0, 0, LGlobal.width, LGlobal.height], true, "#fff");
            //背景显示
            addChild(eventBackLayer);
            addChild(backLayer);
            loadingLayer = new LoadingSample1();
            backLayer.addChild(loadingLayer);
            LLoadManage.load(nameSpeace.imgData, function (progress) {
                loadingLayer.setProgress(progress);
            }, gameInit);
            //LGlobal.setDebug(true);
            //addChild(new FPS());
        }
        function gameInit(result) {
            //取得图片读取结果
            nameSpeace.imglist = result;
            //MySoundPlayer = new SoundPlayer();
            //mySoundPlayer = new SoundPlayer();
            //移除进度条层//移除或者这样写 loadingLayer.remove();
            //backLayer.removeChild(loadingLayer);
            backLayer.die();
            //eventBackLayer.die();
            backLayer.removeAllChild();
            backLayer.graphics.drawRect(1, "#333333", [0, 0, LGlobal.width, LGlobal.height], true, "#ffffff");
            //addChild(backLayer);
            //var method = function () {
            //    playSound("s_dropIn.mp3", function () { this.play(0, 1);});
            //    //MySoundPlayer.playSound("dropIn");
            //}
            //backLayer.addEventListener(LMouseEvent.MOUSE_UP, function () {
            //    method();
            //});
            gameCommon.init();
        }

        var initPages = {
            indexPage: function () {
                var returnPage = new LSprite();
                //加入时间层
                //var timePanel = createSprite({ x: 25, y: 117 }, function () {
                //    var shape = new LShape();
                //    shape.graphics.drawRoundRect(0, "#ff0000", [0, 0, 92, 35, 10], true, "#BFD09B");
                //    this.addChild(shape);
                //    var _time = createText("00:00", { size: 28, color: "#ffffff" });
                //    this.addChild(_time); _time.align(this); _time.alignY(this); _time.y -= 2; //_time.x += 5; _time.y += 3;
                //});
                //returnPage.addChild(timePanel);
                LMouseEventContainer.set(LMouseEvent.MOUSE_MOVE, true);
                LMouseEventContainer.set(LMouseEvent.MOUSE_UP, true);
                LMouseEventContainer.set(LMouseEvent.MOUSE_DOWN, true);
                LMouseEventContainer.set(LMouseEvent.MOUSE_OUT, true);
                //加入音效按钮
                nameSpeace.but_voice = nameSpeace.createSprite({ x: 540, y: 80, image: "icon_voice" }, function () {
                    returnPage.addChild(this);
                    this.addEventListener(LMouseEvent.MOUSE_DOWN, function (e) {
                        var btu = e.target;
                        nameSpeace.but_voice.removeAllChild();
                        if (!isAllowPlay) {
                            nameSpeace.but_voice.addChild(new LBitmap(new LBitmapData(nameSpeace.imglist["icon_voice"])));
                        } else {
                            nameSpeace.but_voice.addChild(new LBitmap(new LBitmapData(nameSpeace.imglist["icon_voice_close"])));
                        }
                        isAllowPlay = !isAllowPlay;
                    });
                });
                //but_voice = new LButton(new LBitmap(new LBitmapData(imglist["icon_voice"])), new LBitmap(new LBitmapData(imglist["icon_voice"])));
                //but_voice.x = 540; but_voice.y = 80;
                //but_game = new LButton(new LBitmap(new LBitmapData(imglist["play"])), new LBitmap(new LBitmapData(imglist["play"])));
                //but_game.x = 540; but_game.y = 80; but_game.scaleX = but_game.scaleY = 0.5;


                //score1 = createText("0", { size: 60, x: 120, y: 75, color: "#97DC65" });
                nameSpeace.score1 = new Number("0"); nameSpeace.score1.x = (LGlobal.width / 2 - nameSpeace.score1.getWidth()) / 2; nameSpeace.score1.y = 80;
                //score1.defaultlength = 3;
                nameSpeace.score1.spacing = 4; //score1.setNumber(3);

                returnPage.addChild(nameSpeace.createSprite({ x: 250, y: 35, image: "jiangbei" }));

                //nameSpeace.score2 = createText("123", { size: 60, x: 400, y: 75, color: "#46B4E6" });
                nameSpeace.score2 = new Number("0", 1, 2); nameSpeace.score2.scale = 0.7; nameSpeace.score2.x = (LGlobal.width / 2 - nameSpeace.score2.getWidth()) / 2 + LGlobal.width / 2 - 30; nameSpeace.score2.y = 90;
                //nameSpeace.score2.defaultlength = 3;
                nameSpeace.score2.spacing = 4;
                // nameSpeace.score2.setNumber(parseInt(getParameterByName("MaxScore")), function () {
                //     nameSpeace.score2.x = (LGlobal.width / 2 - nameSpeace.score2.getWidth()) / 2 + LGlobal.width / 2 - 30;
                //     returnPage.addChild(nameSpeace.score2);
                // });


                returnPage.addChild(nameSpeace.but_voice); //returnPage.addChild(but_game);
                returnPage.addChild(nameSpeace.score1);
                gameMainPanel = nameSpeace.createSprite({ x: 45, y: 200 });
                
                for (var i = 0; i < nameSpeace.item_x; i++) {
                    var _y = 55 * i;
                    bgBlocks.push(new Array());
                    for (var j = 0; j < nameSpeace.item_y; j++) {
                        bgBlocks[i][j] = { sign: 0, color: "#E2E2E2" };//transparent
                        var _x = 55 * j;
                        var _block = new LSprite(); _block.x = _x; _block.y = _y;
                        var shape = new LShape();
                        shape.graphics.drawRoundRect(0, "#ff0000", [0, 0, 52, 52, 7], true, bgBlocks[i][j].color);
                        _block.addChild(shape);
                        gameMainPanel.addChild(_block);
                    }
                }
                //gameMainPanel.cacheAsBitmap(true);
                returnPage.addChild(gameMainPanel);
                return returnPage;
            },
            gameOver: function () {
                nameSpeace.playSound("s_gameover", function () { });
                //document.getElementById('s_gameover').play();
                var arr = BlocksWrap.ObjectList("LShape");
                for (var i = 0; i < arr.length; i++) { arr[i].die(); }
                var returnPage = new LSprite();
                returnPage.addChild(nameSpeace.createSprite({ image: "over_bg" }));
                returnPage.addChild(nameSpeace.createText("游戏结束", { y: 220, color: "#ffffff", size: 40 }, function () { this.align(); }));
                returnPage.addChild(nameSpeace.createText(nameSpeace, { y: 390, color: "#ffffff", size: 40 }, function () { this.align(); }));

                if (nameSpeace.score1.value > nameSpeace.score2.value) {
                    returnPage.addChild(nameSpeace.createSprite({ image: "icon_share", x: 450, y: 380, click: function () { } }));
                }
                return returnPage;
            }
        }

        var gameCommon = {
            //初始化游戏
            testMoveing: function () {
                var arr = BlocksWrap.ObjectList("LShape");
                for (var i = 0, l = arr.length; i < l; i++) {
                    var _self = arr[i].relationSprite;
                    //console.log(_self.state);
                    if (_self.state != 1 && _self.state != 3) { return true; }
                }
                return false;
            },
            init: function () {
                //初始化界面
                var that = this;
                addChild(initPages.indexPage());//这里不加入到backLayer之中，丢帧现象会好一些
                var score12 = new Number("0"); 
                score12.x = (LGlobal.width / 2 - score12.getWidth()) / 2; score12.y = 80;
                //score1.defaultlength = 3;
                score12.spacing = 4;
                
                BlocksWrap = nameSpeace.createSprite();
                addChild(BlocksWrap);
                
                eventBackLayer.addEventListener(LMouseEvent.MOUSE_OUT, function (e) {
                    if (activeBlock) {
                        backLayer.addShape(LShape.RECT, [0, 0, 640, 960]);
                        activeBlock.stopDrag();
                        LTweenLite.to(activeBlock, 0.2, { scaleX: 0.5, scaleY: 0.5, x: activeBlock.position.x, y: activeBlock.position.y, ease: LEasing.Sine.easeOut, });
                        activeBlock.state = 1;
                        activeBlock = undefined;
                    }
                });
                eventBackLayer.addEventListener(LMouseEvent.MOUSE_MOVE, function (e) {
                    if (!activeBlock) return false;
                    //if (activeBlock.x <= 0 || activeBlock.x >= LGlobal.width - activeBlock.width / 2 || activeBlock.y >= LGlobal.height || activeBlock.y <= activeBlock.height) {
                    //    activeBlock.stopDrag();
                    //    LTweenLite.to(activeBlock, 0.2, { scaleX: 0.5, scaleY: 0.5, x: activeBlock.position.x, y: activeBlock.position.y, ease: LEasing.Sine.easeOut, });
                    //    activeBlock = undefined;
                    //} else {
                    //    activeBlock.x = e.offsetX - activeBlock.width / 2;
                    //    activeBlock.y = e.offsetY - activeBlock.cony;////activeBlock.height / 2 - activeBlock.height;
                    //}
                    activeBlock.x = e.offsetX - activeBlock.width / 2;
                    activeBlock.y = e.offsetY - activeBlock.cony;
                });
                eventBackLayer.addEventListener(LMouseEvent.MOUSE_UP, function (e) {
                    //MySoundPlayer.playSound("dropIn");

                    if (!activeBlock) return false;
                    if (!gameCommon.testState(activeBlock)) {
                        nameSpeace.playSound("s_dropInFail", function () { });
                        //document.getElementById('s_dropInFail').play();
                        activeBlock.stopDrag();
                        backLayer.clearShape();

                        if (!activeBlock) return false;
                        activeBlock.scaleX = activeBlock.scaleY = 0.5;
                        activeBlock.x = activeBlock.position.x;
                        activeBlock.y = activeBlock.position.y;
                        activeBlock.state = 1;
                        activeBlock = undefined;

                        //LTweenLite.to(activeBlock, 0.1, {
                        //    scaleX: 0.5, scaleY: 0.5, x: activeBlock.position.x, y: activeBlock.position.y, ease: LEasing.Sine.easeOut, onComplete: function () {
                        //        if (!activeBlock) return false;
                        //        activeBlock.state = 1;
                        //        activeBlock = undefined;
                        //    }
                        //})
                        //.to(activeBlock, 0.2, { x: activeBlock.position.x, y: activeBlock.position.y, ease: LEasing.Sine.easeOut, });

                    } else {
                        var _s = parseInt(nameSpeace.score1.value);
                        nameSpeace.score1.setNumber(_s + activeBlock.score, function () { nameSpeace.score1.x = (LGlobal.width / 2 - nameSpeace.score1.getWidth()) / 2; });
                        activeBlock.remove();
                        if (score_x.length != 0 || score_y.length != 0) {
                            nameSpeace.playSound("s_getScore", function () { });
                            //document.getElementById('s_getScore').play();
                        } else {
                            nameSpeace.playSound("s_dropIn", function () { });
                            //document.getElementById('s_dropIn').play();
                        }
                        gameCommon.refreshMainPanel();

                        activeBlock.state = 3;
                        activeBlock = undefined;
                        if (BlocksWrap.ObjectList("LSprite").length == 0) {
                            gameCommon.addWaitBlocks();
                        }
                    }

                });
                
                blockShape1.graphics.drawRoundRect(0, "#ff0000", [10, 750, 200, 200, 7], true, "#fff");
                blockShape2.graphics.drawRoundRect(0, "#ff0000", [220, 750, 200, 200, 7], true, "#fff");
                blockShape3.graphics.drawRoundRect(0, "#ff0000", [430, 750, 200, 200, 7], true, "#fff");
                BlocksWrap.addChild(blockShape1);
                BlocksWrap.addChild(blockShape2);
                BlocksWrap.addChild(blockShape3);
                var arr = BlocksWrap.ObjectList("LShape");
                for (var i = 0, l = arr.length; i < l; i++) {
                    (function (arg) {
                        var _shape = arr[arg];
                        _shape.addEventListener(LMouseEvent.MOUSE_DOWN, function (e) {
                            //if (isDisableScreen == true) { return false; }
                            if (that.testMoveing()) { return; }
                            if (activeBlock) return false;
                            var _self = e.clickTarget.relationSprite;
                            _self.isMoveIng = true;
                            //console.log(_self.state);
                            if (_self.state != 1) { return false; }
                            //loadSound();
                            _self.startDrag(e.touchPointID);
                            //_con_x = e.offsetX;
                            //_con_y = e.offsetY;
                            _self.x = e.offsetX - _self.width / 2;
                            _self.y = e.offsetY - _self.cony;//_self.height / 2 - _self.height;
                            _self.state = 2;
                            activeBlock = _self;
                            _self.scaleX = _self.scaleY = 1;
                            //LTweenLite.to(_self, 0.03, { scaleX: 1, scaleY: 1, onComplete: function () { } });

                        });
                    })(i);
                }
                //初始化方块组
                this.addWaitBlocks();
            },
            //加入方块组至待放置区域
            addWaitBlocks: function () {
                var getBlockType = function () {
                    var _redom = nameSpeace.getRedom(1, 100);
                    var _result = 0;
                    var level_1 = [0, 1, 2, 7, 8, 9, 10, 11];
                    var level_2 = [3, 4, 5, 6, 12, 13, 14, 15, 16, 17, 18];
                    var _fn = function (r) {
                        if (_redom <= r) {
                            return level_1[nameSpeace.getRedom(0, level_1.length - 1)];
                        } else {
                            return level_2[nameSpeace.getRedom(0, level_2.length - 1)];
                        }
                    }
                    if (nameSpeace.score1.value < 999) {
                        //0~999分第一组方块出现的概率为65%  第二组出现的概率为35%
                        _result = _fn(65);
                    } else if (nameSpeace.score1.value >= 1000 && nameSpeace.score1.value < 1999) {
                        //1000~1999分第一组方块出现的概率为55%，第二组方块出现的概率为45%
                        _result = _fn(55);
                    } else if (nameSpeace.score1.value >= 2000 && nameSpeace.score1.value < 2999) {
                        //2000~2999分第一组方块出现的概率为45%，第二组方块出现的概率为55%
                        _result = _fn(45);
                    } else {
                        //3000分以上第一组方块出现的概率为33%，第二组方块出现的概率为67%
                        _result = _fn(33);
                    }
                    return _result;
                }

                var _block1 = new Block(getBlockType()); _block1.x = 250; _block1.y = 860 - _block1.getHeight() / 2; _block1.alpha = 0;
                BlocksWrap.addChild(_block1);
                var _block2 = new Block(getBlockType()); _block2.x = 480; _block2.y = 860 - _block2.getHeight() / 2; _block2.alpha = 0;
                BlocksWrap.addChild(_block2);
                var _block3 = new Block(getBlockType()); _block3.x = LGlobal.width; _block3.y = 860 - _block3.getHeight() / 2; _block3.alpha = 0;
                BlocksWrap.addChild(_block3);
                var b_x1 = 110 - _block1.getWidth() / 2;
                var b_x2 = 320 - _block2.getWidth() / 2;
                var b_x3 = 530 - _block3.getWidth() / 2;
                blockShape1.relationSprite = _block1;
                blockShape2.relationSprite = _block2;
                blockShape3.relationSprite = _block3;
                //_block1.position = { x: _block1.x, y: _block1.y };
                //_block2.position = { x: _block2.x, y: _block2.y };
                //_block3.position = { x: _block3.x, y: _block3.y };
                LTweenLite.to(_block1, 0.1, { x: b_x1, alpha: 1, onComplete: function (e) { _block1.state = 1; _block1.position = { x: _block1.x, y: _block1.y }; } });
                LTweenLite.to(_block2, 0.1, { x: b_x2, alpha: 1, onComplete: function (e) { _block2.state = 1; _block2.position = { x: _block2.x, y: _block2.y }; } });
                LTweenLite.to(_block3, 0.1, { x: b_x3, alpha: 1, onComplete: function (e) { _block3.state = 1; _block3.position = { x: _block3.x, y: _block3.y }; } });

                gameCommon.isGameOver();

            },
            //刷新主游戏区域 (true表示有得分，false表示无得分)
            refreshMainPanel: function () {
                gameMainPanel.removeAllChild();
                var eff = 0.7; var _index = 0;
                var backFn = function () {
                    if (BlocksWrap.ObjectList("LSprite").length != 0) {
                        var isOver = gameCommon.isGameOver();
                    }
                }
                for (var i = 0, l = bgBlocks.length; i < l; i++) {
                    var _y = 55 * i;
                    for (var j = 0, l2 = bgBlocks[i].length; j < l2; j++) {
                        var _x = 55 * j;
                        var shape = new LShape();
                        var _block = nameSpeace.createSprite({ x: _x, y: _y }, function () {
                            shape.graphics.drawRoundRect(0, "#ff0000", [0, 0, 52, 52, 7], true, bgBlocks[i][j].color);
                            this.addChild(shape);
                        });
                        //检测是否属于横向消减行\是否属于纵向消减列
                        if (score_x.isContain(i) || score_y.isContain(j)) {
                            var _block2 = nameSpeace.createSprite({ x: _x, y: _y }, function () {
                                var shape2 = new LShape(); shape2.graphics.drawRoundRect(0, "#ff0000", [0, 0, 52, 52, 7], true, "#E2E2E2");
                                this.addChild(shape2);
                            });
                            gameMainPanel.addChild(_block2);
                            var blockWrap = nameSpeace.createSprite({ x: _block.x, y: _block.y }, function () {
                                this.addChild(_block);
                                _block.x = _block.getWidth() / 2; _block.y = _block.getHeight() / 2;
                                shape.x = -shape.getWidth() / 2; shape.y = -shape.getHeight() / 2;
                                eff = eff * 0.85;
                            });
                            //console.log(eff);
                            //var blockWrap = new LSprite(); blockWrap.x = _block.x; blockWrap.y = _block.y;
                            //blockWrap.addChild(_block);
                            //_block.x = _block.getWidth() / 2; _block.y = _block.getHeight() / 2;
                            //shape.x = -shape.getWidth() / 2; shape.y = -shape.getHeight() / 2;
                            //eff = eff * 0.8;
                            LTweenLite.to(blockWrap.getChildAt(0), eff, {
                                scaleX: 0, scaleY: 0, ease: LEasing.Sine.easeOut, onComplete: function () { blockWrap.remove(); }
                            });
                            bgBlocks[i][j].sign = 0; bgBlocks[i][j].color = "#E2E2E2";
                            gameMainPanel.addChild(blockWrap);
                            window.setTimeout(function () {
                                isDisableScreen = false;
                            }, 700);
                        } else {
                            gameMainPanel.addChild(_block);//createSprite({ image: "fk_de_2", x: _x, y: _y }));
                        }
                        //console.log(_block.x + "==" + _block.y);
                    }
                }
                if (score_x.length != 0 || score_y.length != 0) {

                    window.setTimeout(function () { backFn(); }, eff * 1300);
                    var goneLine = score_x.length + score_y.length;
                    var score = 0;
                    switch (goneLine) {
                        case 1:
                            score = 10; break;
                        case 2:
                            score = 40; break;
                        case 3:
                            score = 90; break;
                        case 4:
                            score = 160; break;
                        case 5:
                            score = 250; break;
                        case 6:
                            score = 360; break;
                    }
                    //score = goneLine*10;
                    var _s = parseInt(nameSpeace.score1.value);
                    nameSpeace.score1.setNumber(_s + score, function () { nameSpeace.score1.x = (LGlobal.width / 2 - nameSpeace.score1.getWidth()) / 2; });
                    score_x = [];
                    score_y = [];
                } else {
                    //MySoundPlayer.playSound("dropIn");
                    backFn();
                }
            },
            //检测方块组是否可以放置在最近位置 ，获取消减行列
            isGameOver: function () {
                var isPass = false;
                var fn = function (block, x, y) {
                    //var isStand = true;
                    for (var i = 0, l = block.blockData.length; i < l; i++) {
                        for (var j = 0, l2 = block.blockData[i].length; j < l2; j++) {
                            if (block.blockData[i][j] == 1) {
                                if ((x + j >= nameSpeace.item_x) || (y + i >= nameSpeace.item_y)) { return false; }
                                if (bgBlocks[y + i][x + j].sign == 1) { return false; }
                            }
                        }
                    }
                    return true;
                }
                var arr = BlocksWrap.ObjectList("LSprite");
                for (var i = 0, l = arr.length; i < l; i++) {
                    var _block = arr[i];
                    for (var x = 0; x < nameSpeace.item_x; x++) {
                        for (var y = 0; y < nameSpeace.item_y; y++) {
                            //if (bgBlocks[y][x].sign == 1) { continue; }
                            if (fn(_block, x, y)) { return true; }
                        }
                    }
                }
                addChild(initPages.gameOver());
                //alert("game over");
                return false;
            },
            testState: function (block) {
                //获取落点
                if (block.x < gameMainPanel.x - 20 || gameMainPanel.x > gameMainPanel.x + gameMainPanel.getWidth() + 20) { return false; }
                if (block.y < gameMainPanel.y - 20 || gameMainPanel.y > gameMainPanel.y + gameMainPanel.getHeight() + 20) { return false; }
                var con_temp = 100000; var goalBlock; var goalBlock_index_x = 100; var goalBlock_index_y = 100;
                for (var item in gameMainPanel.childList) {
                    if (!gameMainPanel.childList.hasOwnProperty(item)) { continue; }
                    var _item = gameMainPanel.childList[item];
                    var con_x = Math.abs(block.x - (_item.x + gameMainPanel.x));
                    var con_y = Math.abs(block.y - (_item.y + gameMainPanel.y));
                    if ((con_x + con_y) < con_temp) {
                        con_temp = (con_x + con_y); goalBlock = _item;
                        goalBlock_index_x = goalBlock.x / 55;
                        goalBlock_index_y = goalBlock.y / 55;
                    };
                }
                //alert(goalBlock_index_x + "==" + goalBlock_index_y);
                //判断是否可以放置
                for (var i = 0, l = block.blockData.length; i < l; i++) {
                    for (var j = 0, l2 = block.blockData[i].length; j < l2; j++) {
                        if (block.blockData[i][j] == 1) {
                            if ((goalBlock_index_x + j >= nameSpeace.item_x) || (goalBlock_index_y + i >= nameSpeace.item_y)) { return false; }
                            if (bgBlocks[goalBlock_index_y + i][goalBlock_index_x + j].sign == 1) { return false; }
                        }
                    }
                }
                //开始放置
                for (var i = 0, l = block.blockData.length; i < l; i++) {
                    for (var j = 0, l2 = block.blockData[i].length; j < l2; j++) {
                        if (block.blockData[i][j] == 1) {
                            bgBlocks[goalBlock_index_y + i][goalBlock_index_x + j].sign = 1;
                            bgBlocks[goalBlock_index_y + i][goalBlock_index_x + j].color = block.color;
                        }
                    }
                }
                //横向满格
                for (var i = 0, l = nameSpeace.item_y; i < l; i++) {
                    var isFull = true;
                    for (var j = 0, l2 = bgBlocks[i].length; j < l2; j++) {
                        if (bgBlocks[i][j].sign == 0) { isFull = false; continue; }
                    }
                    if (isFull) { score_x.push(i); }
                }
                //纵向满格
                for (var i = 0; i < nameSpeace.item_x; i++) {
                    var isFull = true;
                    for (var j = 0, l2 = bgBlocks[i].length; j < l2; j++) {
                        if (bgBlocks[j][i].sign == 0) { isFull = false; continue; }
                    }
                    if (isFull) { score_y.push(i); }
                }
                return true;
            }
        }
        var sharpStorage = (function () {
            var sharpTypes = new Array();//19个图像
            sharpTypes.push({ name: "", color: "#7C8FD5", data: [[1]] });

            sharpTypes.push({ name: "", color: "#FFC540", data: [[1, 1]] });
            sharpTypes.push({ name: "", color: "#FFC540", data: [[1], [1]] });

            sharpTypes.push({ name: "", color: "#5ACB87", data: [[1, 1], [1, 0]] });
            sharpTypes.push({ name: "", color: "#5ACB87", data: [[1, 0], [1, 1]] });

            sharpTypes.push({ name: "", color: "#5ACB87", data: [[0, 1], [1, 1]] });
            sharpTypes.push({ name: "", color: "#5ACB87", data: [[1, 1], [0, 1]] });

            sharpTypes.push({ name: "", color: "#EF974A", data: [[1], [1], [1]] });
            sharpTypes.push({ name: "", color: "#EF974A", data: [[1, 1, 1]] });

            sharpTypes.push({ name: "", color: "#E76885", data: [[1], [1], [1], [1]] });
            sharpTypes.push({ name: "", color: "#E76885", data: [[1, 1, 1, 1]] });

            sharpTypes.push({ name: "", color: "#95DB52", data: [[1, 1], [1, 1]] });

            sharpTypes.push({ name: "", color: "#5ABFE3", data: [[1, 1, 1], [1, 0, 0], [1, 0, 0]] });
            sharpTypes.push({ name: "", color: "#5ABFE3", data: [[1, 1, 1], [0, 0, 1], [0, 0, 1]] });
            sharpTypes.push({ name: "", color: "#5ABFE3", data: [[1, 0, 0], [1, 0, 0], [1, 1, 1]] });
            sharpTypes.push({ name: "", color: "#5ABFE3", data: [[0, 0, 1], [0, 0, 1], [1, 1, 1]] });

            sharpTypes.push({ name: "", color: "#DD6454", data: [[1, 1, 1, 1, 1]] });
            sharpTypes.push({ name: "", color: "#DD6454", data: [[1], [1], [1], [1], [1]] });

            sharpTypes.push({ name: "", color: "#4AD3AD", data: [[1, 1, 1], [1, 1, 1], [1, 1, 1]] });
            return sharpTypes;
        })();
        function Block(type, color) {
            base(this, LSprite, []);
            var self = this;
            self.setView(type);
            self.scaleX = self.scaleY = 0.5;

            //self.addEventListener(LMouseEvent.MOUSE_DOWN, function (e) {
            //    if (self.state == 3) { return false; }
            //    _con_x = e.offsetX;
            //    _con_y = e.offsetY;
            //    self.x = e.offsetX - self.width / 2;
            //    self.y = e.offsetY - self.height / 2 - self.height;
            //    self.state = 2;
            //    activeBlock = self;
            //    LTweenLite.to(self, 0.08, { scaleX: 1, scaleY: 1 });
            //});
            //self.addEventListener(LMouseEvent.MOUSE_DOWN, function ondown(e) {
            //    e.clickTarget.startDrag(e.touchPointID);
            //});
            //self.addEventListener(LMouseEvent.MOUSE_UP, function onup(e) {
            //    e.clickTarget.stopDrag();
            //});
        }
        Block.prototype.position = {}
        Block.prototype.color = null;
        Block.prototype.state = 0;//0:初始状态1：预备状态,2:拖动状态,3:已填充状态
        Block.prototype.blockData = [];
        Block.prototype.width = 0;
        Block.prototype.height = 0;
        Block.prototype.cony = 0;
        Block.prototype.score = 0;
        Block.prototype.isMoveIng = false;
        Block.prototype.setView = function (type) {
            var self = this;
            var blockData = this.blockData = sharpStorage[type].data;
            self.color = sharpStorage[type].color || "#7C8FD5";
            self.rotateCenter = false;
            for (var i = 0; i < blockData.length; i++) {
                var _y = 55 * i;
                for (var j = 0; j < blockData[i].length; j++) {
                    var _x = 55 * j;
                    var item = blockData[i][j];
                    if (item == 1) {
                        self.score += 1;
                        var shape = new LShape();
                        shape.graphics.drawRoundRect(0, "#ff0000", [_x, _y, 52, 52, 8], true, self.color);
                        self.addChild(shape);
                        //self.addChild(createSprite({ image: "fk_de_2", x: _x, y: _y }));
                    }
                    //else {
                    //    var shape = new LShape();
                    //    shape.graphics.drawRoundRect(0, "#ff0000", [_x, _y, 52, 52, 8], true, "transparent");
                    //    self.addChild(shape);
                    //}
                }
            }
            self.width = self.getWidth();
            self.height = self.getHeight();
            self.cony = (100 + self.height);
        }
        function Number(num, scale, sharpType) {
            base(this, LSprite, []);
            var self = this;
            self.sharpType = sharpType || "1";
            self.value = num;
            self.scale = scale || 1;
            self.setView(num);
        }
        Number.prototype.value = 0;
        Number.prototype.changeSpeed = 0.1;
        Number.prototype.defaultlength = 0;
        Number.prototype.spacing = 0;//数字间隔
        Number.prototype.scale = 1;//放大倍数
        Number.prototype.sharpType = "1";//数字图形类别
        Number.prototype.singleWidth = 0;
        Number.prototype.setView = function (num) {
            var self = this;
            var digit = (num + "").split("");
            var spriteWrap = new LSprite();
            spriteWrap.x = 0;
            for (var i = 0; i < digit.length; i++) {
                var sprite = new LSprite();
                var num = parseInt(digit[i]);
                sprite.addChild(new LBitmap(new LBitmapData(nameSpeace.imglist["number" + self.sharpType + "_" + num])));
                sprite.scaleX = sprite.scaleY = self.scale;
                spriteWrap.y = sprite.getHeight() / 2;
                sprite.y = -sprite.getHeight() / 2;
                sprite.x = self.singleWidth = spriteWrap.getWidth() + self.spacing;//i * (sprite.width * self.scale + self.spacing);
                spriteWrap.addChild(sprite);
                self.addChild(spriteWrap);
                //self.scaleY = 0.3;
            }
        }
        Number.prototype.setNumber = function (num, callBack) {
            var self = this;
            self.value = num;
            if (self.defaultlength != 0) {
                var _t = parseInt(num);
                var returnValue = "";
                var ss = self.defaultlength - (_t + "").length;
                for (var i = 0; i < ss; i++) { returnValue += "0"; }
                returnValue += _t;
                num = returnValue;
            }
            var spriteWrap = self.getChildAt(0);
            LTweenLite.to(spriteWrap, self.changeSpeed, {
                scaleY: 0, onComplete: function () {
                    self.removeAllChild();
                    self.setView(num);
                    spriteWrap = self.getChildAt(0);
                    spriteWrap.scaleY = 0;
                    LTweenLite.to(spriteWrap, self.changeSpeed, {
                        scaleY: 1, onComplete: function () {
                            if (callBack) callBack.call(self);
                        }
                    });
                }
            });
        }

        //init(7, "canvas", 640, 960, function () { main(); });
        //LInit(30, "canvas", 640, 960, main, LEvent.INIT);
        //if (LGlobal.ios) {
        //    LInit(15, "canvas", 640, 960, main, LEvent.INIT);
        //} else {
        //    LInit(15, "canvas", 640, 960, main, LEvent.INIT);
        //}
    // 日期格式化  
    // 格式 YYYY/yyyy/YY/yy 表示年份  
    // MM/M 月份  
    // W/w 星期  
    // dd/DD/d/D 日期  
    // hh/HH/h/H 时间  
    // mm/m 分钟  
    // ss/SS/s/S 秒  
    //---------------------------------------------------  
    Date.prototype.Format = function (formatStr) {
        var str = formatStr;
        var Week = ['日', '一', '二', '三', '四', '五', '六'];
        str = str.replace(/yyyy|YYYY/, this.getFullYear());
        str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));
        var month = this.getMonth() + 1;
        str = str.replace(/MM/, month > 9 ? month.toString() : '0' + month);
        str = str.replace(/M/g, this.getMonth());
        str = str.replace(/w|W/g, Week[this.getDay()]);
        str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
        str = str.replace(/d|D/g, this.getDate());
        str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
        str = str.replace(/h|H/g, this.getHours());
        str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
        str = str.replace(/m/g, this.getMinutes());
        str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
        str = str.replace(/s|S/g, this.getSeconds());
        return str;
    }
    return {
        init: function () {
            //return init(30, "canvas", 640, 960, main);
            return LInit(30, "canvas", 640, 960, main, LEvent.INIT);
        },
        removeAll: function () { if (backLayer) { backLayer.removeAllChild();eventBackLayer.die(); backLayer.die(); } }
    }

})({});



//export {Result};
module.exports = Result;
