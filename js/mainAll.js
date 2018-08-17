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

function initialArrange() {
    
    var width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;

    if ( width < 1141 ) {
        
        var height = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;
    
        var allowedWidth = Math.floor( width * 0.98 );
        
        var heightTaken = document.getElementById('header').offsetHeight;
        
        var heightAllowed = Math.floor( height - heightTaken - ( height * 0.03 ) );
        
        var dragHeight = Math.floor( heightAllowed * 0.98 );
        var dragWidth = Math.floor( allowedWidth * 0.66 );
        
        var uploadHeight = Math.floor( heightAllowed * 0.48 );
        var uploadWidth = Math.floor( allowedWidth * 0.31 );
        
        document.getElementById("box").style.width = allowedWidth + "px";
        document.getElementById("box").style.height = heightAllowed + "px";
        
        document.getElementById("drag").style.width = dragWidth + "px";
        document.getElementById("drag").style.height = dragHeight + "px";
        
        document.getElementById("upload").style.width = uploadWidth + "px";
        document.getElementById("upload").style.height = uploadHeight + "px";
        
        document.getElementById("url").style.width = uploadWidth + "px";
        document.getElementById("url").style.height = uploadHeight + "px";
        
    } else {

        var vw = Math.floor( width / 100 );

        var allowedWidth = Math.floor( width - rightVoid - ( 4 * vw ) );

        if ( allowedWidth > 950 ) { allowedWidth = 950; }

        var leftMargin = Math.floor( ( width - rightVoid - allowedWidth ) / 2 );

        while ( leftMargin < ( 4 * vw ) ) {

            allowedWidth = allowedWidth - 1;

            leftMargin = Math.floor( ( width - rightVoid - allowedWidth ) / 2 );

        }

    //    var sidebarHeight = Math.floor( sidebarElemens *  );

        document.getElementById("box").style.width = allowedWidth + "px";
        document.getElementById("box").style.left = leftMargin + "px";
        document.getElementById("drag").style.left = 0;
        document.getElementById("url").style.top = 0;
        document.getElementById("upload").style.bottom = 0;
        
    }
    
}