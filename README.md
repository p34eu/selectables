# Selectables

Select elements in webpage with mouse.

Simple js without external dependencies. 


## <a href="https://jsfiddle.net/ovzxm6mt/62/" target="_blank">Demo</a>

## Usage:

```js 

dr = new Selectables({
      zone:'#div',
      elements: 'li',     
      onSelect:function(element){
         console.log(element);
      }
});
  
//later
dr.disable();
 
// enable again
dr.enable();

// set options
dr.options.key='altKey';

```
##Options and Callbacks:

```js
{
    // root element whith selectables.
    zone: "#wrapper",

    //  items to be selectable .list-group, #id > .class,'htmlelement' - valid querySelectorAll
    elements: "li",

    // class name to apply to seleted items        
    selectedClass: 'active',

    //  event on selection start        
    start: function (e) {
       console.log('Starting selection on ' + this.elements + ' in ' + this.zone);
    },

    // event on selection end        
    stop: function (e) {
       console.log('Finished selecting   ' + this.elements + ' in ' + this.zone);
    },

    // event fired on every item when selected.
    onSelect: function (el) {
        console.log(el)
       console.log('onselect', el);
    },

    // event fired on every item when selected.
    onDeselect: function (el) {
       console.log('ondeselect', el);
    },

    // activate using optional key
    key: false, //'altKey,ctrlKey,metaKey,false   

    // add more to selection
    moreUsing: 'shiftKey', //altKey,ctrlKey,metaKey

    //false to .enable() at later time   

    enabled: true

}
```
## Example usage

Toggle multiple  checkboxes in list

```js
onSelect: function (el) {
    el.querySelector('input').setAttribute('checked', 'checked');
},
onDeselect: function (el) {
    el.querySelector('input').removeAttribute('checked');
}
                    
```
## Install
```sh
npm install selectables
```
or
```sh
bower install selectables 
```

## Example extension

Custom method declared after selectables.js is loaded.

```js
    Selectables.prototype.selectAll = function () {
        var opt = this.options;
        this.foreach(document.querySelector(opt.zone).querySelectorAll(opt.elements), function (el) {
            if(!el.classList.contains(opt.selectedClass){
                el.classList.add(opt.selectedClass);
                opt.onSelect && opt.onSelect(el);
            }   
        });
    };
```

## Notes

1. Multiple instances on different zones and items are possible, but it is good to enable them only when needed.
 
2. When selecting, "noselect" class  gets applied  to the zone, to avoid unwanted text selections.

 


## Why?
Created in effort to drop code size and dependency on jquery && jquery.ui for small projects.