'use strict';
import './pagerSlider.less';
import $ from 'jquery';

var PageCommon = (function () {
    var result = {};
    //var defaultTransition = "3d";
    //var transition = 300;
    function Page(id, option) {
        var _self = this;
        _self.id = id;
        _self.container = $("#" + id);
        var o = $.extend({
            init: function () { },
            slideBefore: function () { },
            slideAfter: function () { },
            hide: function () { },
            next: function () { }
        }, option || {});
        for (var i in o) { _self[i] = o[i] }
        //touchstart
        $("#" + _self.id).delegate("button[role='back']", "click", function () {
            _self.back();
        }).delegate("button[role='right']", "click", function () {
            _self.next();
        });
        _self.init();
    }
    Page.prototype.show = function (transition, callback) {
        var me = this;
        if (arguments.length == 1) { callback = transition; transition = undefined; }
        var _dt = transition || result.set.defaultTransition;
        $("#" + result.thisPage).addClass("trans-" + _dt + "-a");
        $("#" + me.id).addClass("trans-" + _dt + "-b");
        me.slideBefore();
        window.setTimeout(function () {
            $("#" + result.thisPage).removeClass(function (index, css) {
                return (css.match(/\b(trans|in)-\S+/g) || []).join(' ');
            });
            $("#" + result.thisPage).addClass("out-" + _dt);
            $("#" + me.id).removeClass(function (index, css) {
                return (css.match(/\b(trans|out)-\S+/g) || []).join(' ');
            });
            $("#" + me.id).addClass("in-" + _dt);
            me.slideAfter();
            if (callback) callback.call(me);
            me.back = (function (pa, pb) {
                return function (_callback) {
                    $("#" + pb).addClass("trans-" + _dt + "-a");
                    $("#" + pa).addClass("trans-" + _dt + "-b");
                    $("#" + pb + ",#" + pa).addClass("back");
                    window.setTimeout(function () {
                        $("#" + pb).removeClass("trans-" + _dt + "-a in-" + _dt);
                        $("#" + pb).addClass("out-" + _dt);
                        $("#" + pa).removeClass("trans-" + _dt + "-b out-" + _dt);
                        $("#" + pa).addClass("in-" + _dt);
                        $("#" + pb + ",#" + pa).removeClass("back");
                        result.thisPage = pa;
                        if (_callback) _callback();
                    }, transitionArr[_dt]);
                }
            })(result.thisPage, me.id);
            result.thisPage = me.id;
        }, transitionArr[_dt]);
    }

    result.Page = Page;
    var transitionArr = {};
    transitionArr["slider"] = 300;
    transitionArr["overturn"] = 500;
    transitionArr["zoom"] = 400;
    result.init = function (homePage, option) {
        var _self = this;
        _self.set = $.extend({
            defaultTransition: "slider",
            callback:function(){}
        }, option || {});
        result.thisPage = homePage;
        $("#" + homePage).addClass("in-" + _self.set.defaultTransition);
        window.setTimeout(function(){
            _self.set.callback.call(_self);
        },transitionArr['defaultTransition'])
    }
    return result;
})();

module.exports = PageCommon;