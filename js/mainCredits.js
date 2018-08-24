window.onload = initFunc;

function initFunc() {
    
    createCopyright();
    
    align();
    
    document.getElementById('menu').addEvent("mouseup", expandMobileMenu, true);    
    document.getElementById('backMobile').addEvent("mouseup", minimizeMobileMenu, true);
    document.getElementById('menu').addEvent("touchstart", expandMobileMenu, true);    
    document.getElementById('backMobile').addEvent("touchstart", minimizeMobileMenu, true);
    
}

function align() {
    
    var boxes = document.querySelectorAll('.box');
    
    for ( i = 0; i < boxes.length ; ++i ) {
        
        boxes[ i ].firstElementChild.style.lineHeight = boxes[ i ].offsetHeight + 'px';
        
    }
    
};