window.onload = initFunc;

window.onresize = resizeFunc;

function resizeFunc() {
    
    initialArrange();
    
};

function initFunc() {
    
    rightVoid = 0;
    domain = null;
    sidebarElemens = 5;
    clientWidth = getClientWidth();
    clientHeight = getClientHeight();
    fontsAvail = [ 'Lobster', 'Montserrat', 'Space Mono', 'Open Sans', 'GFS Didot' ];
    
    createCopyright();
    
    initialArrange();
    
    document.getElementById('photoUpload').addEvent("change", photoUploadPreview, true);
    document.getElementById('mobilePhotoUpload').addEvent("change", photoUploadPreview, true);
    
    document.getElementById('photoUrl').addEvent("input", photoDownload, true);
    
    document.getElementById('drag').addEvent("drop", dropFile, true);    
    document.getElementById('drag').addEvent("dragover", dragOver, true);    
    document.getElementById('drag').addEvent("dragenter", dragEnter, true);    
    document.getElementById('drag').addEvent("dragleave", dragLeave, true);
    
    document.getElementById('drag').addEvent("touchstart", mobileIconTouchDown, true);
    document.getElementById('drag').addEvent("touchend", mobileIconTouchUp, true);
    document.getElementById('drag').addEvent("mousedown", mobileIconTouchDown, true);
    document.getElementById('drag').addEvent("mouseup", mobileIconTouchUp, true);
    
    document.getElementById('dragMobileClose').addEvent("touchstart", mobileCloseTouchDown, true);
    document.getElementById('dragMobileClose').addEvent("touchend", mobileCloseTouchUp, true);
    document.getElementById('dragMobileClose').addEvent("mousedown", mobileCloseTouchDown, true);
    document.getElementById('dragMobileClose').addEvent("mouseup", mobileCloseTouchUp, true);
    
    document.getElementById('upload').addEvent("touchstart", mobileIconTouchDown, true);
    document.getElementById('upload').addEvent("touchend", mobileIconTouchUp, true);
    document.getElementById('upload').addEvent("mousedown", mobileIconTouchDown, true);
    document.getElementById('upload').addEvent("mouseup", mobileIconTouchUp, true);
    
    document.getElementById('uploadMobileClose').addEvent("touchstart", mobileCloseTouchDown, true);
    document.getElementById('uploadMobileClose').addEvent("touchend", mobileCloseTouchUp, true);
    document.getElementById('uploadMobileClose').addEvent("mousedown", mobileCloseTouchDown, true);
    document.getElementById('uploadMobileClose').addEvent("mouseup", mobileCloseTouchUp, true);
    
    document.getElementById('url').addEvent("touchstart", mobileIconTouchDown, true);
    document.getElementById('url').addEvent("touchend", mobileIconTouchUp, true);
    document.getElementById('url').addEvent("mousedown", mobileIconTouchDown, true);
    document.getElementById('url').addEvent("mouseup", mobileIconTouchUp, true);
    
    document.getElementById('urlMobileClose').addEvent("touchstart", mobileCloseTouchDown, true);
    document.getElementById('urlMobileClose').addEvent("touchend", mobileCloseTouchUp, true);
    document.getElementById('urlMobileClose').addEvent("mousedown", mobileCloseTouchDown, true);
    document.getElementById('urlMobileClose').addEvent("mouseup", mobileCloseTouchUp, true);
    
    document.getElementById('menu').addEvent("mouseup", expandMobileMenu, true);    
    document.getElementById('backMobile').addEvent("mouseup", minimizeMobileMenu, true);
    document.getElementById('menu').addEvent("touchstart", expandMobileMenu, true);    
    document.getElementById('backMobile').addEvent("touchstart", minimizeMobileMenu, true);
    
    eng = new Engine();
    
}

function photoDownload( event ) {
    
    var img = new Image;
    
    img.onload = function() {
            
        eng.createFromImageUpload( img );
    };
    
    img.src = event.target.value;
    
    event.target.value = '';
    
};

function dropFile( event ) {
    
    console.log('File(s) dropped');

    // Prevent default behavior (Prevent file from being opened)
    event.preventDefault();
    
    var reader = new FileReader();

    reader.onload = function( e ){
        
        var img = new Image;
        
        img.onload = function() {
            
            eng.createFromImageUpload( img );
        };
        
        img.src = reader.result;
        
    };
    
    reader.readAsDataURL(event.dataTransfer.files[0]);
    
};

function dragLeave( event ) {
    
    event.preventDefault();
    
    event.target.style.border = '';
    event.target.style.boxShadow = '';
    event.target.style.backgroundSize = '';
    
};

function dragEnter( event ) {
    
    event.preventDefault();
    
    event.target.style.border = 'dashed 10px white';
    event.target.style.boxShadow = '0 0 5vh rgb(127, 235, 127) inset';
    event.target.style.backgroundSize = '0%';
    
};

function dragOver( event ) {
    
    console.log('File(s) in drop zone'); 

    event.preventDefault();
    
};

function photoUploadPreview( event ) {
    
    var reader = new FileReader();

    reader.onload = function( e ){
        
        var img = new Image;
        
        img.onload = function() {
            
            eng.createFromImageUpload( img );
        };
        
        img.src = reader.result;
        
    };

    reader.readAsDataURL(event.target.files[0]);
    
}