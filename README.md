# Selectables

Select html elements in webpage with dragging like on computer's desktop.

Simple and lightweight pure javascript implementation without external lib dependancies.

Created in effort to drop code size and dependancy on jquery && jquery.ui for small projects.

## Usage:

``` js 

dr = new Selectables({
      zone:'#div',
      elements: 'td',
      enabled: true, 
      onSelect:function(element){
          element.classList.add('selected');
      }
      stop: function (event) {
          console.log(document.getElementsByClassName(dr.options.selectedClass).length + " elements selected");
      }
});
 
 
//later
dr.enable();
 
// disable
dr.disable();

// set options
dr.options.key='altKey';
```
##Options and Callbacks:

``` js
{
    zone: "#wrapper",               // Element that contains selectable items
    elements: "td",                 // Selectables
    debug: true,                    // print some info in console

    onSelect: null,                 // callback on each selected element //function(element){}
    onDeselect: null,               //callback on each deselected element

    start:null,                     //event trigered on start
    stop:null                       //event trigered on end ,function(event){}

    selectedClass: 'selected',      // class for selected elements
    
    key: 'altKey',                  //'altKey'//altKey,ctrlKey,metaKey,false  - When false, works without modifier key.

    moreUsing: 'shiftKey',          //altKey,ctrlKey,metaKey          - allows to expand selection with more than one drag                    action. 

    enabled: true                   //false to .enable() at later time  - .
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
