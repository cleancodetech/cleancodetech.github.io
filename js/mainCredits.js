window.onload = initFunc;

function initFunc() {
    
    createCopyright();
    
    align();
    
}

function align() {
    
    var boxes = document.querySelectorAll('.box');
    
    for ( i = 0; i < boxes.length ; ++i ) {
        
        boxes[ i ].firstElementChild.style.lineHeight = boxes[ i ].offsetHeight + 'px';
        
    }
    
};