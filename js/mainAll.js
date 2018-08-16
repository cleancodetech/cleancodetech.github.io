function createCopyright() {
    
    var pElem = document.createElement("P");
    pElem.innerHTML = ( new Date() ).getFullYear() + ' ' + window.location.hostname;
    document.getElementById('copyright').append( pElem );
    
    domain = window.location.hostname;
    
};

function expandMobileMenu( event ) {
    
    event.preventDefault();
    
    document.getElementById('environment').style.left = '0';
    
};

function minimizeMobileMenu( event ) {
    
    event.preventDefault();
    
    document.getElementById('environment').style.left = '-90vw';
    
};