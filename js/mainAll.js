function createCopyright() {
    
    var pElem = document.createElement("P");
    pElem.innerHTML = ( new Date() ).getFullYear() + ' ' + window.location.hostname;
    document.getElementById('copyright').append( pElem );
    
    domain = window.location.hostname;
    
};

function expandMobileMenu() {
    console.log('expand');
    document.getElementById('environment').style.left = '0';
    console.log( document.getElementById('environment') );
};

function minimizeMobileMenu() {
    console.log('minimize');
    document.getElementById('environment').style.left = '-90vw';
    
};