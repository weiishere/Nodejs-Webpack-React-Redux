'user strict'

var result = function () {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var customMothed = function () { }
    var isMoveStart = false;
    var isFallDownStart = false;
    var activeModelType = 1;
    var activeModel = [];
    var timer;

    var setting = {
        start_x: 0,
        start_y: 0,
        diaStart_x: 5,
        diaStart_y: 5,
        cellWidth: 20,
        lineCount: 20,
        rowCount: 32,
        diaFillStyle: "red",
        diaBorderStyle: "#ffffff",
        speed: 4,
    }
    Array.prototype.indexOf = function (val) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == val) return i;
        }
        return -1;
    }
    Array.prototype.remove = function (val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    }

    //工具类
    var tool = {
        clone: function (Obj) {
            var buf;
            if (Obj instanceof Array) {
                buf = [];  //创建一个空的数组 
                var i = Obj.length;
                while (i--) {
                    buf[i] = this.clone(Obj[i]);
                }
                return buf;
            } else if (Obj instanceof Object) {
                buf = {};  //创建一个空对象 
                for (var k in Obj) {  //为这个对象添加新的属性 
                    buf[k] = this.clone(Obj[k]);
                }
                return buf;
            } else {
                return Obj;
            }
        },
        getRedom: function (maxNum) {
            var result = parseInt(Math.random() * 10) + 1;
            while (result > maxNum) {
                result = parseInt(Math.random() * 10) + 1;
            }
            return result;
        }
    }

    //var rows = new Array(setting.lineCount);

    //方块管理类
    var DiaManager = (function () {
        var rows = new Array(setting.lineCount);
        for (var i = 0; i < setting.lineCount; i++) {
            rows[i] = new Array(setting.rowCount);
        }
        var back = new Object();
        back.add = function (_x, _y, obj) {
            _x--; _y--;
            DiaManager.diaList[_x][_y] = obj;
        }
        back.get = function (_x, _y) {
            _x--; _y--;
            return DiaManager.diaList[_x][_y];
        }
        back.remove = function (_x, _y) {
            _x--; _y--;
            DiaManager.diaList[_x][_y] = null;
        }
        back.diaList = rows;
        back.dissolve = function (y_arr) {
            var disCount = 0;
            window.clearInterval(timer);
            customMothed = function () {
                if (disCount == setting.lineCount) {

                    //新开一个全数组
                    var newDiaArr = new Array(setting.lineCount);
                    for (var i = 0; i < setting.lineCount; i++) {
                        newDiaArr[i] = new Array(setting.rowCount);
                    }
                    var arr = tool.clone(DiaManager.diaList);
                    for (var i = 0, _length = arr.length; i < _length; i++) {
                        var dissolveCount = y_arr.length;
                        var arr2 = arr[i];
                        for (var j = 0, _length2 = arr2.length; j < _length2; j++) {
                            if (y_arr.indexOf(j) != -1) {
                                dissolveCount--;
                            }
                            if (arr2[j]) {
                                newDiaArr[i][j + dissolveCount] = tool.clone(arr2[j]);
                            }
                            DiaManager.remove(i + 1, j + 1);
                            var dia2 = DiaManager.get(i + 1, j + 1);
                            //alert((i + 1) + "===" + dia2 + "==" + (j + 1));
                        }
                    }
                    DiaManager.diaList = tool.clone(newDiaArr);
                    //alert("cr3");
                    //gameManager.createDia();
                    gameManager.setTimer();
                    customMothed = function () { }
                    return;
                }
                disCount++;
                for (var i = 0; i < y_arr.length; i++) {
                    //alert(disCount+"==="+y_arr[i]);
                    DiaManager.remove(disCount, y_arr[i]);
                }
            }
        }
        back.checkDissolve = function () {
            var y_arr = []; var y_arr2 = [];
            for (var i = 0; i < 4; i++) {
                if (y_arr.indexOf(activeModel[i].y) == -1) {
                    y_arr.push(activeModel[i].y);
                }
            }
            for (var i = 0; i < y_arr.length; i++) {
                var isDissolve = true;
                for (var j = 1; j <= setting.lineCount; j++) {
                    var dia = this.get(j, y_arr[i]);
                    if (!dia) {
                        isDissolve = false;
                        break;
                    }
                }
                if (isDissolve)
                    y_arr2.push(y_arr[i]);
            }
            if (y_arr2.length != 0) {
                this.dissolve(y_arr2);
                activeModel = [];
                return true;
            }
            return false;
        }
        back.clearActiveModel = function (dias) {
            var _dias = dias || activeModel;
            for (var i = 0; i < 4; i++) {
                DiaManager.remove(_dias[i].x, _dias[i].y);
            }
        }
        return back;
    })();
    //单个方块类
    var Dia = function (_x, _y, _color) {
        this.x = _x || 1;
        this.y = _y || 1;
        this.con_x = 0;
        this.con_y = 0;
        var radom = parseInt(tool.getRedom(6));
        this.color = _color || ["yellow", "red", "blue", "green", "gray", "purple"][radom - 1];
    }
    //方块模型生成器
    var DiasModelFactory = {
        createModel: function (index, color) {
            var activeModel = new Array();
            var begin_x = parseInt(setting.lineCount / 2);
            switch (index) {
                case 1://坨坨形状
                    activeModel[0] = new Dia(begin_x, 1, color);
                    activeModel[1] = new Dia(begin_x + 1, 1, color);
                    activeModel[2] = new Dia(begin_x, 2, color);
                    activeModel[3] = new Dia(begin_x + 1, 2, color);
                    break;
                case 2://L形状
                    activeModel[0] = new Dia(begin_x, 1, color);
                    activeModel[1] = new Dia(begin_x, 2, color);
                    activeModel[2] = new Dia(begin_x, 3, color);
                    activeModel[3] = new Dia(begin_x + 1, 3, color);
                    break;
                case 3://反L形状
                    activeModel[0] = new Dia(begin_x, 1, color);
                    activeModel[1] = new Dia(begin_x, 2, color);
                    activeModel[2] = new Dia(begin_x, 3, color);
                    activeModel[3] = new Dia(begin_x - 1, 3, color);
                    break;
                case 4://条形状
                    activeModel[0] = new Dia(begin_x, 1, color);
                    activeModel[1] = new Dia(begin_x, 2, color);
                    activeModel[2] = new Dia(begin_x, 3, color);
                    activeModel[3] = new Dia(begin_x, 4, color);
                    break;
                case 5://凸形状
                    activeModel[0] = new Dia(begin_x, 1, color);
                    activeModel[1] = new Dia(begin_x, 2, color);
                    activeModel[2] = new Dia(begin_x - 1, 2, color);
                    activeModel[3] = new Dia(begin_x + 1, 2, color);
                    break;
                case 6://左板凳形状
                    activeModel[0] = new Dia(begin_x, 1, color);
                    activeModel[1] = new Dia(begin_x, 2, color);
                    activeModel[2] = new Dia(begin_x + 1, 2, color);
                    activeModel[3] = new Dia(begin_x + 1, 3, color);
                    break;
                case 7://右板凳形状
                    activeModel[0] = new Dia(begin_x + 1, 1, color);
                    activeModel[1] = new Dia(begin_x + 1, 2, color);
                    activeModel[2] = new Dia(begin_x, 2, color);
                    activeModel[3] = new Dia(begin_x, 3, color);
                    break;
            }
            return activeModel;
        }
    };

    //移动控制
    var moveManager = {
        move: function (_dias, _dias2, order) {
            if (isMoveStart) {
                return;
            }
            //isMoveStart = true;
            var copyDia = tool.clone(_dias2);
            var dias2 = copyDia.sort(function (a, b) { return a.x - b.x });
            var max = dias2.pop().x;
            var min = dias2.shift().x;

            //到最下
            //var max_x = tool.clone(_dias2).sort(function (a, b) { return a.x - b.x }).pop().x;
            var bottomDia = tool.clone(_dias).sort(function (a, b) { return a.y - b.y }).pop();
            if ((bottomDia.y + 1) == setting.rowCount) {
                //alert("到底了");
                if (!DiaManager.checkDissolve()) {
                    gameManager.createDia();
                }
                return;
            }
            //到最左
            if (min <= 0) {
                for (var i = 0; i < 4; i++) {
                    _dias2[i].x += Math.abs(min) + 1;
                }
            }
            //到最右
            if (max > setting.lineCount) {
                for (var i = 0; i < 4; i++) {
                    _dias2[i].x -= Math.abs(max - setting.lineCount);
                }
            }
            DiaManager.clearActiveModel();//首先清除
            //禁止左右下障碍运动
            for (var i = 0; i < 4; i++) {
                var dia = DiaManager.get(_dias2[i].x, _dias2[i].y);
                if (dia != null) {
                    for (var j = 0; j < _dias2.length; j++) {
                        DiaManager.add(_dias[j].x, _dias[j].y, _dias[j]);
                    }
                    if (order == "fall") {
                        //alert("到底了");
                        if (!DiaManager.checkDissolve()) {
                            gameManager.createDia();
                        }
                    }
                    isMoveStart = false;
                    return;
                }
            }
            if (order == "fallDown") {
                for (var i = 0; i < 4; i++) {
                    DiaManager.add(_dias2[i].x, _dias2[i].y, _dias2[i]);
                }
                isMoveStart = false;
                activeModel = _dias2;
                return;
            } else if (order == "rotate") {
                for (var i = 0; i < 4; i++) {
                    DiaManager.add(_dias2[i].x, _dias2[i].y, _dias2[i]);
                }
                isMoveStart = false;
                activeModel = _dias2;
                return;
            }
            for (var i = 0; i < 4; i++) {
                _dias[i].con_x = (_dias[i].x - 1) * setting.cellWidth;
                _dias[i].con_y = (_dias[i].y - 1) * setting.cellWidth;
                _dias2[i].con_x = (_dias2[i].x - 1) * setting.cellWidth;
                _dias2[i].con_y = (_dias2[i].y - 1) * setting.cellWidth;
            }

            customMothed = function () {
                isMoveStart = true;
                var isStop = true;
                for (var i = 0; i < 4; i++) {
                    var stepPx = _dias2[i].x - _dias[i].x < 0 ? -setting.speed : setting.speed;
                    if (_dias2[i].x == _dias[i].x) { stepPx = 0; } if (Math.abs(_dias2[i].x - _dias[i].x) == 2) { stepPx = stepPx * 2; }
                    var stepPy = _dias2[i].y - _dias[i].y < 0 ? -setting.speed : setting.speed;
                    if (_dias2[i].y == _dias[i].y) { stepPy = 0; } if (Math.abs(_dias2[i].y - _dias[i].y) == 2) { stepPy = stepPy * 2; }
                    if (_dias[i].con_x != _dias2[i].con_x) { _dias[i].con_x += stepPx; }
                    if (_dias[i].con_y != _dias2[i].con_y) { _dias[i].con_y += stepPy; }
                    draw.drawDia(_dias[i].con_x, _dias[i].con_y, setting.diaFillStyle);
                    if (_dias[i].con_x == _dias2[i].con_x && _dias[i].con_y == _dias2[i].con_y && isStop == true) {
                        isStop = true;
                    } else {
                        isStop = false;
                    }
                }
                if (isStop) {
                    for (var i = 0; i < _dias2.length; i++) {
                        DiaManager.add(_dias2[i].x, _dias2[i].y, _dias2[i]);
                    }
                    isStop = false;
                    //alert("f");
                    isMoveStart = false;
                    activeModel = _dias2.sort(function (a, b) { b.y - a.y; });
                    customMothed = function () { }

                }
            }
        },
        //下落
        fall: function () {
            if (activeModel.length == 0) { return; }
            var newDiaArray = new Array();
            if (activeModel.length == 0) { return; }
            newDiaArray = tool.clone(activeModel);
            for (var i = 0; i < 4; i++) {
                newDiaArray[i].y++;
            }
            moveManager.move(activeModel, newDiaArray, "fall");
        },
        //下落到低
        fallToBottom: function () {
            if (activeModel.length == 0) { return; }
            DiaManager.clearActiveModel();//首先清除
            var heights = [];
            for (var i = 0; i < 4; i++) {
                var height = 0;
                for (var j = activeModel[i].y; j < setting.rowCount; j++) {
                    var dia = DiaManager.get(activeModel[i].x, j);
                    if (dia) {
                        break;
                    } else {
                        height++;
                    }
                }
                heights.push(height);
            }
            var newDiaArray = new Array();
            newDiaArray = tool.clone(activeModel);
            var h = heights.sort(function (a, b) { return a - b }).shift();
            for (var i = 0; i < 4; i++) {
                newDiaArray[i].y += (h - 1);
            }
            moveManager.move(activeModel, newDiaArray, "fallDown");
        },
        goLeft: function () {
            if (activeModel.length == 0) { return; }
            var newDiaArray = new Array();
            newDiaArray = tool.clone(activeModel);
            for (var i = 0; i < 4; i++) {
                newDiaArray[i].x--;
            }
            moveManager.move(activeModel, newDiaArray, "left");
        },
        goRight: function () {
            if (activeModel.length == 0) { return; }
            var newDiaArray = new Array();
            newDiaArray = tool.clone(activeModel);
            for (var i = 0; i < 4; i++) {
                newDiaArray[i].x++;
            }
            moveManager.move(activeModel, newDiaArray, "right");
        },
        //变形方法
        rotate: function (isAuto) {
            if (activeModelType == 1) return;
            var newDiaArray = new Array();
            newDiaArray = tool.clone(activeModel);
            //以2号为基准
            for (var i = 0; i < 4; i++) {
                if (!customMothed) {
                    return;
                }
                if (i == 1)
                    continue;
                //判断方块在2号方块的什么方向
                if (newDiaArray[i].x - newDiaArray[1].x == -1 && newDiaArray[i].y - newDiaArray[1].y == -1) {
                    newDiaArray[i].x += 2;//左上方
                } else if (newDiaArray[i].x - newDiaArray[1].x == 0 && newDiaArray[i].y - newDiaArray[1].y == -1) {
                    newDiaArray[i].x += 1; newDiaArray[i].y += 1;//正上方
                } else if (newDiaArray[i].x - newDiaArray[1].x == 1 && newDiaArray[i].y - newDiaArray[1].y == -1) {
                    newDiaArray[i].y += 2;//右上方
                } else if (newDiaArray[i].x - newDiaArray[1].x == 1 && newDiaArray[i].y - newDiaArray[1].y == 0) {
                    newDiaArray[i].y += 1; newDiaArray[i].x -= 1;//正右方
                } else if (newDiaArray[i].x - newDiaArray[1].x == 1 && newDiaArray[i].y - newDiaArray[1].y == 1) {
                    newDiaArray[i].x -= 2;//右下方
                } else if (newDiaArray[i].x - newDiaArray[1].x == 0 && newDiaArray[i].y - newDiaArray[1].y == 1) {
                    newDiaArray[i].x -= 1; newDiaArray[i].y -= 1;//正下方
                } else if (newDiaArray[i].x - newDiaArray[1].x == -1 && newDiaArray[i].y - newDiaArray[1].y == 1) {
                    newDiaArray[i].y -= 2; //左下方
                } else if (newDiaArray[i].x - newDiaArray[1].x == -1 && newDiaArray[i].y - newDiaArray[1].y == 0) {
                    newDiaArray[i].x += 1; newDiaArray[i].y -= 1; //正左方
                } else if (newDiaArray[i].x - newDiaArray[1].x == -2 && newDiaArray[i].y - newDiaArray[1].y == 0) {
                    newDiaArray[i].x += 2; newDiaArray[i].y -= 2; //正左方2单位
                } else if (newDiaArray[i].x - newDiaArray[1].x == 2 && newDiaArray[i].y - newDiaArray[1].y == 0) {
                    newDiaArray[i].x -= 2; newDiaArray[i].y += 2; //正右方2单位
                } else if (newDiaArray[i].x - newDiaArray[1].x == 0 && newDiaArray[i].y - newDiaArray[1].y == 2) {
                    newDiaArray[i].x -= 2; newDiaArray[i].y -= 2; //正下方2单位
                } else if (newDiaArray[i].x - newDiaArray[1].x == 0 && newDiaArray[i].y - newDiaArray[1].y == -2) {
                    newDiaArray[i].x += 2; newDiaArray[i].y += 2; //正上方2单位
                }
            }
            var _dia = activeModel;
            var _dia2 = newDiaArray;
            moveManager.move(_dia, _dia2, isAuto);
        }
    }
    //绘制类
    var draw = {
        createDia: function (con_x, con_y, color) {
            var dia = new Dia(con_x, con_y, color);

        },
        map: function () {
            context.clearRect(0, 0, 510, 630);
            var arr = DiaManager.diaList;
            for (var i = 0, _length = arr.length; i < _length; i++) {
                var arr2 = arr[i];
                for (var j = 0, _length2 = arr2.length; j < _length2; j++) {
                    if (arr2[j])
                        this.drawDia(i * setting.cellWidth, j * setting.cellWidth, setting.diaFillStyle);
                }
            }
            customMothed();
        },
        getCon: function () {
            canvas = document.getElementById("canvas");
            if (canvas.getContext) { //检测浏览器是否兼容
                return canvas.getContext("2d");
            }
            return null;
        },
        drawDia: function (x, y, style) {
            var canvas = this.getCon();
            canvas.fillStyle = style; //等同于fillStyle="rgba(46,129,206,1)";
            canvas.strokeStyle = setting.diaBorderStyle;
            canvas.lineWidth = 2;
            canvas.fillRect(x, y, setting.cellWidth, setting.cellWidth); //填充的四个参数(x,y,width,height)
            canvas.strokeRect(x, y, setting.cellWidth, setting.cellWidth); //线的四个参数(x,y,width,height)
        }
    }
    //游戏管理类
    var gameManager = {
        begin: function (fps) {
            this.setTimer();
            this.mainTimer = window.setInterval(function () { draw.map(); }, 1000 / fps);
            var bindKey = function (event) {
                gameManager.keyAction(event.keyCode);
            }
            document.getElementsByTagName('body')[0].removeEventListener('keydown', bindKey);
            document.getElementsByTagName('body')[0].addEventListener('keydown', bindKey);
        },
        clear: function () {
            if (this.mainTimer) {
                window.clearInterval(this.mainTimer);
                DiaManager.clearActiveModel();
            }
        },
        setTimer: function () {
            this.createDia();
            timer = window.setInterval(function () {
                moveManager.fall();
            }, 500);
        },
        keyAction: function (keyCode) {
            let keyCodeNum = keyCode;
            if (keyCodeNum == 37) {

                moveManager.goLeft();
            }
            else if (keyCodeNum == 39) {
                moveManager.goRight();
            }
            else if (keyCodeNum == 40) {//下落
                moveManager.fallToBottom();
            }
            else if (keyCodeNum == 38) {
                moveManager.rotate();
            }
            else if (keyCodeNum == 32 || keyCodeNum == 83) {
                //if (timer != null) {
                //    window.clearTimeout(timer);//下落时钟停止
                //    moveDown();
                //    window.clearTimeout(timer);//下落时钟停止
                //}
                //else {
                //    moveDown();
                //}
                moveManager.fallToBottom();
            }
            else if (keyCodeNum == 13) {
                //begin();
            }
        },
        createDia: function () {
            activeModelType = tool.getRedom(7);
            activeModel = DiasModelFactory.createModel(activeModelType, "red");
            for (var i = 0; i < activeModel.length; i++) {
                DiaManager.add(activeModel[i].x, activeModel[i].y, activeModel[i]);
            }
            var rotateTime = tool.getRedom(5) - 1;
            for (var i = 0; i < rotateTime; i++) {
                moveManager.rotate("rotate");
            }
        }
    }
    return gameManager;
    //gameManager.begin(60); //开始游戏

};

module.exports = function () {
    return result();
};

