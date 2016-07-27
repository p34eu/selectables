# Selectables

Select html elements in webpage with dragging like on computer's desktop. 

Simple and lightweight pure javascript implementation without external lib dependancies.

Created in effort to drop code size and dependancy on jquery && jquery.ui for small projects.


## <a href="https://jsfiddle.net/ovzxm6mt/53/" target="_blank">Demo</a>

## Usage:

``` js 

dr = new Selectables({
      zone:'#div',
      elements: 'td',     
      onSelect:function(element){
         console.log(element)
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

``` js
{
    // root element whith selectables.
    zone: "#wrapper",

    //  items to be selectable .list-group, #id > .class,'htmlelement' - valid querySelectorAll
    elements: "li",

    // class name to apply to seleted items        
    selectedClass: 'active',

    //  event on selection start        
    start: function (e) {
        this.selectables.m('Starting selection on ' + this.elements + ' in ' + this.zone);
    },

    // event on selection end        
    stop: function (e) {
        this.selectables.m('Finished selecting   ' + this.elements + ' in ' + this.zone);
    },

    // event fired on every item when selected.
    onSelect: function (el) {
        console.log(el)
        this.selectables.m('onselect', el);
    },

    // event fired on every item when selected.
    onDeselect: function (el) {
        this.selectables.m('ondeselect', el);
    },

    // activate using optional key
    key: false, //'altKey,ctrlKey,metaKey,false   

    // add more to selection
    moreUsing: 'shiftKey', //altKey,ctrlKey,metaKey

    //false to .enable() at later time   

    enabled: true,

    debug: true, //print some info in browser console
}
```
## Example usage

Toggle multiple  checkboxes in list

``` js
onSelect: function (el) {
    el.querySelector('input').setAttribute('checked', 'checked');
},
onDeselect: function (el) {
    el.querySelector('input').removeAttribute('checked');
}
                    
```
## Notes

1. Multiple instances on different zones and items are possible, but it is good to enable them only when needed.

2. When selecting, "noselect" class  gets applied  to the zone, to avoid unwanted text selections.


