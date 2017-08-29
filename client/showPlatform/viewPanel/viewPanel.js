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
    //exp.onresize = function () { LGlobal.resize(); }
    LGlobal.destroy = true; //保证不用的对象能够顺利被释放
    //LGlobal.preventDefault = false;
    LGlobal.stageScale = LStageScaleMode.EXACT_FIT;
    //LGlobal.aspectRatio = PORTRAIT;//LANDSCAPE
    var backLayer, eventBackLayer;
    var tool = {};
    var global = {};
    //全局变量
    (function (exp) {
        exp.version = "v2.53";
        exp.imgData = new Array();
        exp.imglist = [];
        exp.statisticalLayerLeft = new LSprite();
        exp.statisticalLayerRight = new LSprite();
        exp.progressLayerCenter = new LSprite();
        exp.dataList = exp.imgData;
    })(global);

    //工具及扩展
    (function (exp) {
        exp.extend = function () {
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
                            target[name] = jQuery.extend(deep,
                                src || (copy.length != null ? [] : {}), copy);
                        else
                            if (copy !== undefined) target[name] = copy;
                    }
            return target;
        };
        //获取随机数
        exp.getRedom = function (minNum, maxNum) {
            switch (arguments.length) {
                case 1: return parseInt(Math.random() * minNum + 1);
                case 2: return parseInt(Math.random() * (maxNum - minNum + 1) + minNum);
                default: return 0;
            }
        }
        exp.getParameterByName = function (name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }
        //base64编码解码
        exp.base64Coder = (function () {
            var obj = {};
            var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            var base64DecodeChars = new Array(
                -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
                52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
                -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
                15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
                -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
                41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
            obj.base64encode = function (str) {
                var out, i, len;
                var c1, c2, c3;
                len = str.length;
                i = 0;
                out = "";
                while (i < len) {
                    c1 = str.charCodeAt(i++) & 0xff;
                    if (i == len) {
                        out += base64EncodeChars.charAt(c1 >> 2);
                        out += base64EncodeChars.charAt((c1 & 0x3) << 4);
                        out += "==";
                        break;
                    }
                    c2 = str.charCodeAt(i++);
                    if (i == len) {
                        out += base64EncodeChars.charAt(c1 >> 2);
                        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                        out += base64EncodeChars.charAt((c2 & 0xF) << 2);
                        out += "=";
                        break;
                    }
                    c3 = str.charCodeAt(i++);
                    out += base64EncodeChars.charAt(c1 >> 2);
                    out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                    out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
                    out += base64EncodeChars.charAt(c3 & 0x3F);
                }
                return out;
            }
            obj.base64decode = function (str) {
                var c1, c2, c3, c4;
                var i, len, out;
                len = str.length;
                i = 0;
                out = "";
                while (i < len) {
                    do {
                        c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
                    } while (i < len && c1 == -1);
                    if (c1 == -1)
                        break;
                    do {
                        c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
                    } while (i < len && c2 == -1);
                    if (c2 == -1)
                        break;
                    out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
                    do {
                        c3 = str.charCodeAt(i++) & 0xff;
                        if (c3 == 61)
                            return out;
                        c3 = base64DecodeChars[c3];
                    } while (i < len && c3 == -1);
                    if (c3 == -1)
                        break;
                    out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
                    do {
                        c4 = str.charCodeAt(i++) & 0xff;
                        if (c4 == 61)
                            return out;
                        c4 = base64DecodeChars[c4];
                    } while (i < len && c4 == -1);
                    if (c4 == -1)
                        break;
                    out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
                }
                return out;
            }
            return obj;
        })();
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
        exp.createSprite = function (option, callBack) {
            if (typeof option == "function") {
                var _sprite = new LSprite();
                option.call(_sprite);
                return _sprite;
            }
            var _option = $.extend({
                x: 0,
                y: 0,
                image: "",
                click: undefined,
            }, option || {});
            var _sprite = new LSprite();
            _sprite.x = _option.x;
            _sprite.y = _option.y;
            if (_option.image != "") {
                var bitmap = new LBitmap(new LBitmapData(global.imglist[_option.image]));
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
        exp.createText = function (text, option, callBack) {
            var _option = $.extend({
                x: 0,
                y: 0,
                color: "#666",
                size: 16
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
            var _text = tool.createText(_self.text, { color: "#fff", size: 24 });
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
        Array.prototype.min = function () {
            var min = this[0];
            var len = this.length;
            for (var i = 1; i < len; i++) {
                if (this[i] < min) {
                    min = this[i];
                }
            }
            return min;
        }
        Array.prototype.max = function () {
            var max = this[0];
            var len = this.length;
            for (var i = 1; i < len; i++) {
                if (this[i] > max) {
                    max = this[i];
                }
            }
            return max;
        }
        exp.Trip = Trip;
    })(tool);
    function main() {
        LSystem.screen(0.9);
        backLayer = tool.createSprite();
        backLayer.graphics.drawRect(1, "#cccccc", [0, 0, LGlobal.width, LGlobal.height], true, "#000000");
        eventBackLayer = tool.createSprite();
        eventBackLayer.graphics.drawRect(1, "#cccccc", [0, 0, LGlobal.width, LGlobal.height], true, "#fff");
        //背景显示
        addChild(backLayer);
        addChild(eventBackLayer);
        var loadingLayer = new LoadingSample1();
        backLayer.addChild(loadingLayer);
        LLoadManage.load(global.imgData, function (progress) {
            loadingLayer.setProgress(progress);
        }, gameInit);
        //LGlobal.setDebug(true);
        //addChild(new FPS());
    }
    function gameInit(result) {
        //取得图片读取结果
        global.imglist = result;
        //MySoundPlayer = new SoundPlayer();
        //mySoundPlayer = new SoundPlayer();
        //移除进度条层//移除或者这样写 loadingLayer.remove();
        //backLayer.removeChild(loadingLayer);
        backLayer.die();
        backLayer.removeAllChild();
        backLayer.graphics.drawRect(0, "#cccccc", [0, 0, LGlobal.width, LGlobal.height], true, "#fff");
        addChild(backLayer);
        backLayer.addChild(global.statisticalLayerLeft);
        backLayer.addChild(global.progressLayerCenter);
        backLayer.addChild(global.statisticalLayerRight);
        gameCommon.init();
    }
    var initPages = {
        indexPage: function () {
            var returnPage = new LSprite();
            //写入左部统计图
            var statistical = new Statistical('品质趋势', 2, 2, 360, 205, { radius: 0, space: [28, 60, 40, 40] });
            global.statisticalLayerLeft.addChild(statistical);
            var source1 = new Source(
                { numberColor: "#fff", numberPostion: "in", bottomName: "柱体1" },
                [{ isShowNumber: true, numberColor: "#005", bottomName: "曲线1" }],
                {
                    axis_x: ['12:30', '13:00', '13:30', '14:00', '14:30', '15:00'],
                    dataForCylinder: [3, 8, 7, 6, 9, 16],
                    dataForCurves: [[3, 5, 7, 12, 9, 34]]
                });
            //statistical.renderData(source1);
            var statistical2 = new Statistical('品质异常', 2, 218, 360, 205, { radius: 0, space: [28, 60, 40, 40] });
            global.statisticalLayerLeft.addChild(statistical2);
            var source2 = new Source({ numberPostion: "out", numberColor: "#666", speed: 5 }, [{ speed: 5 }], { axis_x: ['余量', '误差', '过曲', '裂缝', '质地'], dataForCylinder: [5, 6, 11, 12, 9], dataForCurves: [[7, 4, 7, 10, 16]] })
            //statistical2.renderData(source2);
            var statistical3 = new Statistical('线别品质', 2, 435, 360, 205, { radius: 0, space: [28, 40, 40, 40], isShowBottom: true });
            global.statisticalLayerLeft.addChild(statistical3);
            var source3 = new Source({ numberPostion: "in", numberColor: "#cff", speed: 4 },
                [{ isShowNumber: true, speed: 7, borderColor: "#3399ff", bottomName: "曲线_1" },
                { isShowNumber: true, speed: 7, borderColor: "#336666", bottomName: "曲线_2" },
                { isShowNumber: true, speed: 7, borderColor: "#666699", bottomName: "曲线_3" }],
                { axis_x: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10'], });

            //写入中部部分
            global.progressLayerCenter.x = 372;
            var mainData = [
                { name: "模组产量/计划", value: "5984" },
                { name: "总计划", value: "515/556" },
                { name: "总完成", value: "52%" },
                { name: "总达成率", value: "58.23%" },
                { name: "总直通率", value: "49.22%" }];
            //写入数字汇总
            for (var i = 0; i < mainData.length; i++) {
                global.progressLayerCenter.addChild(tool.createSprite({ x: 15, y: 20 + (45 * i) }, function () {
                    this.graphics.drawRoundRect(0, "#000", [0.5, 0.5, 420, 35, 0], true, "#f6f6f6");
                    var _w = 0; var _s = this;
                    this.addChild(tool.createText(mainData[i].name + "：", {}, function () { _w = this.getWidth(); this.alignY(_s); }));
                    this.addChild(tool.createText(mainData[i].value, { x: _w + 10, color: "#000", size: 25 }, function () { this.alignY(_s); }));
                }));
            }
            //写入进度表
            global.progressLayerCenter.graphics.drawRoundRect(1, "#999999", [.5, 2.5, 450, 250, 0], true, "#fff");
            global.progressLayerCenter.graphics.drawRoundRect(1, "#999999", [.5, 262.5, 450, 378, 0], true, "#fff");
            global.progressLayerCenter.addChild(new Progress("HD6A", 5, 280, 440, 70));
            global.progressLayerCenter.addChild(new Progress("HD6B", 5, 370, 440, 70, { data: { status: "投产", name: 'LED32C', progress: [660, 1500], arr: [{ name: "达成率", value: '52%' }, { name: "FPY", value: '88%' }, { name: "pcs / hour", value: '54' }] } }));
            global.progressLayerCenter.addChild(new Progress("HD7A", 5, 460, 440, 70, { data: { status: "投产", name: 'LED32C', progress: [2800, 4000], arr: [{ name: "达成率", value: '62%' }, { name: "FPY", value: '47%' }, { name: "pcs / hour", value: '22' }] } }));
            global.progressLayerCenter.addChild(new Progress("HD8B", 5, 545, 440, 70, { data: { status: "待产", name: 'LED32C', progress: [0, 0], arr: [{ name: "达成率", value: '0%' }, { name: "FPY", value: '0%' }, { name: "pcs / hour", value: '0' }] } }));
            global.statisticalLayerRight.x = 830;
            //写入右部统计图
            var statistical4 = new Statistical('效率趋势', 2, 2, 360, 205, { radius: 0, space: [28, 60, 23, 40], isShowBottom: false });
            global.statisticalLayerRight.addChild(statistical4);
            var source4 = new Source({ numberColor: "#fff", numberPostion: "in" }, [{ isShowNumber: true, numberColor: "#005" }], { axis_x: ['12:30', '13:00', '13:30', '14:00', '14:30', '15:00'], dataForCylinder: [3, 8, 7, 6, 9, 16] });
            //statistical4.renderData(source4);
            var statistical5 = new Statistical('产量趋势', 2, 218, 360, 205, { radius: 0, space: [28, 60, 40, 40] });
            global.statisticalLayerRight.addChild(statistical5);
            var source5 = new Source({ numberPostion: "out", numberColor: "#666", speed: 5, canvasGradientColor: ["#357a10", "#fff"] }, [{ speed: 5, borderColor: "#333" }], { axis_x: ['余量', '误差', '过曲', '裂缝', '质地'], dataForCylinder: [5, 6, 11, 12, 9], dataForCurves: [[7, 4, 7, 10, 16]] })
            //statistical5.renderData(source5);
            var statistical6 = new Statistical('产量按线别', 2, 435, 360, 205, { radius: 0, space: [28, 40, 40, 40] });
            global.statisticalLayerRight.addChild(statistical6);
            var source6 = new Source({ numberPostion: "in", numberColor: "#cff", speed: 4 },
                [{ isShowNumber: true, speed: 7, borderColor: "red", bottomName: "曲线1" },
                { isShowNumber: false, speed: 7, borderColor: "blue", numberColor: "blue", bottomName: "曲线2" },
                { isShowNumber: true, speed: 7, borderColor: "green", numberColor: "green", bottomName: "曲线3" }],
                { axis_x: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10'], });
            //statistical6.renderData(source6);
            var ren = function () {
                var d = [], dd = [], d2 = [], dd2 = [], d3 = [], dd3_1 = [], dd3_2 = [], dd3_3 = [], dd6_1 = [], dd6_2 = [], dd6_3 = [];
                for (var i = 0; i < 6; i++) {
                    d.push(tool.getRedom(10, 20));
                    dd.push(tool.getRedom(15, 40));
                }
                for (var i = 0; i < 5; i++) {
                    var _d = tool.getRedom(10, 100);
                    d2.push(_d);
                    dd2.push(_d);
                }
                for (var i = 0; i < 10; i++) {
                    d3.push(tool.getRedom(50, 100));
                    dd3_1.push(tool.getRedom(10, 30));
                    dd3_2.push(tool.getRedom(30, 90));
                    dd3_3.push(tool.getRedom(90, 130));
                    dd6_1.push(tool.getRedom(100, 130));
                    dd6_2.push(tool.getRedom(50, 100));
                    dd6_3.push(tool.getRedom(5, 50));
                }
                source1.data.dataForCylinder = d;
                source1.data.dataForCurves = [dd];
                source2.data.dataForCylinder = d2;
                source2.data.dataForCurves = [dd2];
                //source3.data.dataForCylinder = d3;
                source3.data.dataForCurves = [dd3_1, dd3_2, dd3_3];
                source6.data.dataForCurves = [dd6_1, dd6_2, dd6_3];
                statistical.renderData(source1);
                statistical2.renderData(source2);
                statistical3.renderData(source3);
                statistical4.renderData(source4);
                statistical5.renderData(source5);
                statistical6.renderData(source6);
            }
            ren();
            setInterval(function () {
                ren();
            }, 5000);
            return returnPage;
        }
    }
    var gameCommon = {
        init: function () {
            //初始化界面
            var that = this;
            addChild(initPages.indexPage());//-------------------这里不加入到backLayer之中，丢帧现象会好一些----------------------
        }
    }
    var getxMax = function (max, count) {
        if (max % count != 0) {
            return getxMax(max + 1, count);
        } else {
            return max;
        }
    }
    function Progress(title, x, y, w, h, _option) {
        base(this, LSprite, []);
        var self = this;
        self.option = $.extend({}, _option || {});
        for (var i in Progress.prototype) {
            for (var j in _option) { if (i == j) self[i] = _option[j]; }
        }
        self.title = title;
        self.x = x; self.y = y;
        self.w = w; self.h = h;
        self.setView();
    }
    Progress.prototype.data = { status: "投产", name: 'LED32C', progress: [160, 1000], arr: [{ name: "达成率", value: '21%' }, { name: "FPY", value: '63%' }, { name: "pcs / hour", value: '56' }] };
    Progress.prototype.setView = function () {
        var self = this;
        self.removeAllChild();
        //self.graphics.drawRoundRect(1, "#999999", [0.5, 0.5, self.w, self.h, 0], true, "#fff");
        self.addChild(tool.createSprite({ x: 1, y: 7 }, function () {
            this.graphics.drawRoundRect(0, "#999999", [0, 0, 60, 55, 0], true, "#fff");
            var _s1 = this;
            this.addChild(tool.createText(self.title, { y: 5 }, function () { this.align(_s1); }));
            this.addChild(tool.createSprite({ x: 0, y: 25 }, function () {
                var _s2 = this;
                this.graphics.drawRoundRect(1, "#999999", [0.5, 0.5, 50, 25, 5], true, "#eee");
                this.align(_s1);
                this.addChild(tool.createText(self.data.status, { y: 4 }, function () {
                    this.align(_s2);
                }));
            }));
        }));
        self.addChild(tool.createSprite({ x: 70, y: 7 }, function () {
            var _s = this;
            //this.graphics.drawRoundRect(0, "#999999", [0, 0, self.w - 275, 55, 0], true, "#eee");
            this.addChild(tool.createText("机型：" + self.data.name, { x: 5, y: 5, size: 10 }));
            this.graphics.drawRoundRect(1, "#999", [5.5, 28.5, self.w - 285, 20, 4], true, "#fff");
            if (self.data.progress[0] != 0) { this.graphics.drawRoundRect(1, "#339933", [6.5, 29.5, (self.w - 275) * (self.data.progress[0] / self.data.progress[1]), 18, 3], true, "#33cc33"); }
            this.addChild(tool.createText(self.data.progress[0] + "/" + self.data.progress[1], { y: 31.5, color: "#000", size: 10 }, function () { this.align(_s); }));
        }));
        self.addChild(tool.createSprite({ x: self.w - 200, y: 7 }, function () {
            this.graphics.drawRoundRect(1, "#999999", [0.5, 0.5, 200, 55, 6], true, self.data.status == "投产" ? "#ccffcc" : "#cc6666");
            for (var i = 0; i < self.data.arr.length; i++) {
                this.addChild(tool.createSprite({ x: 0 + 66 * i, y: 0 }, function () {
                    var _s = this;
                    this.graphics.drawRoundRect(0, "#999", [1.5, 1.5, 66, 53, 6], true, "transportant");
                    if (i != 2) { this.graphics.drawLine(1, "#666", [66.5, 3, 66.5, 50]); }
                    this.addChild(tool.createText(self.data.arr[i].name, { size: 8, y: 5, color: "#000" }, function () { this.align(_s); }));
                    this.addChild(tool.createText(self.data.arr[i].value, { size: 22, y: 25, color: "#000" }, function () { this.align(_s); }));
                }));
            }
        }));
    }
    //统计图
    function Statistical(title, x, y, w, h, _option) {
        base(this, LSprite, []);
        var self = this;
        self.option = $.extend({}, _option || {});
        for (var i in Statistical.prototype) {
            for (var j in _option) { if (i == j) self[i] = _option[j]; }
        }
        // self.x = 0;
        // self.y = 0;
        // self.w = 0;
        // self.h = 0;
        self.title = title; //self.radius = radius;
        self.x = x; self.y = y;
        self.w = w; self.h = h;
        self.title = '示例图';
        self.radius = 0;
        self.isShowBottom = true;
        self.panel_color = "#eeeeee";
        self.space = [28, 30, 35, 30];//上右下左的间隔值
        self.unit_count_y = 6;//纵坐标刻度单位数量
        self.pillar = true;//是否显示柱状图
        self.pillar_number = true;//柱状是否显示数据
        self.pillar_width = 20;//柱状宽度
        self.pillar_color = '#ae7318';//柱状颜色
        self.graph = true;//是否显示柱状图
        self.graph_number = true;//柱状是否显示数据
        self.graph_color = '#ae7318';//柱状宽度
        self.axis_x_scale = 1;//x轴字体缩放
        //self.mainData = { axis_x: ['12:30','13:00','13:30','14:00','14:30','15:00'], data: [3, 6, 7, 6, 9, 16] };//曲线数据，max为X轴最大值，data为Y数据
        self.graphData = { max: 12, data: [5, 8, 7, 6, 9, 11] };//曲线数据，用于曲线不共享数据的情况
        self.setView();
    }

    Statistical.prototype.fatch = function (callback) {//主数据
        this.mainData = { max: 12, data: [5, 8, 7, 6, 9, 11] };
        callback(this.mainData);
        this.build();
    }
    Statistical.prototype.setView = function () {
        var self = this;
        self.removeAllChild();
        self.graphics.drawRoundRect(1, "#999999", [0.5, 0.5, self.w, self.h, self.radius], true, "#fff");
        //写入标题
        var title = tool.createText(self.title, { size: 16, y: 4, color: '#333' });
        self.addChild(title);
        title.align(self);
        self.panelLayer = new LSprite();
        self.cylinderLayer = new LSprite();
        self.addChild(self.panelLayer);
        self.addChild(self.cylinderLayer);
    }
    Statistical.prototype.renderData = function (source) {
        //加入圆柱或者曲线数据源
        var self = this;
        //重置刻度
        self.panelLayer.graphics.clear();
        self.panelLayer.removeAllChild();
        var bottomPanel = new LSprite();
        var x_length = (self.w - self.space[3] - self.space[1]) / source.data.axis_x.length;//X轴每个刻度的量
        //绘制背景色
        self.panelLayer.graphics.drawRect(0, "#999", [self.space[3], self.space[0], self.w - self.space[1] - self.space[3] + x_length, self.h - self.space[0] - self.space[2]], true, self.panel_color);
        //绘制Y轴
        self.panelLayer.graphics.drawLine(1, "#666", [self.space[3] + 0.5, self.space[0], self.space[3] + 0.5, self.h - self.space[2]]);
        //绘制X轴
        self.panelLayer.graphics.drawLine(1, "#666", [self.space[3], self.h - self.space[2] + 0.5, self.w - self.space[1] + x_length, self.h - self.space[2] + 0.5]);
        self.panelLayer.addChild(tool.createSprite({}, function () {
            //得到Y轴刻度值和网格线
            var max_y1 = source.data.dataForCylinder ? getxMax(source.data.dataForCylinder.max(), self.unit_count_y) : 0;
            var _index = 0, _tempMaxY = 0, max_y2 = 0;
            if (source.data.dataForCurves) {
                for (var i = 0; i < source.data.dataForCurves.length; i++) {
                    if (_tempMaxY <= source.data.dataForCurves[i].max()) {
                        _index = i; _tempMaxY = source.data.dataForCurves[i].max();
                    }
                }
                max_y2 = getxMax(source.data.dataForCurves[_index].max(), self.unit_count_y);
            }
            var _max_y = max_y1 > max_y2 ? max_y1 : max_y2;
            var axisUnit_y = _max_y / self.unit_count_y;//Y轴每个刻度的量（先获取Y轴的最大可除值）
            var y_length = self.h - self.space[0] - self.space[2];//Y轴长度
            for (var i = 0; i <= self.unit_count_y; i++) {
                var _kedu = tool.createText(axisUnit_y * i, { x: self.x, y: self.h - self.space[2] - (y_length / self.unit_count_y) * i, size: 12 });
                this.addChild(_kedu);
                _kedu.x = self.space[3] - _kedu.getWidth() - 6;
                _kedu.y -= _kedu.getHeight() / 2 + 1;
                if (i != 0) {
                    this.graphics.drawLine(1, "#ddd", [self.x + self.space[3], parseInt(self.h - self.space[2] - (y_length / self.unit_count_y) * i) + 0.5, self.w - self.space[1] + x_length, parseInt(self.h - self.space[2] - (y_length / self.unit_count_y) * i) + 0.5]);
                    this.graphics.drawLine(1, "#666", [self.x + self.space[3] - 2, parseInt(self.h - self.space[2] - (y_length / self.unit_count_y) * i) + 0.5, self.x + self.space[3] - 5, parseInt(self.h - self.space[2] - (y_length / self.unit_count_y) * i) + 0.5]);
                }
            }
            var cylinder; var curvesArr = [];
            //得到X轴刻度值和网格线
            for (var i = 1; i <= source.data.axis_x.length; i++) {
                var _kedu = tool.createText(source.data.axis_x[i - 1], { x: self.space[3] + x_length * i, y: self.h - self.space[2] + 6, size: 12 });
                this.addChild(_kedu); _kedu.scaleX = _kedu.scaleY = self.axis_x_scale;
                _kedu.x -= _kedu.getWidth() / 2;
                this.graphics.drawLine(1, "#ddd", [parseInt(self.space[3] + x_length * i) + 0.5, self.h - self.space[2], parseInt(self.space[3] + x_length * i) + 0.5, self.space[0]]);//网格线
                this.graphics.drawLine(1, "#666", [parseInt(self.space[3] + x_length * i) + 0.5, self.h - self.space[2], parseInt(self.space[3] + x_length * i) + 0.5, self.h - self.space[2] + 4]);//刻度值
                //加入圆柱
                if (source.data.dataForCylinder) {
                    var trueHeight = (source.data.dataForCylinder[i - 1] / _max_y) * (y_length);
                    //var cylinder;
                    if (source.CylinderArr.length != source.data.dataForCylinder.length) {
                        var _option = $.extend({ x: parseInt(self.space[3] + x_length * i), y: self.h - self.space[2] + 1, _height: trueHeight - (source.data.dataForCylinder[i - 1] / _max_y), x_length: x_length, number: source.data.dataForCylinder[i - 1] }, source.CylinderOption);
                        cylinder = new Cylinder(_option);
                        cylinder.x += (cylinder.x_length * cylinder.preWidth) / 2;
                        cylinder.x = parseInt(cylinder.x) + 0.5;
                        source.CylinderArr.push(cylinder);
                        self.cylinderLayer.addChild(cylinder);
                    } else {
                        cylinder = source.CylinderArr[i - 1];
                        cylinder._height = trueHeight - (source.data.dataForCylinder[i - 1] / _max_y);
                        cylinder.number = source.data.dataForCylinder[i - 1];
                        cylinder.setView();
                    }
                }
                //加入曲线
                if (source.data.dataForCurves) {
                    if (source.CurvesArr.length != source.data.axis_x.length) {
                        var arr = [];
                        for (var j = 0; j < source.data.dataForCurves.length; j++) {
                            var itemData = source.data.dataForCurves[j];
                            var trueHeight2 = (itemData[i - 1] / _max_y) * (y_length);
                            var _option2 = $.extend({
                                x: parseInt(self.space[3] + x_length * i),
                                y: self.h - self.space[2] + 1,
                                _height: trueHeight2 - (itemData[i - 1] / _max_y),
                                x_length: x_length, number: itemData[i - 1], oldheight: 0,
                                leftCurves: i == 1 ? null : source.CurvesArr[i - 2][j]
                            }, source.CurvesOptions[j]);
                            var curves = new Curves(_option2);
                            curves.x = curves.x_length * i + self.space[3];
                            curves.x = parseInt(curves.x);
                            arr.push(curves);
                            curvesArr.push(curves);
                            self.cylinderLayer.addChild(curves);
                        }
                        source.CurvesArr.push(arr);
                    } else {
                        for (var j = 0; j < source.data.dataForCurves.length; j++) {
                            var itemData = source.data.dataForCurves[j];
                            var trueHeight2 = (itemData[i - 1] / _max_y) * (y_length);
                            var curves = source.CurvesArr[i - 1][j];
                            curves._height = trueHeight2 - (itemData[i - 1] / _max_y);
                            curves.number = itemData[i - 1];
                            curves.setView();
                            curvesArr.push(curves);
                        }
                    }
                }
            }

            var _wid = 0;
            if (self.isShowBottom) {
                if (source.data.dataForCylinder) {
                    bottomPanel.addChild(tool.createSprite({}, function () {
                        this.graphics.drawRect(1, self.borderColor, [0, 0.5, 20.5, 10], true, cylinder.canvasGradient);
                        this.rotate = 180;
                        this.x += this.getWidth(); this.y += this.getHeight() + 2;
                    }));
                    bottomPanel.addChild(tool.createText(cylinder.bottomName, { size: 10 }, function () { this.x = 25; }));
                }
                if (source.data.dataForCurves) {
                    for (var j = 0; j < source.data.dataForCurves.length; j++) {
                        bottomPanel.addChild(tool.createSprite({}, function () {
                            this.graphics.drawLine(1, curvesArr[j].borderColor, [0, 7, 30, 7]);
                            this.graphics.drawArc(0, "#000000", [16, 7, 3, 0, 2 * Math.PI], true, curvesArr[j].borderColor);
                            this.x += bottomPanel.getWidth() + 10;
                            this.addChild(tool.createText(curvesArr[j].bottomName, { size: 10 }, function () { this.x = 35; }));
                        }));
                    }
                }
            }
        }));
        if (self.isShowBottom) {
            self.panelLayer.addChild(bottomPanel);
            bottomPanel.align(self.panelLayer); 
            bottomPanel.y = self.h - 14;
        }
    }
    //数据源
    function Source(CylinderOption, CurvesOptions, data) {
        this.data = data;
        //this.data = { axis_x: ['x1', 'x2', 'x3', 'x4', 'x5', 'x6'], dataForCylinder: [3, 8, 7, 6, 9], dataForCurves: [[3, 8, 7, 6, 9, 16]] }
        this.CylinderOption = {};//圆柱配置
        this.CurvesOptions = {};//曲线配置
        this.CylinderArr = [];//圆柱容器
        this.CurvesArr = [];//圆柱容器
        this.CylinderOption = CylinderOption;
        this.CurvesOptions = CurvesOptions;
        this.CylinderArr = [];
        this.CurvesArr = [];
    }

    Araph.prototype.bottomName = "图像名称";
    Araph.prototype.x = 0;
    Araph.prototype.y = 0;
    Araph.prototype.isShowNumber = false;//是否显示数字
    Araph.prototype.number = "20";
    Araph.prototype.numberColor = "#333";//数字颜色
    Araph.prototype.borderColor = "#333";//曲线颜色
    Araph.prototype.numberPostion = "out";//in
    Araph.prototype._height = 50; //Y轴高度
    Araph.prototype.oldheight = 0;//原始高度
    Araph.prototype.speed = 3;//动作速度
    Araph.prototype.x_length = 30;//X轴每个刻度的量
    //形状父类
    function Araph(_option) {
        base(this, LSprite, []);
        var self = this;
        self.option = $.extend({}, _option || {});
        for (var i in Araph.prototype) {
            for (var j in _option) { if (i == j) self[i] = _option[j]; }
        }
    }
    //圆柱
    function Cylinder(_option) {
        base(this, Araph, [_option]);
        var self = this;
        self.isShowNumber = true;
        self.canvasGradientColor = _option.canvasGradientColor || ["#196599", "#fff"];
        var canvasGradient = LGlobal.canvas.createLinearGradient(0, 0, 20, 0);
        canvasGradient.addColorStop(1, self.canvasGradientColor[0]);
        canvasGradient.addColorStop(0, self.canvasGradientColor[1]);
        self.canvasGradient = canvasGradient;
        self.bottomName = _option.bottomName || "柱体名";
        self.setView();
    }
    Cylinder.prototype.preWidth = 0.7;//刻度的百分比
    Cylinder.prototype.setView = function () {
        var self = this;
        var h = self.oldheight;
        if (h > self._height) { self.speed = Math.abs(self.speed) * -1; } else { self.speed = Math.abs(self.speed); }
        var t = setInterval(function () {
            if (Math.abs(h - self._height) > Math.abs(self.speed)) {
                h += self.speed;
            } else { self.oldheight = h = self._height; }
            self.graphics.clear();
            self.graphics.drawRect(1, self.borderColor, [0, 0.5, parseInt(self.x_length * self.preWidth), h], true, self.canvasGradient);
            if (self.isShowNumber) {
                self.removeAllChild();
                self.addChild(tool.createSprite({}, function () {
                    var txt = tool.createText(self.number, { x: 0, y: 0, size: 12, color: self.numberColor });
                    this.addChild(txt);
                    txt.x = -(self.x_length * self.preWidth + txt.getWidth()) / 2;
                    if (self.numberPostion == "in") { txt.y -= h; } else { txt.y -= h + 15; }
                    this.rotate = 180;
                }));
            }
            if (h == self._height) { clearInterval(t); }
        }, 30);
        self.rotate = 180;
    }
    //曲线
    function Curves(_option) {
        base(this, Araph, [_option]);
        var self = this;
        self.isRun = false;
        self.runHeight = _option.runHeight;
        self.leftCurves = _option.leftCurves;
        self.isShowNumber = _option.isShowNumber ? true : false;
        self.bottomName = _option.bottomName || "曲线名";
        self.setView();
    }
    Curves.prototype.setView = function () {
        var self = this;
        var h = self.oldheight;
        if (h > self._height) { self.speed = Math.abs(self.speed) * -1; } else { self.speed = Math.abs(self.speed); }
        var t = setInterval(function () {
            self.isRun = true;
            if (Math.abs(h - self._height) > Math.abs(self.speed)) {
                h += self.speed;
            } else { self.oldheight = h = self._height; }
            self.graphics.clear();
            //console.log(self.borderColor);
            self.graphics.drawArc(0, "#000000", [0, -h, 3, 0, 2 * Math.PI], true, self.borderColor);
            if (self.isShowNumber) {
                self.removeAllChild();
                self.addChild(tool.createSprite({}, function () {
                    var txt = tool.createText(self.number, { x: 0, y: 0, size: 12, color: self.numberColor });
                    this.addChild(txt);
                    txt.x = -txt.getWidth() / 2;
                    if (self.numberPostion == "in") { txt.y -= h - 5; } else { txt.y -= h + 15; }
                }));
            }
            //console.log(self.borderColor);
            if (self.leftCurves) { self.graphics.drawLine(1, self.borderColor, [-self.x_length, -self.leftCurves.runHeight, 0, -h]); }
            if (h == self._height) {
                if (self.leftCurves) {
                    if (!self.leftCurves.isRun) {
                        clearInterval(t);
                    }
                } else {
                    clearInterval(t);
                }
                self.isRun = false;
            }
            self.runHeight = h;
        }, 30);
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
            sprite.addChild(new LBitmap(new LBitmapData(global.imglist["number" + self.sharpType + "_" + num])));
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
    return {
        init: function () {
            //return LInit(30, "canvas", 640, 960, main, LEvent.INIT);
            LInit(30, "canvas_vp", 1200, 650, main, LEvent.INIT);
        },
        removeAll: function () {
            if (LGlobal.frameRate) window.clearInterval(LGlobal.frameRate);
            if (backLayer) {
                backLayer.removeAllChild();
                eventBackLayer.die();
                backLayer.die();
            }
        }
    }
})({});

module.exports = Result;