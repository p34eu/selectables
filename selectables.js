/*
 *   Selectables    v1.1.16
 *   https://github.com/p34eu/Selectables.git
 */

"use strict";

function Selectables(opts) {

    var defaults = {

        // ID of the element whith selectables.
        zone: "#wrapper",

        //  items to be selectable .list-group, #id > .class,'htmlelement' - valid querySelectorAll
        elements: "a",

        // class name to apply to seleted items
        selectedClass: 'active',

        // activate using optional key
        key: false, //'altKey,ctrlKey,metaKey,false

        // add more to selection
        moreUsing: 'shiftKey', //altKey,ctrlKey,metaKey

        //false to .enable() at later time
        enabled: true,

        //print some info in browser console
        debug: true,
        //  event on selection start
        start: function (e) {
            this.selectables.m('Starting selection on ' + this.elements + ' in ' + this.zone);
        },

        // event on selection end
        stop: function (e) {
            this.selectables.m('Finished selecting  ' + this.elements + ' in ' + this.zone );
            console.log(document.getElementsByClassName('active'))
        },

        // event fired on every item when selected.
        onSelect: function (el) {
            console.log(el)
            this.selectables.m('onselect', el);
        },

        // event fired on every item when selected.
        onDeselect: function (el) {
            this.selectables.m('ondeselect', el);
        }
    };

    var extend = function extend(a, b) {
        for (var prop in b) {
            a[prop] = b[prop];
        }
        return a;
    };

    this.foreach = function (items, callback, scope) {
        if (Object.prototype.toString.call(items) === '[object Object]') {
            for (var prop in items) {
                if (Object.prototype.hasOwnProperty.call(items, prop)) {
                    callback.call(scope, items[prop], prop, items);
                }
            }
        } else {
            for (var i = 0, len = items.length; i < len; i++) {
                callback.call(scope, items[i], i, items);
            }
        }
    }

    this.options = extend(defaults, opts || {});
    this.x = false;
    this.y = false;
    this.on = false;
    var self = this;
    this.enable = function () {
        if (this.on) {
            throw new Error(this.constructor.name + " :: is alredy enabled");
            return;
        }
        this.zone = document.querySelector(this.options.zone);
        if (!this.zone) {
            throw new Error(this.constructor.name + " :: no zone defined in options. Please use element with ID");
        }
        this.items = document.querySelectorAll(this.options.zone + ' ' + this.options.elements);
        this.disable();
        this.zone.addEventListener('mousedown', self.rectOpen);
        this.on = true;
        return this;
    };

    this.disable = function () {
        this.zone.removeEventListener('mousedown', self.rectOpen);
        this.on = false;
        return this;
    };

    var offset = function (el) {
        var r = el.getBoundingClientRect();
        return {top: r.top + document.body.scrollTop, left: r.left + document.body.scrollLeft}
    };

    this.rectOpen = function (e) {
        self.options.start && self.options.start(e);
        if (self.options.key && !e[self.options.key]) {
            return;
        }
        document.body.classList.add('s-noselect');
        if (!e[self.options.moreUsing]) {
            var sc = self.options.selectedClass;
            self.foreach(self.items, function (el) {
                el.classList.remove(sc);
            });
        }
        self.zone.addEventListener('mousemove', self.rectDraw);
        window.addEventListener('mouseup', self.select);
        this.x = e.pageX;
        this.y = e.pageY;
        if (!rb()) {
            var gh = document.createElement('div');
            gh.id = 's-rectBox';
            gh.innerHTML = '<span></span>';
            gh.style.left = Math.min(e.pageX, this.x) + 'px';
            gh.style.top = Math.min(e.pageY, this.y) + 'px';
            document.body.appendChild(gh);
        }
    };

    var rb = function () {
        return document.getElementById('s-rectBox');
    };

    var cross = function (a, b) {
        var aTop = offset(a).top, aLeft = offset(a).left, bTop = offset(b).top, bLeft = offset(b).left;
        return !(((aTop + a.offsetHeight) < (bTop)) || (aTop > (bTop + b.offsetHeight)) || ((aLeft + a.offsetWidth) < bLeft) || (aLeft > (bLeft + b.offsetWidth)));
    };

    this.m = function (m) {
        this.options.debug && window.console && console.log(this.constructor.name + " :: " + m);

    };

    this.select = function (e) {
        var a = rb();
        if (!a) {
            return;
        }
        self.x = self.y = false;
        document.body.classList.remove('s-noselect');
        window.removeEventListener('mouseup', self.select);
        self.zone.removeEventListener('mousemove', self.rectDraw);
        var s = self.options.selectedClass;
        self.foreach(self.items, function (el) {
            if (cross(a, el) === true) {
                if (el.classList.contains(s)) {
                    el.classList.remove(s);
                    self.options.onDeselect && self.options.onDeselect(el);
                } else {
                    el.classList.add(s);
                    self.options.onSelect && self.options.onSelect(el);
                }
            } else {
                console.log(s)
            }
        });
        a.parentNode.removeChild(a);
        self.options.stop && self.options.stop(e);
    }

    this.rectDraw = function (e) {
        var g = rb();
        if (!this.x || g === null) {
            return;
        }
        g.style.width = Math.abs(this.x - e.pageX) + 'px';
        g.style.height = Math.abs(this.y - e.pageY) + 'px';
        if (e.pageX <= this.x && e.pageY >= this.y) {
            g.style.left = e.pageX + 'px';
        } else if (e.pageY <= this.y && e.pageX >= this.x) {
            g.style.top = e.pageY + 'px';
        } else if (e.pageY < this.y && e.pageX < this.x) {
            g.style.left = e.pageX + 'px';
            g.style.top = e.pageY + 'px';
        }
    }

    this.options.selectables = this;
    if (this.options.enabled) {
        return this.enable();
    }
    return this;
}