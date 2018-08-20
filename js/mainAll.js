function createCopyright() {
    
    var pElem = document.createElement("P");
    pElem.innerHTML = ( new Date() ).getFullYear() + ' ' + window.location.hostname;
    document.getElementById('copyright').append( pElem );
    
    domain = window.location.hostname;
    
};

function convertHex(hex){
    hex = hex.replace('#','');
    r = parseInt(hex.substring(0,2), 16);
    g = parseInt(hex.substring(2,4), 16);
    b = parseInt(hex.substring(4,6), 16);

    return 'rgb('+r+', '+g+', '+b+')';
}

function convertHexOpacity(hex,opacity){
    hex = hex.replace('#','');
    r = parseInt(hex.substring(0,2), 16);
    g = parseInt(hex.substring(2,4), 16);
    b = parseInt(hex.substring(4,6), 16);

    return'rgba('+r+','+g+','+b+','+opacity+')';
}

function appendElement( args ) {
    
    var elem = document.createElement( args.tag );
    
    if ( args.hasOwnProperty('id') )            { elem.id = args.id; }
    if ( args.hasOwnProperty('title') )         { elem.setAttribute("title", args.title ); }
    if ( args.hasOwnProperty('class') )         { elem.setAttribute("class", args.class ); }
    if ( args.hasOwnProperty('type') )          { elem.setAttribute("type", args.type ); }
    if ( args.hasOwnProperty('min') )           { elem.setAttribute("min", args.min ); }
    if ( args.hasOwnProperty('max') )           { elem.setAttribute("max", args.max ); }
    if ( args.hasOwnProperty('step') )          { elem.setAttribute("step", args.step ); }
    if ( args.hasOwnProperty('value') )         { elem.setAttribute("value", args.value ); }
    if ( args.hasOwnProperty('placeholder') )   { elem.setAttribute("placeholder", args.placeholder ); }
    if ( args.hasOwnProperty('text') )          { elem.innerHTML = args.text; }
    
    args.parent.appendChild( elem );
    
    return elem;
    
};

function getClientWidth() {
    
    var width = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;
    
    return width;
    
};

function getClientHeight() {
    
    var height = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;
    
    return height;
    
};




function mobileCloseTouchDown( event ) {
    
    event.preventDefault();
    
    var width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;

    if ( width > 1140 ) { return false; }
    
    event.target.style.boxShadow = '0 0 5vh rgb(235, 127, 127) inset';
    
};

function mobileCloseTouchUp( event ) {
    
    event.preventDefault();
    
    var width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;

    if ( width > 1140 ) { return false; }
    
    event.target.style.boxShadow = '';
    
    event.target.parentElement.classList.remove('revealedMobile');
    event.target.parentElement.classList.add('hiddenMobile');
    
};

function mobileIconTouchDown( event ) {
    
    event.preventDefault();
    
    var width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;

    if ( width > 1140 ) { return false; }
    
    event.target.style.boxShadow = '0 0 5vh rgb(127, 235, 127) inset';
    
};

function mobileIconTouchUp( event ) {
    
    event.preventDefault();
    
    var width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;

    if ( width > 1140 ) { return false; }
    
    event.target.style.boxShadow = '';
    
    var panel = event.target.getAttribute('data-mobilePanel');
    
    document.getElementById( panel ).classList.remove('hiddenMobile');
    document.getElementById( panel ).classList.add('revealedMobile');
    
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
//        var dragWidth = Math.floor( allowedWidth * 0.66 );
        
        document.getElementById("box").style.width = allowedWidth + "px";
        document.getElementById("box").style.height = heightAllowed + "px";
        
        document.getElementById("drag").style.height = dragHeight + "px";
        
        document.getElementById("upload").style.height = dragHeight + "px";
        
        document.getElementById("url").style.height = dragHeight + "px";
        
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

//  BEGIN
//  https://jsfiddle.net/jjwilly16/sd03g4t4/
//
var _wrapLine = function(_line, lineIndex, desiredWidth, reservedSpace) {
    var lineWidth = 0;
    var graphemeLines = [];
    var line = [];
    var words = _line.split(this._reSpaceAndTab);
    var word = '';
    var offset = 0;
    var infix = ' ';
    var wordWidth = 0;
    var infixWidth = 0;
    var largestWordWidth = 0;
    var lineJustStarted = true;
    var additionalSpace = this._getWidthOfCharSpacing();
    reservedSpace = reservedSpace || 0;
    desiredWidth -= reservedSpace;

    var i = 0;
    var wordLength = words.length;

    for (; i < wordLength; i++) {
        word = fabric.util.string.graphemeSplit(words[i]);
        wordWidth = this._measureWord(word, lineIndex, offset);
        offset += word.length;

        if (this.breakWords && wordWidth >= desiredWidth) {
            var e = 0;
            for (; e < word.length; e++) {
                var letter = word[e];
                var letterWidth = this.getMeasuringContext().measureText(letter).width * this.fontSize / this.CACHE_FONT_SIZE;
                if (lineWidth + letterWidth > desiredWidth) {
                    graphemeLines.push(line);
                    line = [];
                    lineWidth = 0;
                }
                line.push(letter);
                offset++;
                lineWidth += letterWidth;
            }
            word = [];
        } else {
            lineWidth += infixWidth + wordWidth - additionalSpace;
        }

        if (lineWidth >= desiredWidth && !lineJustStarted) {
            graphemeLines.push(line);
            line = [];
            lineWidth = wordWidth;
            lineJustStarted = true;
        } else {
            lineWidth += additionalSpace;
        }
        if (!lineJustStarted) {
            line.push(infix);
        }
        line = line.concat(word);
        infixWidth = this._measureWord([
            infix,
        ], lineIndex, offset);
        offset++;
        lineJustStarted = false;
        if (wordWidth > largestWordWidth && !this.breakWords) {
            largestWordWidth = wordWidth;
        }
    }

    if (i) graphemeLines.push(line);
    if (largestWordWidth + reservedSpace > this.dynamicMinWidth) {
        this.dynamicMinWidth = largestWordWidth - additionalSpace + reservedSpace;
    }
    return graphemeLines;
};

var get2DCursorLocation = function(selectionStart, skipWrapping) {
    if (typeof selectionStart === 'undefined') {
        selectionStart = this.selectionStart;
    }
    var lines = skipWrapping ? this._unwrappedTextLines : this._textLines;
    var len = lines.length;
    var i = 0;
    for (; i < len; i++) {
        if (selectionStart <= lines[i].length) {
            return {
                lineIndex: i,
                charIndex: selectionStart,
            };
        }
        selectionStart -= lines[i].length;
        if (lines[i].indexOf(' ') > -1) selectionStart -= 1;
    }
    return {
        lineIndex: i - 1,
        charIndex: lines[i - 1].length < selectionStart ? lines[i - 1].length : selectionStart,
    };
};

fabric.util.object.extend(fabric.Textbox.prototype, {
    _wrapLine: _wrapLine,
    get2DCursorLocation: get2DCursorLocation,
});
//
//  https://jsfiddle.net/jjwilly16/sd03g4t4/
//  END