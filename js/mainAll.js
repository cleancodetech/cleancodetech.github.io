function createCopyright() {
    
    var pElem = document.createElement("P");
    pElem.innerHTML = ( new Date() ).getFullYear() + ' ' + window.location.hostname;
    document.getElementById('copyright').append( pElem );
    
    domain = window.location.hostname;
    
};