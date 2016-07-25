
/* 
Selectables
v. 1.0.4
https://github.com/p34eu/Selectables.git 
*/

"use strict";

function Selectables(opts) {

    var defaults = {
        zone:           "#wrapper",           // element that contain selectables.
        elements:       "li",             //  .list-group, #id > .class,'htmlelement' - valid querySelectorAll
        selectedClass: 'selected',  //  just class name without the dot

        start:          null,                //  event on dragstart
        stop:           null,                 // event on dragend

        onSelect:       null,
        onDeselect:     null,

        key:            'altKey',              //'altKey,ctrlKey,metaKey,false      
        moreUsing:      'shiftKey',      //altKey,ctrlKey,metaKey

        enabled:        true,              //false to .enable() at later time            
        debug:          false,               //print some info in browser console
    };

    var extend = function extend(a, b) {
        for (var prop in b) {
            a[prop] = b[prop];
        }
        return a;
    };


    var foreach = function (items, callback, scope) {
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

    this.options    = extend(defaults, opts || {});    
    this.x          = false;
    this.y          = false;
    this.on         = false;
    var self        = this;

    this.enable = function () { //console.trace(this.options);
        if (this.on) {
            console.error(this.constructor.name + ":: is alredy enabled");
            return;
        }
        var zone = document.querySelector(this.options.zone);
        if (!zone) {
            console.error(this.constructor.name + ":: no zone defined in options" + document.readyState + this.name);
            return;
        }
        document.querySelector(this.options.zone).addEventListener('mousedown', self.rectOpen);
        this.on = true;
        return this;
    };
    this.disable = function () {
        this.on = false;
        document.querySelector(this.options.zone).removeEventListener('mousedown', self.rectOpen);
        return this;
    };
    var offset = function (el) {
        var r = el.getBoundingClientRect();
        return { top: r.top + document.body.scrollTop, left: r.left + document.body.scrollLeft }
    };
    this.rectOpen = function (e) {
        if (self.options.key && !e[self.options.key]) {
            return;
        }
        self.options.start && self.options.start();
        document.querySelector(self.options.zone).addEventListener('mousemove', self.rectDraw);
        window.addEventListener('mouseup', self.select);
        document.body.classList.add('noselect');
        this.x = e.pageX;
        this.y = e.pageY;
        if (!rb()) {
            var gh = document.createElement('div');
            gh.id = 'rectBox';
            gh.innerHTML = '<span></span>';
            gh.style.left = Math.min(e.pageX, this.x) + 'px';
            gh.style.top = Math.min(e.pageY, this.y) + 'px';
            document.body.appendChild(gh);
        }
    };
    var rb = function () {
        return document.getElementById('rectBox');
    }
    this.cross = function (a, b) {
        var aTop = offset(a).top, aLeft = offset(a).left, bTop = offset(b).top, bLeft = offset(b).left; return !(((aTop + a.offsetHeight) < (bTop)) || (aTop > (bTop + b.offsetHeight)) || ((aLeft + a.offsetWidth) < bLeft) || (aLeft > (bLeft + b.offsetWidth)));
    };
    this.m = function (m) {
        if (this.options.debug) {
            console.log(this.constructor.name + " :: " + m);
        }
    };
    this.select = function (e) {
        self.m('checking for selected ' + self.options.elements + ' in ' + self.options.zone);
        self.x = self.y = false;
        var a = rb();
        if (!a) {
            return;
        }
        foreach(document.querySelectorAll(self.options.zone + ' ' + self.options.elements), function (el) {
            if (self.cross(a, el) === true) {
                el.classList.add(self.options.selectedClass);
                self.options.onSelect && self.options.onSelect(el);
            } else {
                if (self.options.moreUsing && e[self.options.moreUsing]) {
                    el.classList.remove(self.options.selectedClass); self.options.onDeselect && self.options.onDeselect(el);
                }
            }
        });
        a.parentNode.removeChild(a);
        document.body.classList.remove('noselect');
        window.removeEventListener('mouseup', self.select);
        document.querySelector(self.options.zone).removeEventListener('mousemove', self.rectDraw);
        self.options.stop && self.options.stop();
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

    if (this.options.enabled) {
        return this.enable();
    }
    return this;
}
/*
document.addEventListener('DOMContentLoaded', function () {
    ar = new Selectables({
        elements: 'td',
        enabled: true, 
        stop: function () {
            console.log(document.getElementsByClassName(ar.options.selectedClass).length + " elements selected");
        }
    });
});
*/
