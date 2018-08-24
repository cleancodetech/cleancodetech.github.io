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
    if ( args.hasOwnProperty('accept') )        { elem.setAttribute("accept", args.accept ); }
    
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

Element.prototype.addEvent = function( event, handler, bubbling ) {
    
    if ( this.addEventListener ) {
        
        this.addEventListener( event, handler, bubbling );
        
    } else if ( this.attachEvent ) {
        
        this.attachEvent( 'on' + event, handler, bubbling );
        
    }
    
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




var Engine = function(){
    
    var CopyrightPart = function(){
        
        this.event_mouseoverPanel = function() {
            
            this.textInstance.set( 'selectionBackgroundColor', 'rgba(255, 0, 0, 0.5)' );
                
            _Engine.canvas.setActiveObject( this.textInstance );

            _Engine.canvas.renderAll();
            
        };
        
        this.event_mouseoutPanel = function() {
            
            this.textInstance.set( 'selectionBackgroundColor', 'rgba(255, 0, 0, 0)' );
                
            _Engine.canvas.renderAll();
            
        };
        
        this.event_clickDeleteCopyright = function() {
            
            this.hideDeleteConfirm();

            this.remove();
            
        };
        
        this.event_clickKeepCopyright = function() {
            
            this.hideDeleteConfirm();
                
            this.delIcon.style.backgroundImage = "url('/imgs/sad1.svg')";
            
        };
        
        this.handleEvent = function( event ) {
            
            if ( event.type === 'mouseover' ){
                
                this.event_mouseoverPanel();
                
            } else if ( event.type === 'mouseout' ){
                
                this.event_mouseoutPanel();
                
            } else if ( event.type === 'click' && event.target === this.panelHeaderDelElem ){
                
                this.showDeleteConfirm();
                
            } else if ( event.type === 'touchstart' && event.target === this.panelHeaderDelElem ){
                
                this.showDeleteConfirm();
                
            } else if ( event.type === 'click' && event.target === this.offButton ){
                
                this.event_clickDeleteCopyright();
                
            } else if ( event.type === 'touchend' && event.target === this.offButton ){
                
                this.event_clickDeleteCopyright();
                
            } else if ( event.type === 'click' && event.target === this.onButton ){
                
                this.hideDeleteConfirm();
                
            } else if ( event.type === 'touchend' && event.target === this.onButton ){
                
                this.event_clickKeepCopyright();
                
            }
            
        };
        
        this.hideDeleteConfirm = function() {
            
            this.layer.style.display = 'none';

            this.offButton.removeEventListener( 'click', this, false );
            this.offButton.removeEventListener( 'touchstart', this, false );
            this.offButton.removeEventListener( 'touchend', this, false );
            this.onButton.removeEventListener( 'click', this, false );
            this.onButton.removeEventListener( 'touchstart', this, false );
            this.onButton.removeEventListener( 'touchend', this, false );
            
        };
        
        this.showDeleteConfirm = function() {
            
            this.layer.style.display = 'block';

            this.offButton.addEvent( 'click', this, false );
            this.offButton.addEvent( 'touchstart', this, false );
            this.offButton.addEvent( 'touchend', this, false );
            this.onButton.addEvent( 'click', this, false );
            this.onButton.addEvent( 'touchstart', this, false );
            this.onButton.addEvent( 'touchend', this, false );
            
        };
        
        this.buildCanvasModule = function() {
            
            this.textInstance = new fabric.Textbox( domain, {
                left: 0,
                top: 200,
                width: 110,
                fill: 'rgb(255, 255, 255)',
                fontFamily: 'Montserrat',
                fontSize: Math.floor( ( _Engine.canvasWidth * 15 ) / 970 ),
                editable: false,
                fontWeight: 900,
                hasRotatingPoint: false,
                hasBorders: false,
                hasControls: false,
                lockMovementX: true,
                lockScalingX: true,
                lockScalingY: true,
                breakWords: true,
                textAlign: 'center',
                shadow: new fabric.Shadow("rgba(0,0,0,1) 0px 0px 5px")
            });
            
            this.textInstance.rotate(270);
            
            this.textInstance.set( 'left', -1 );
            
            this.topMargin = Math.floor( ( _Engine.canvasHeight - this.textInstance.width ) / 2 + this.textInstance.width );
            
            this.textInstance.set( 'top', this.topMargin );
            
            this.textInstance.on( 'mouseover', function() {
                
                _CopyrightPart.panelHeaderElem.style.backgroundColor = 'rgb(210, 55, 55)';
                
            });
            
            this.textInstance.on( 'mouseout', function() {
                
                _CopyrightPart.panelHeaderElem.style.backgroundColor = '';
                
            });
            
            _Engine.canvas.add( this.textInstance );
            
        };
        
        this.buildControlPanel = function() {
        
            this.panelElem = appendElement({
                tag: 'DIV',
                class: 'panel',
                parent: _Engine.panelContainerElem
            });
        
            this.panelHeaderElem = appendElement({
                tag: 'DIV',
                class: 'panelHeader',
                parent: this.panelElem
            });
        
            this.panelHeaderIconElem = appendElement({
                tag: 'DIV',
                class: 'panelHeaderCCIcon',
                title: 'Controls the tiny text on the left side of the image',
                parent: this.panelHeaderElem
            });
        
            this.panelHeaderDelElem = appendElement({
                tag: 'DIV',
                class: 'panelHeaderDel',
                title: 'Delete this element from image',
                parent: this.panelHeaderElem
            });
            
            this.panelElem.addEvent( 'mouseover', this, false );
            this.panelElem.addEvent( 'mouseout', this, false );            
            this.panelHeaderDelElem.addEvent( 'click', this, false );
            this.panelHeaderDelElem.addEvent( 'touchstart', this, false );
            
        };
        
        this.remove = function() {
            
            _Engine.canvas.remove( this.textInstance );
            
            this.panelElemNew = this.panelElem.cloneNode(true);
            
            this.panelElem.parentNode.replaceChild( this.panelElemNew, this.panelElem );
            
            while (this.panelElemNew.firstChild) {
        
                this.panelElemNew.removeChild( this.panelElemNew.firstChild );

            }
            
            this.panelElemNew.remove();
            
        };
        
        var _CopyrightPart = this;
        
        this.textInstance;
        this.topMargin;
        
        this.layer = document.getElementById('delCCLayer');
        this.offButton = document.getElementById('delCCdelete');
        this.onButton = document.getElementById('delCCkeep');
        this.delIcon = document.getElementById('delCCIcon');
        
        this.buildControlPanel();
        this.buildCanvasModule();
        
    };
    
    var PartWallpaper = function( args ) {
        
        this.event_clickGrayFilterButton = function() {
            
            this.filterGrayscaleFlag = this.filterGrayscaleFlag * (-1);
                
            this.toggleButtonGrayscale();
            
        };
        
        this.event_clickSepiaFilterButton = function() {
            
            this.filterSepiaFlag = this.filterSepiaFlag * (-1);
                
            this.toggleButtonSepia();
            
        };
        
        this.event_changeBrightness = function() {
            
            this.filterBrightness = this.brightnessRangeElem.value;
            
        };
        
        this.event_clickBrightnessUndo = function() {
            
            this.filterBrightness = 0;
                
            this.brightnessRangeElem.value = 0;
            
        };
        
        this.event_changeBlur = function() {
            
            this.filterBlur = this.blurRangeElem.value;
            
        };
        
        this.event_clickBlurUndo = function() {
            
            this.filterBlur = 0;
                
            this.blurRangeElem.value = 0;
            
        };
        
        this.handleEvent = function( event ) {
            
            if ( event.type === 'touchend' && event.target === this.panelGrayscaleButtonElem ){
                
                this.event_clickGrayFilterButton();
                
            } else if ( event.type === 'click' && event.target === this.panelGrayscaleButtonElem ){
                
                this.event_clickGrayFilterButton();
                
            } else if ( event.type === 'touchend' && event.target === this.panelSepiaButtonElem ){
                
                this.event_clickSepiaFilterButton();
                
            } else if ( event.type === 'click' && event.target === this.panelSepiaButtonElem ){
                
                this.event_clickSepiaFilterButton();
                
            } else if ( event.type === 'input' && event.target === this.brightnessRangeElem ){
                
                this.event_changeBrightness();
                
            } else if ( event.type === 'touchend' && event.target === this.brightnessUndoElem ){
                
                this.event_clickBrightnessUndo();
                
            } else if ( event.type === 'click' && event.target === this.brightnessUndoElem ){
                
                this.event_clickBrightnessUndo();
                
            } else if ( event.type === 'input' && event.target === this.blurRangeElem ){
                
                this.event_changeBlur();
                
            } else if ( event.type === 'touchend' && event.target === this.blurUndoElem ){
                
                this.event_clickBlurUndo();
                
            } else if ( event.type === 'click' && event.target === this.blurUndoElem ){
                
                this.event_clickBlurUndo();
                
            }

            this.reapplyFilters();
            
        };
        
        this.reapplyFilters = function() {
            
            this.imgCanvasInstance.filters = [];
            
            if ( this.filterGrayscaleFlag > 0 ) {
                
                this.imgCanvasInstance.filters.push( new fabric.Image.filters.Grayscale() );
                
            }
            
            if ( this.filterSepiaFlag > 0 ) {
                
                this.imgCanvasInstance.filters.push( new fabric.Image.filters.Sepia() );
                
            }
            
            if ( this.filterBrightness !== 0 ) {
                
                this.imgCanvasInstance.filters.push( new fabric.Image.filters.Brightness({
                    brightness: this.filterBrightness
                }) );
                
            }
            
            if ( this.filterBlur !== 0 ) {
                
                this.imgCanvasInstance.filters.push( new fabric.Image.filters.Blur({
                    blur: this.filterBlur
                }) );
                
            }
            
            this.imgCanvasInstance.applyFilters();
            
            _Engine.canvas.renderAll();
            
        };
        
        this.toggleButtonGrayscale = function() {
            
            if ( this.filterGrayscaleFlag > 0 ) {
                
                this.panelGrayscaleButtonElem.style.boxShadow = '0 0 0.5vh black inset, 0 0 0.5vh white';
                this.panelGrayscaleButtonElem.style.opacity = 1;
                this.panelGrayscaleButtonElem.setAttribute("title", "There is an active grayscale filter to the image");
                
            } else {
                
                this.panelGrayscaleButtonElem.style.boxShadow = '0 0 0.5vh black';
                this.panelGrayscaleButtonElem.style.opacity = 0.8;
                this.panelGrayscaleButtonElem.setAttribute("title", "Apply grayscale filter to the image");
                
            }
            
        };
        
        this.toggleButtonSepia = function() {
            
            if ( this.filterSepiaFlag > 0 ) {
                
                this.panelSepiaButtonElem.style.boxShadow = '0 0 0.5vh black inset, 0 0 0.5vh white';
                this.panelSepiaButtonElem.style.opacity = 1;
                this.panelSepiaButtonElem.setAttribute("title", "There is an active sepia filter to the image");
                
            } else {
                
                this.panelSepiaButtonElem.style.boxShadow = '0 0 0.5vh black';
                this.panelSepiaButtonElem.style.opacity = 0.8;
                this.panelSepiaButtonElem.setAttribute("title", "Apply sepia filter to the image");
                
            }
            
        };
        
        this.buildCanvasModule = function() {
            
            this.imgRatio = ( this.imgSrc.width / this.imgSrc.height );
            
            this.imgCanvasInstance = new fabric.Image(this.imgSrc, {
                left: 0,
                top: 0
            });
            
            this.imgCanvasInstance.hasControls = false;
            this.imgCanvasInstance.hasBorders = false;
            this.imgCanvasInstance.lockMovementX = true;
            this.imgCanvasInstance.lockMovementY = true;
            
            this.imgCanvasInstance.on( 'mouseover', function() {
                
                _PartWallpaper.panelHeaderElem.style.backgroundColor = 'rgb(210, 55, 55)';
                
            });
            
            this.imgCanvasInstance.on( 'mouseout', function() {
                
                _PartWallpaper.panelHeaderElem.style.backgroundColor = '';
                
            });
            
            _Engine.canvas.add( this.imgCanvasInstance );
            
            if ( this.imgRatio > _Engine.canvasRatio ) {

                this.imgCanvasInstance.scaleToWidth( _Engine.canvasWidth );
                _Engine.fabricContainerElem.style.marginTop = Math.floor( ( _Engine.canvasContainerHeight - _Engine.canvasHeight ) /2 ) + 'px';

            } else {

                this.imgCanvasInstance.scaleToHeight( _Engine.canvasHeight );
                _Engine.fabricContainerElem.style.marginLeft = Math.floor( ( _Engine.canvasContainerWidth - _Engine.canvasWidth ) /2 ) + 'px';

            }
            
        };
        
        this.buildControlPanel = function() {
        
            this.panelElem = appendElement({
                tag: 'DIV',
                class: 'panel',
                parent: _Engine.panelContainerElem
            });
        
            this.panelHeaderElem = appendElement({
                tag: 'DIV',
                class: 'panelHeader',
                parent: this.panelElem
            });
        
            this.panelHeaderIconElem = appendElement({
                tag: 'DIV',
                class: 'panelHeaderWallpIcon',
                parent: this.panelHeaderElem
            });
            
            if ( this.args.delButton !== false ) {
        
                this.panelHeaderDelElem = appendElement({
                    tag: 'DIV',
                    class: 'panelHeaderDel',
                    parent: this.panelHeaderElem
                });
                
            }
            
        };
        
        this.buildControlModule = function(){
            
            this.buildControlPanel();
        
            this.panelBodyFiltersElem = appendElement({
                tag: 'DIV',
                class: 'panelBodyWallpFilters',
                parent: this.panelElem
            });
        
            this.panelGrayscaleButtonElem = appendElement({
                tag: 'DIV',
                class: 'panelGrayscaleButton',
                title: 'Apply grayscale filter to the image',
                parent: this.panelBodyFiltersElem
            });
        
            this.panelSepiaButtonElem = appendElement({
                tag: 'DIV',
                class: 'panelSepiaButton',
                title: 'Apply sepia filter to the image',
                parent: this.panelBodyFiltersElem
            });
        
            this.brightnessContainerElem = appendElement({
                tag: 'DIV',
                class: 'brightnessContainer',
                parent: this.panelElem
            });
        
            this.brightnessIconElem = appendElement({
                tag: 'DIV',
                class: 'brightnessIcon',
                title: 'Adjust the brightness of your image',
                parent: this.brightnessContainerElem
            });
        
            this.brightnessRangeElem = appendElement({
                tag: 'INPUT',
                class: 'brightnessRange',
                title: 'Adjust the brightness of your image',
                type: 'range',
                min: '-1',
                max: '1',
                step: '0.01',
                value: 0,
                parent: this.brightnessContainerElem
            });
        
            this.brightnessUndoElem = appendElement({
                tag: 'DIV',
                class: 'rangerUndo',
                title: 'Reset brightness value to original',
                parent: this.brightnessContainerElem
            });
        
            this.blurContainerElem = appendElement({
                tag: 'DIV',
                class: 'blurContainer',
                parent: this.panelElem
            });
        
            this.blurIconElem = appendElement({
                tag: 'DIV',
                class: 'blurIcon',
                title: 'Blur your image',
                parent: this.blurContainerElem
            });
        
            this.blurRangeElem = appendElement({
                tag: 'INPUT',
                class: 'blurRange',
                title: 'Blur your image',
                type: 'range',
                min: '0',
                max: '1',
                step: '0.01',
                value: 0,
                parent: this.blurContainerElem
            });
        
            this.blurUndoElem = appendElement({
                tag: 'DIV',
                class: 'rangerUndo',
                title: 'Reset blurness value to original',
                parent: this.blurContainerElem
            });
            
            
            /**
             * @TODO remove touchend events on deletion
             */
            this.panelGrayscaleButtonElem.addEvent( 'click', this, false );
            this.panelGrayscaleButtonElem.addEvent( 'touchend', this, false );
            this.panelSepiaButtonElem.addEvent( 'click', this, false );
            this.panelSepiaButtonElem.addEvent( 'touchend', this, false );
            this.brightnessRangeElem.addEvent( 'input', this, false );
            this.brightnessRangeElem.addEvent( 'input', this, false );
            this.brightnessUndoElem.addEvent( 'click', this, false );
            this.brightnessUndoElem.addEvent( 'touchend', this, false );
            this.blurRangeElem.addEvent( 'input', this, false );
            this.blurUndoElem.addEvent( 'click', this, false );
            this.blurUndoElem.addEvent( 'touchend', this, false );
            
        };
        
        this.createFromSource = function( img ) {
            
            this.imgSrc = img;
            this.buildControlModule();
            this.buildCanvasModule();
            
        };
        
        var _PartWallpaper = this;        
        this.args = args;
        this.imgSrc;
        this.imgRatio;
        this.imgCanvasInstance;
        
        this.panelElem;
        this.panelHeaderElem;
        this.panelHeaderIconElem;
        this.panelHeaderDelElem;
        this.panelBodyFiltersElem;
        this.panelGrayscaleButtonElem;
        this.panelSepiaButtonElem;
        
        this.brightnessContainerElem;
        this.brightnessIconElem;
        this.brightnessRangeElem;
        this.brightnessUndoElem;
        
        this.blurContainerElem;
        this.blurIconElem;
        this.blurRangeElem;
        this.blurUndoElem;
        
        this.filterGrayscaleFlag = -1;
        this.filterSepiaFlag = -1;
        this.filterBrightness = 0;
        this.filterBlur = 0;
        
    };
    
    var PartText = function( args ) {
        
        this.event_inputText = function( event ) {
            
            this.textInstance.text = event.target.value;
            
        };
        
        this.event_changeFontFamily = function( event ) {
            
            this.textInstance.set("fontFamily", event.target.value );
            
        };
        
        this.event_changeFontColor = function( event ) {
            
            this.textInstance.set("fill", convertHex( event.target.value ) );
                
            this.fontInputColorContainerElem.style.backgroundColor = event.target.value;
            
        };
        
        this.event_changeFontSize = function( event ) {
            
            this.textInstance.set("fontSize", event.target.value );
            
        };
        
        this.event_clickUndoFontSizeColor = function() {
            
            this.panelInputColorElem.value = this.args.color;
            
            this.fontInputColorContainerElem.style.backgroundColor = this.args.color;
            
            this.textInstance.set("fill", this.args.color );
            
            this.fontSizeRangeElem.value = this.args.fontSize;
            
            this.textInstance.set("fontSize", this.args.fontSize );
            
        };
        
        this.event_changeFontWeight = function( event ) {
            
            this.textInstance.set("fontWeight", event.target.value );
            
        };
        
        this.event_clickUndoFontWeight = function() {
            
            this.fontWeightRangeElem.value = this.args.fontWeight;
            
            this.textInstance.set("fontWeight", this.args.fontWeight );
            
        };
        
        this.event_changeFontStrokeColor = function( event ) {
            
            this.textInstance.set("stroke", convertHex( event.target.value ) );
            
            this.fontStrokeInputColorContainerElem.style.backgroundColor = event.target.value;
            
        };
        
        this.event_changeFontStrokeWidth = function( event ) {
            
            this.textInstance.set('strokeWidth', parseInt( event.target.value ) );
            
        };
        
        this.event_clickUndoBackgroundColorOpacity = function() {
            
            this.bgColorElem.value = this.args.backgroundColor;
            
            this.bgInputColorContainerElem.style.backgroundColor = this.args.backgroundColor;
            
            this.textInstance.set("backgroundColor", convertHexOpacity( this.args.backgroundColor, this.args.backgroundOpacity ) );
            
            this.bgRangeElem.value = this.args.backgroundOpacity;
            
        };
        
        this.event_clickUndoFontStrokeWidth = function() {
            
            this.fontStrokeColorElem.value = this.args.stroke;
            
            this.fontStrokeInputColorContainerElem.style.backgroundColor = this.args.stroke;
            
            this.textInstance.set("stroke", this.args.stroke );
            
            this.fontStrokeRangeElem.value = this.args.strokeWidth;
            
            this.textInstance.set("strokeWidth", parseInt( this.args.strokeWidth ) );
            
        };
        
        this.event_changeBackground = function() {
            
            this.textInstance.set('backgroundColor', convertHexOpacity( this.bgColorElem.value, this.bgRangeElem.value ) );
            
            this.bgInputColorContainerElem.style.backgroundColor = this.bgColorElem.value;
            
        };
        
        this.handleEvent = function( event ) {
            
            if ( event.type === 'input' && event.target === this.panelInputTextElem ){
                
                this.event_inputText( event );
                
            } else if ( event.type === 'change' && event.target === this.fontFamilySelectElem ){
                
                this.event_changeFontFamily( event );
                
            }  else if ( event.type === 'input' && event.target === this.panelInputColorElem ){
                
                this.event_changeFontColor( event );
                
            } else if ( event.type === 'input' && event.target === this.fontSizeRangeElem ){
                
                this.event_changeFontSize( event );
                
            } else if ( event.type === 'touchstart' && event.target === this.fontSizeRangeUndoElem ){
                
                this.event_clickUndoFontSizeColor();
                
            } else if ( event.type === 'click' && event.target === this.fontSizeRangeUndoElem ){
                
                this.event_clickUndoFontSizeColor();
                
            } else if ( event.type === 'input' && event.target === this.fontWeightRangeElem ){
                
                this.event_changeFontWeight( event );
                
            } else if ( event.type === 'touchstart' && event.target === this.fontWeightRangeUndoElem ){
                
                this.event_clickUndoFontWeight();
                
            } else if ( event.type === 'click' && event.target === this.fontWeightRangeUndoElem ){
                
                this.event_clickUndoFontWeight();
                
            } else if ( event.type === 'input' && event.target === this.fontStrokeColorElem ){
                
                this.event_changeFontStrokeColor( event );
                
            } else if ( event.type === 'input' && event.target === this.fontStrokeRangeElem ){
                
                this.event_changeFontStrokeWidth( event );
                
            } else if ( event.type === 'touchstart' && event.target === this.bgRangeUndoElem ){
                
                this.event_clickUndoBackgroundColorOpacity();
                
            } else if ( event.type === 'click' && event.target === this.bgRangeUndoElem ){
                
                this.event_clickUndoBackgroundColorOpacity();
                
            } else if ( event.type === 'touchstart' && event.target === this.fontStrokeRangeUndoElem ){
                
                this.event_clickUndoFontStrokeWidth();
                
            } else if ( event.type === 'click' && event.target === this.fontStrokeRangeUndoElem ){
                
                this.event_clickUndoFontStrokeWidth();
                
            } else if ( event.type === 'touchstart' && event.target === this.panelHeaderDelElem ){
                
                this.remove();
                
            } else if ( event.type === 'click' && event.target === this.panelHeaderDelElem ){
                
                this.remove();
                
            } else if ( event.type === 'input' && event.target === this.bgColorElem ){
                
                this.event_changeBackground();
                
            } else if ( event.type === 'input' && event.target === this.bgRangeElem ){
                
                this.event_changeBackground();
                
            }
            
            _Engine.canvas.renderAll();
            
        };
        
        this.buildCanvasModule = function() {
            
            this.textInstance = new fabric.Textbox( this.args.text, {
                left: 0,
                top: 0,
                width: _Engine.canvasWidth,
                height: _Engine.canvasHeight,
                borderColor: 'rgba(255, 0, 0, 1)',
                cornerColor: 'rgba(255, 0, 0, 1)',
                cornerStyle: 'circle',
                fill: this.args.color,
                fontFamily: this.args.fontFamily,
                fontSize: this.args.fontSize,
                editable: false,
                fontWeight: this.args.fontWeight,
                hasRotatingPoint: false,
                hasBorders: false,
                hasControls: false,
                lockMovementX: true,
                lockScalingX: true,
                lockScalingY: true,
                stroke: this.args.stroke,
                strokeWidth: this.args.strokeWidth,
                breakWords: true,
                textAlign: 'center',
                backgroundColor: convertHexOpacity( this.args.backgroundColor, this.args.backgroundOpacity )
            });
            
            if ( this.args.alignBottom === true ) {
                
                var topMargin = Math.floor( ( _Engine.canvasHeight - this.textInstance.height ) );

                this.textInstance.set( 'top', topMargin );
                
            }
            
            if ( this.args.alignMiddle === true ) {
                
                var topMargin = Math.floor( ( _Engine.canvasHeight - this.textInstance.height ) / 2 );

                this.textInstance.set( 'top', topMargin );
                
            }
            
            this.textInstance.on( 'mouseover', function() {
                
                _PartText.panelHeaderElem.style.backgroundColor = 'rgb(210, 55, 55)';
                
            });
            
            this.textInstance.on( 'mouseout', function() {
                
                _PartText.panelHeaderElem.style.backgroundColor = '';
                
            });
            
            _Engine.canvas.add( this.textInstance );
            
        };
        
        this.buildBgControl = function() {
        
            this.bgRangeContainerElem = appendElement({
                tag: 'DIV',
                class: 'bgRangeContainer',
                parent: this.panelElem
            });
            
            this.bgInputColorContainerElem = appendElement({
                tag: 'DIV',
                class: 'inputColorContainer',
                title: "Change the text's background color",
                parent: this.bgRangeContainerElem
            });
        
            this.bgColorElem = appendElement({
                tag: 'INPUT',
                class: 'panelInputColor',
                type: 'color',
                title: "Change the text's background color",
                value: this.args.backgroundColor,
                parent: this.bgInputColorContainerElem
            });
        
            this.bgRangeElem = appendElement({
                tag: 'INPUT',
                class: 'bgRange',
                type: 'range',
                title: "Adjust the text's background color opacity",
                min: '0',
                max: '1',
                step: '0.01',
                value: this.args.backgroundOpacity,
                parent: this.bgRangeContainerElem
            });
        
            this.bgRangeUndoElem = appendElement({
                tag: 'DIV',
                class: 'rangerUndo',
                title: "Reset the the text's background color to original",
                parent: this.bgRangeContainerElem
            });
            
            this.bgInputColorContainerElem.style.backgroundColor = this.bgColorElem.value;
            
            this.bgColorElem.addEvent( 'input', this, false );
            this.bgRangeElem.addEvent( 'input', this, false );
            this.bgRangeUndoElem.addEvent( 'click', this, false );
            this.bgRangeUndoElem.addEvent( 'touchstart', this, false );
            
        };
        
        this.buildStrokeControl = function() {
        
            this.fontStrokeRangeContainerElem = appendElement({
                tag: 'DIV',
                class: 'fontStrokeRangeContainer',
                parent: this.panelElem
            });
            
            this.fontStrokeInputColorContainerElem = appendElement({
                tag: 'DIV',
                class: 'inputColorContainer',
                title: "Change the stroke color around the text",
                parent: this.fontStrokeRangeContainerElem
            });
        
            this.fontStrokeColorElem = appendElement({
                tag: 'INPUT',
                class: 'panelInputColor',
                type: 'color',
                title: 'Change the stroke color around the text',
                value: this.args.stroke,
                parent: this.fontStrokeInputColorContainerElem
            });
        
            this.fontStrokeRangeElem = appendElement({
                tag: 'INPUT',
                class: 'fontStrokeRange',
                type: 'range',
                title: 'Adjust the stroke size around the text',
                min: '0',
                max: '40',
                step: '1',
                value: this.args.strokeWidth,
                parent: this.fontStrokeRangeContainerElem
            });
        
            this.fontStrokeRangeUndoElem = appendElement({
                tag: 'DIV',
                class: 'rangerUndo',
                title: 'Reset the stroke color and size to original',
                parent: this.fontStrokeRangeContainerElem
            });
            
            this.fontStrokeInputColorContainerElem.style.backgroundColor = this.fontStrokeColorElem.value;
            
            this.fontStrokeColorElem.addEvent( 'input', this, false );
            this.fontStrokeRangeElem.addEvent( 'input', this, false );
            this.fontStrokeRangeUndoElem.addEvent( 'click', this, false );
            this.fontStrokeRangeUndoElem.addEvent( 'touchstart', this, false );
            
        };
        
        this.buildWeightControl = function() {
        
            this.fontWeightRangeContainerElem = appendElement({
                tag: 'DIV',
                class: 'fontWeightRangeContainer',
                parent: this.panelElem
            });
        
            this.fontWeightRangeIcon = appendElement({
                tag: 'DIV',
                class: 'fontWeightRangeIcon',
                title: 'Adjust the font weight',
                parent: this.fontWeightRangeContainerElem
            });
        
            this.fontWeightRangeElem = appendElement({
                tag: 'INPUT',
                class: 'fontWeightRange',
                title: 'Adjust the font weight',
                type: 'range',
                min: '100',
                max: '900',
                step: '100',
                value: this.args.fontWeight,
                parent: this.fontWeightRangeContainerElem
            });
        
            this.fontWeightRangeUndoElem = appendElement({
                tag: 'DIV',
                class: 'rangerUndo',
                title: 'Reset font weight to original',
                parent: this.fontWeightRangeContainerElem
            });
            
            this.fontWeightRangeElem.addEvent( 'input', this, false );
            this.fontWeightRangeUndoElem.addEvent( 'click', this, false );
            this.fontWeightRangeUndoElem.addEvent( 'touchstart', this, false );
            
        };
        
        this.buildSizeControl = function() {
        
            this.fontSizeRangeContainerElem = appendElement({
                tag: 'DIV',
                class: 'fontSizeRangeContainer',
                parent: this.panelElem
            });
            
            this.fontInputColorContainerElem = appendElement({
                tag: 'DIV',
                class: 'inputColorContainer',
                title: "Change the font color",
                parent: this.fontSizeRangeContainerElem
            });
        
            this.panelInputColorElem = appendElement({
                tag: 'INPUT',
                class: 'panelInputColor',
                type: 'color',
                title: 'Change the font color',
                value: this.args.color,
                parent: this.fontInputColorContainerElem
            });
        
            this.fontSizeRangeElem = appendElement({
                tag: 'INPUT',
                class: 'fontSizeRange',
                type: 'range',
                title: 'Adjust the font size',
                min: '8',
                max: '120',
                step: '1',
                value: this.args.fontSize,
                parent: this.fontSizeRangeContainerElem
            });
        
            this.fontSizeRangeUndoElem = appendElement({
                tag: 'DIV',
                class: 'rangerUndo',
                title: 'Reset font size to original',
                parent: this.fontSizeRangeContainerElem
            });
            
            this.fontInputColorContainerElem.style.backgroundColor = this.panelInputColorElem.value;
            
            this.panelInputColorElem.addEvent( 'input', this, false );
            this.fontSizeRangeElem.addEvent( 'input', this, false );
            this.fontSizeRangeUndoElem.addEvent( 'click', this, false );
            this.fontSizeRangeUndoElem.addEvent( 'touchstart', this, false );
            
        };
        
        this.buildInputControl = function() {
        
            this.panelInputTextElem = appendElement({
                tag: 'INPUT',
                class: 'panelInputText',
                type: 'text',
                placeholder: 'Add some text',
                value: this.args.text,
                parent: this.panelElem
            });
            
            this.panelInputTextElem.addEvent( 'input', this, false );
            
        };
        
        this.buildHorizontalControl = function() {
        
            this.panelHorizontalElem = appendElement({
                tag: 'DIV',
                class: 'textPanelHorizontal',
                parent: this.panelElem
            });
        
//            this.horizontalFontFamilyElem = appendElement({
//                tag: 'DIV',
//                class: 'fontFamilyButton',
//                title: 'Choose a font family for the text',
//                parent: this.panelHorizontalElem
//            });
//            
//            this.horizontalFontFamilyElem.addEvent( 'click', this, false );
            
        };
        
        this.buildFontFamily = function() {
            
            this.fontFamilySelectElem = appendElement({
                tag: 'SELECT',
                class: 'fontFamilySelect',
                title: 'Select a font family for the text',
                parent: this.panelElem
            });
            
            for ( var i=0 ; i<fontsAvail.length ; i++ ) {
                
                var fontFamilyOptionElem = appendElement({
                    tag: 'OPTION',
                    class: 'fontFamilyOption',
                    value: fontsAvail[ i ],
                    text: fontsAvail[ i ],
                    parent: this.fontFamilySelectElem
                });
                
                if ( fontFamilyOptionElem.value === this.args.fontFamily ) {
                    
                    fontFamilyOptionElem.selected = true;
                    
                }
                
            }
            
            this.fontFamilySelectElem.addEvent( 'change', this, false );
            
        };
        
        this.buildControlModule = function() {
        
            this.panelElem = appendElement({
                tag: 'DIV',
                class: 'panel',
                parent: _Engine.panelContainerElem
            });
        
            this.panelHeaderElem = appendElement({
                tag: 'DIV',
                class: 'panelHeader',
                parent: this.panelElem
            });
        
            this.panelHeaderIconElem = appendElement({
                tag: 'DIV',
                class: 'panelHeaderTextIcon',
                parent: this.panelHeaderElem
            });
        
            this.panelHeaderDelElem = appendElement({
                tag: 'DIV',
                class: 'panelHeaderDel',
                parent: this.panelHeaderElem
            });
            
            this.buildHorizontalControl();
            
            this.buildInputControl();
            
            this.buildFontFamily();
            
            this.buildSizeControl();
            
            this.buildStrokeControl();
            
            this.buildBgControl();
            
            this.buildWeightControl();
            
            this.panelElem.addEvent( 'mouseover', this, false );
            this.panelElem.addEvent( 'mouseout', this, false );
            this.panelHeaderDelElem.addEvent( 'click', this, false );
            this.panelHeaderDelElem.addEvent( 'touchstart', this, false );
            
        };
        
        this.remove = function() {
            
            _Engine.canvas.remove( this.textInstance );
            
            this.panelElemNew = this.panelElem.cloneNode(true);
            
            this.panelElem.parentNode.replaceChild( this.panelElemNew, this.panelElem );
            
            while (this.panelElemNew.firstChild) {
        
                this.panelElemNew.removeChild( this.panelElemNew.firstChild );

            }
            
            this.panelElemNew.remove();
            
        };
        
        var _PartText = this;
        
        this.args = args;
        this.text;
        this.textInstance;
        
        this.buildControlModule();
        this.buildCanvasModule();
        
    };
    
    var PartImage = function( args ) {
        
        this.event_clickGrayFilterButton = function() {
            
            this.filterGrayscaleFlag = this.filterGrayscaleFlag * (-1);
                
            this.toggleButtonGrayscale();
            
        };
        
        this.event_clickSepiaFilterButton = function() {
            
            this.filterSepiaFlag = this.filterSepiaFlag * (-1);
                
            this.toggleButtonSepia();
            
        };
        
        this.event_changeBrightness = function() {
            
            this.filterBrightness = this.brightnessRangeElem.value;
            
        };
        
        this.event_clickBrightnessUndo = function() {
            
            this.filterBrightness = 0;
                
            this.brightnessRangeElem.value = 0;
            
        };
        
        this.event_clickUndoOpacity = function() {
            
            this.opacityRangeElem.value = this.args.opacity;
            
            this.imgCanvasInstance.set( 'opacity', this.args.opacity );
            
        };
        
        this.event_changeBlur = function() {
            
            this.filterBlur = this.blurRangeElem.value;
            
        };
        
        this.event_changeOpacity = function() {
            
            this.imgCanvasInstance.set( 'opacity', this.opacityRangeElem.value );
            
        };
        
        this.event_clickBlurUndo = function() {
            
            this.filterBlur = 0;
                
            this.blurRangeElem.value = 0;
            
        };
        
        this.remove = function() {
            
            _Engine.canvas.remove( this.imgCanvasInstance );
            
            this.panelElemNew = this.panelElem.cloneNode(true);
            
            this.panelElem.parentNode.replaceChild( this.panelElemNew, this.panelElem );
            
            while (this.panelElemNew.firstChild) {
        
                this.panelElemNew.removeChild( this.panelElemNew.firstChild );

            }
            
            this.panelElemNew.remove();
            
        };
        
        this.handleEvent = function( event ) {
            
            if ( event.type === 'touchend' && event.target === this.panelGrayscaleButtonElem ){
                
                this.event_clickGrayFilterButton();
                
            } else if ( event.type === 'click' && event.target === this.panelGrayscaleButtonElem ){
                
                this.event_clickGrayFilterButton();
                
            } else if ( event.type === 'touchend' && event.target === this.panelSepiaButtonElem ){
                
                this.event_clickSepiaFilterButton();
                
            } else if ( event.type === 'click' && event.target === this.panelSepiaButtonElem ){
                
                this.event_clickSepiaFilterButton();
                
            } else if ( event.type === 'input' && event.target === this.opacityRangeElem ){
                
                this.event_changeOpacity();
                
            } else if ( event.type === 'input' && event.target === this.brightnessRangeElem ){
                
                this.event_changeBrightness();
                
            } else if ( event.type === 'touchend' && event.target === this.brightnessUndoElem ){
                
                this.event_clickBrightnessUndo();
                
            } else if ( event.type === 'click' && event.target === this.brightnessUndoElem ){
                
                this.event_clickBrightnessUndo();
                
            } else if ( event.type === 'input' && event.target === this.blurRangeElem ){
                
                this.event_changeBlur();
                
            } else if ( event.type === 'touchend' && event.target === this.blurUndoElem ){
                
                this.event_clickBlurUndo();
                
            } else if ( event.type === 'click' && event.target === this.blurUndoElem ){
                
                this.event_clickBlurUndo();
                
            } else if ( ( event.type === 'touchstart' || event.type === 'click' ) && event.target === this.panelHeaderDelElem ){
                
                this.remove();
                
            } else if ( ( event.type === 'touchstart' || event.type === 'click' ) && event.target === this.opacityUndoElem ){
                
                this.event_clickUndoOpacity();
                
            }

            this.reapplyFilters();
            
        };
        
        this.reapplyFilters = function() {
            
            this.imgCanvasInstance.filters = [];
            
            if ( this.filterGrayscaleFlag > 0 ) {
                
                this.imgCanvasInstance.filters.push( new fabric.Image.filters.Grayscale() );
                
            }
            
            if ( this.filterSepiaFlag > 0 ) {
                
                this.imgCanvasInstance.filters.push( new fabric.Image.filters.Sepia() );
                
            }
            
            if ( this.filterBrightness !== 0 ) {
                
                this.imgCanvasInstance.filters.push( new fabric.Image.filters.Brightness({
                    brightness: this.filterBrightness
                }) );
                
            }
            
            if ( this.filterBlur !== 0 ) {
                
                this.imgCanvasInstance.filters.push( new fabric.Image.filters.Blur({
                    blur: this.filterBlur
                }) );
                
            }
            
            this.imgCanvasInstance.applyFilters();
            
            _Engine.canvas.renderAll();
            
        };
        
        this.toggleButtonGrayscale = function() {
            
            console.log( this.panelGrayscaleButtonElem );
            
            if ( this.filterGrayscaleFlag > 0 ) {
                
                this.panelGrayscaleButtonElem.style.boxShadow = '0 0 0.5vh black inset, 0 0 0.5vh white';
                this.panelGrayscaleButtonElem.style.opacity = 1;
                this.panelGrayscaleButtonElem.setAttribute("title", "There is an active grayscale filter to the image");
                
            } else {
                
                this.panelGrayscaleButtonElem.style.boxShadow = '0 0 0.5vh black';
                this.panelGrayscaleButtonElem.style.opacity = 0.8;
                this.panelGrayscaleButtonElem.setAttribute("title", "Apply grayscale filter to the image");
                
            }
            
        };
        
        this.toggleButtonSepia = function() {
            
            if ( this.filterSepiaFlag > 0 ) {
                
                this.panelSepiaButtonElem.style.boxShadow = '0 0 0.5vh black inset, 0 0 0.5vh white';
                this.panelSepiaButtonElem.style.opacity = 1;
                this.panelSepiaButtonElem.setAttribute("title", "There is an active sepia filter to the image");
                
            } else {
                
                this.panelSepiaButtonElem.style.boxShadow = '0 0 0.5vh black';
                this.panelSepiaButtonElem.style.opacity = 0.8;
                this.panelSepiaButtonElem.setAttribute("title", "Apply sepia filter to the image");
                
            }
            
        };
        
        this.buildControlPanel = function() {
        
            this.panelElem = appendElement({
                tag: 'DIV',
                class: 'panel',
                parent: _Engine.panelContainerElem
            });
        
            this.panelHeaderElem = appendElement({
                tag: 'DIV',
                class: 'panelHeader',
                parent: this.panelElem
            });
        
            this.panelHeaderIconElem = appendElement({
                tag: 'DIV',
                class: 'panelHeaderImageIcon',
                parent: this.panelHeaderElem
            });
            
            this.panelHeaderDelElem = appendElement({
                tag: 'DIV',
                class: 'panelHeaderDel',
                title: 'Delete this picture from image',
                parent: this.panelHeaderElem
            });
            
            this.panelHeaderDelElem.addEvent( 'click', this, false );
            this.panelHeaderDelElem.addEvent( 'touchstart', this, false );
            
        };
        
        this.buildControlModule = function(){
            
            this.buildControlPanel();
        
            this.panelBodyFiltersElem = appendElement({
                tag: 'DIV',
                class: 'panelBodyWallpFilters',
                parent: this.panelElem
            });
        
            this.panelGrayscaleButtonElem = appendElement({
                tag: 'DIV',
                class: 'panelGrayscaleButton',
                title: 'Apply grayscale filter to the image',
                parent: this.panelBodyFiltersElem
            });
        
            this.panelSepiaButtonElem = appendElement({
                tag: 'DIV',
                class: 'panelSepiaButton',
                title: 'Apply sepia filter to the image',
                parent: this.panelBodyFiltersElem
            });
        
            this.brightnessContainerElem = appendElement({
                tag: 'DIV',
                class: 'brightnessContainer',
                parent: this.panelElem
            });
        
            this.brightnessIconElem = appendElement({
                tag: 'DIV',
                class: 'brightnessIcon',
                title: 'Adjust the brightness of your image',
                parent: this.brightnessContainerElem
            });
        
            this.brightnessRangeElem = appendElement({
                tag: 'INPUT',
                class: 'brightnessRange',
                title: 'Adjust the brightness of your image',
                type: 'range',
                min: '-1',
                max: '1',
                step: '0.01',
                value: 0,
                parent: this.brightnessContainerElem
            });
        
            this.brightnessUndoElem = appendElement({
                tag: 'DIV',
                class: 'rangerUndo',
                title: 'Reset brightness value to original',
                parent: this.brightnessContainerElem
            });
        
            this.blurContainerElem = appendElement({
                tag: 'DIV',
                class: 'blurContainer',
                parent: this.panelElem
            });
        
            this.blurIconElem = appendElement({
                tag: 'DIV',
                class: 'blurIcon',
                title: 'Blur your image',
                parent: this.blurContainerElem
            });
        
            this.blurRangeElem = appendElement({
                tag: 'INPUT',
                class: 'blurRange',
                title: 'Blur your image',
                type: 'range',
                min: '0',
                max: '1',
                step: '0.01',
                value: 0,
                parent: this.blurContainerElem
            });
        
            this.blurUndoElem = appendElement({
                tag: 'DIV',
                class: 'rangerUndo',
                title: 'Reset blurness value to original',
                parent: this.blurContainerElem
            });
        
            this.opacityContainerElem = appendElement({
                tag: 'DIV',
                class: 'opacityContainer',
                parent: this.panelElem
            });
        
            this.opacityIconElem = appendElement({
                tag: 'DIV',
                class: 'opacityIcon',
                title: 'Change the opacity',
                parent: this.opacityContainerElem
            });
        
            this.opacityRangeElem = appendElement({
                tag: 'INPUT',
                class: 'opacityRange',
                title: 'Change the opacity',
                type: 'range',
                min: '0',
                max: '1',
                step: '0.01',
                value: this.args.opacity,
                parent: this.opacityContainerElem
            });
        
            this.opacityUndoElem = appendElement({
                tag: 'DIV',
                class: 'rangerUndo',
                title: 'Reset opacity value to original',
                parent: this.opacityContainerElem
            });
            
            
            /**
             * @TODO remove touchend events on deletion
             */
            this.panelGrayscaleButtonElem.addEvent( 'click', this, false );
            this.panelGrayscaleButtonElem.addEvent( 'touchend', this, false );
            this.panelSepiaButtonElem.addEvent( 'click', this, false );
            this.panelSepiaButtonElem.addEvent( 'touchend', this, false );
            this.brightnessRangeElem.addEvent( 'input', this, false );
            this.brightnessRangeElem.addEvent( 'input', this, false );
            this.opacityRangeElem.addEvent( 'input', this, false );
            this.brightnessUndoElem.addEvent( 'click', this, false );
            this.brightnessUndoElem.addEvent( 'touchend', this, false );
            this.blurRangeElem.addEvent( 'input', this, false );
            this.blurUndoElem.addEvent( 'click', this, false );
            this.blurUndoElem.addEvent( 'touchend', this, false );
            this.opacityUndoElem.addEvent( 'click', this, false );
            this.opacityUndoElem.addEvent( 'touchend', this, false );
            
        };
        
        this.buildCanvasModule = function() {
            
            this.imgCanvasInstance = new fabric.Image(this.args.imgSrc, {
                opacity: this.args.opacity,
                borderColor: 'rgb(0, 0, 255)',
                cornerColor: 'rgb(0, 0, 255)',
                cornerStyle: 'circle',
                borderOpacityWhenMoving: 1
            });
            
            this.imgCanvasInstance.on( 'mouseover', function() {
                
                _PartImage.panelHeaderElem.style.backgroundColor = 'rgb(210, 55, 55)';
                
            });
            
            this.imgCanvasInstance.on( 'mouseout', function() {
                
                _PartImage.panelHeaderElem.style.backgroundColor = '';
                
            });
            
            _Engine.canvas.add( this.imgCanvasInstance );
            
        };
        
        var _PartImage = this;
        this.args = args;
        this.imgCanvasInstance;
        
        this.filterGrayscaleFlag = -1;
        this.filterSepiaFlag = -1;
        this.filterBrightness = 0;
        this.filterBlur = 0;
        
        this.buildControlModule();
        this.buildCanvasModule();
        
    };
    
    this.handleEvent = function( event ) {
            
        if ( event.type === 'click' && event.target === this.downloadElem ){

            this.downloadImage();
            
        } else if ( event.type === 'click' && event.target === this.shareSocialFacebookElem ){
            
            var image = new Image();
            image.src = _Engine.canvas.toDataURL();
            
            window.open(
                'https://www.facebook.com/sharer/sharer.php?picture='+encodeURIComponent('https://m.media-amazon.com/images/M/MV5BMTk3OTE3ODg1Ml5BMl5BanBnXkFtZTgwMTI4NTE4NTM@._V1_SY1000_CR0,0,648,1000_AL_.jpg'), 
                'facebook-share-dialog', 
                'width=626,height=436');
            
            
        } else if ( event.type === 'click' && event.target === this.addNewPartElem ){
            
            this.toggleShareSocial = -1;
            this.toggleNewPart = this.toggleNewPart * (-1);
            
            this.toggleMainControlsContainer();
            
        } else if ( event.type === 'touchstart' && event.target === this.addNewPartExitElem ){
            
            this.toggleShareSocial = -1;
            this.toggleNewPart = -1;
            
            this.toggleMainControlsContainer();
            
        } else if ( event.type === 'click' && event.target === this.shareToSocialElem ){
            
            this.toggleNewPart = -1;
            this.toggleShareSocial = this.toggleShareSocial * (-1);
            
            this.toggleMainControlsContainer();
            
        } else if ( ( event.type === 'click' || event.type === 'touchstart' ) && event.target === this.addNewTextPartElem ){

            this.toggleShareSocial = -1;
            this.toggleNewPart = -1;
            
            this.toggleMainControlsContainer();
            
            var textPart = new PartText({
                text: 'Additional Text',
                alignMiddle: true,
                fontSize: 50,
                color: '#ffffff',
                fontFamily: 'Montserrat',
                stroke: '#000000',
                strokeWidth: 1,
                backgroundColor: '#ff0000',
                backgroundOpacity: 0.50,
                fontWeight: 900
            });
            
        } else if ( event.type === 'change' && event.target === this.addNewImageInputElem ){

            this.toggleShareSocial = -1;
            this.toggleNewPart = -1;
            
            this.toggleMainControlsContainer();
            
            var reader = new FileReader();

            reader.onload = function( e ){

                var img = new Image;

                img.onload = function() {

                    _Engine.addNewImagePart( img );
                };

                img.src = reader.result;

            };

            reader.readAsDataURL(event.target.files[0]);
            
        }
        
    };
    
    this.addNewImagePart = function( img ) {
        
        var imagePart = new PartImage({
                imgSrc: img,
                opacity: 1
            });
        
    };
    
    this.downloadImage = function() {
        
        var name = domain + '-' + ( new Date() ).getTime() + '.png';
        this.downloadElem.href = _Engine.canvas.toDataURL();
        this.downloadElem.download = name;
        
    };
    
    this.removeInitialBox = function() {
        
        while (this.initialBoxElem.firstChild) {
        
            this.initialBoxElem.removeChild( this.initialBoxElem.firstChild );

        }
        
        while (this.dragMobilePanel.firstChild) {
        
            this.dragMobilePanel.removeChild( this.dragMobilePanel.firstChild );

        }
        
        while (this.uploadMobilePanel.firstChild) {
        
            this.uploadMobilePanel.removeChild( this.uploadMobilePanel.firstChild );

        }
        
        while (this.urlMobilePanel.firstChild) {
        
            this.urlMobilePanel.removeChild( this.urlMobilePanel.firstChild );

        }
        
        this.initialBoxElem.parentNode.removeChild( this.initialBoxElem );
        this.dragMobilePanel.parentNode.removeChild( this.dragMobilePanel );
        this.uploadMobilePanel.parentNode.removeChild( this.uploadMobilePanel );
        this.urlMobilePanel.parentNode.removeChild( this.urlMobilePanel );
        
    };
    
    this.createMobilePlayground = function() {
        
        var allowedPerc = Math.floor( clientWidth * 0.95 );
        
        this.playgroundElem.style.width = allowedPerc + "px";
        
        this.canvasContainerWidth = this.canvasContainerElem.offsetWidth;
        
        var imgRatio = (  this.imgWhole.width /  this.imgWhole.height );
        
        if ( this.imgWhole.width !== this.canvasContainerWidth ) {

            this.canvasWidth = this.canvasContainerWidth;
            this.canvasHeight = Math.floor( ( this.canvasContainerWidth * this.imgWhole.height ) / this.imgWhole.width );

        } else {

            this.canvasWidth = this.canvasContainerWidth;
            this.canvasHeight = this.imgWhole.height;

        }
        
        this.canvasContainerHeight = this.canvasHeight;
        this.canvasRatio = ( this.canvasContainerWidth / this.canvasContainerHeight );
        
    };
    
    this.createDesktopPlayground = function() {
        
        var allowedPerc = Math.floor( ( ( clientWidth - rightVoid ) / clientWidth ) * 100 ) - 5;
        
        this.playgroundElem.style.width = allowedPerc + "vw";
        
        this.canvasContainerWidth = this.canvasContainerElem.offsetWidth;
        this.canvasContainerHeight = this.canvasContainerElem.offsetHeight;
        
        this.canvasRatio = ( this.canvasContainerWidth / this.canvasContainerHeight );
        var imgRatio = ( this.imgWhole.width / this.imgWhole.height );

        if ( imgRatio > this.canvasRatio ) {

            this.canvasWidth = this.canvasContainerWidth;
            this.canvasHeight = Math.floor( ( this.canvasWidth * this.imgWhole.height ) / this.imgWhole.width );

        } else if ( imgRatio < this.canvasRatio ) {

            this.canvasHeight = this.canvasContainerHeight;
            this.canvasWidth = Math.floor( ( this.canvasHeight * this.imgWhole.width ) / this.imgWhole.height );

        } else {

            this.canvasWidth = this.canvasContainerWidth;
            this.canvasHeight = this.canvasContainerHeight;

        }
        
        var canvasTopMargin = Math.floor( ( this.canvasContainerHeight - this.canvasHeight ) / 2 );
        
        this.canvasElem.style.top = canvasTopMargin + 'px';
        
    };
    
    this.createPlayground = function( img ) {
        
        this.imgWhole = img;
        
        this.playgroundElem = appendElement({
            tag: 'DIV',
            id: 'playground',
            parent: document.body
        });
        
        this.canvasContainerElem = appendElement({
            tag: 'DIV',
            id: 'canvasContainer',
            parent: this.playgroundElem
        });
        
        this.controlsContainerElem = appendElement({
            tag: 'DIV',
            id: 'controlsContainer',
            parent: this.playgroundElem
        });
        
        this.canvasElem = appendElement({
            tag: 'CANVAS',
            id: 'canvas',
            parent: this.canvasContainerElem
        });
        
        this.mainControlsElem = appendElement({
            tag: 'DIV',
            id: 'mainControls',
            parent: this.controlsContainerElem
        });
        
        this.downloadElem = appendElement({
            tag: 'A',
            id: 'download',
            class: 'mainControlsButton',
            title: 'Download the image',
            parent: this.mainControlsElem
        });
        
        this.addNewPartElem = appendElement({
            tag: 'DIV',
            id: 'addNewPart',
            class: 'mainControlsButton',
            title: 'Add new elements to the image. Text, drawings, etc.',
            parent: this.mainControlsElem
        });
        
        this.panelContainerElem = appendElement({
            tag: 'DIV',
            id: 'panelContainer',
            parent: this.controlsContainerElem
        });
        
        this.downloadElem.addEvent( 'click', this, false );
        this.addNewPartElem.addEvent( 'click', this, false );
        
        if ( clientWidth < 1141 ) {
            
            this.createMobilePlayground();
            
        } else {
            
            this.createDesktopPlayground();
            
        }
        
        this.canvas = new fabric.Canvas("canvas", {                         
            width: this.canvasWidth,
            height: this.canvasHeight,
            preserveObjectStacking: true
        });
        
        this.fabricContainerElem = this.canvasContainerElem.firstChild;

        this.buildModuleNewParts();
        
    };
    
    this.buildModuleShareSocial = function() {
        
        this.shareSocialContainerElem = appendElement({
            tag: 'DIV',
            id: 'shareSocialContainer',
            class: 'mainControlsDropDownContainer',
            parent: this.controlsContainerElem
        });
        
        this.shareSocialFacebookElem = appendElement({
            tag: 'DIV',
            id: 'shareSocialFacebook',
            class: 'mainControlsOptionsHeader',
            text: 'Facebook',
            title: 'Share this image to Facebook',
            parent: this.shareSocialContainerElem
        });
        
        this.shareSocialTwitterElem = appendElement({
            tag: 'DIV',
            id: 'shareSocialTwitter',
            class: 'mainControlsOptionsHeader',
            text: 'Twitter',
            title: 'Share this image to Twitter',
            parent: this.shareSocialContainerElem
        });
        
        this.shareSocialFacebookElem.addEvent( 'click', this, false );
        
    };
    
    this.buildModuleNewParts = function(){
        
        this.addNewPartContainerElem = appendElement({
            tag: 'DIV',
            id: 'newPartsContainer',
            class: 'mainControlsDropDownContainer',
            parent: this.controlsContainerElem
        });
        
        this.addNewPartExplainElem = appendElement({
            tag: 'P',
            id: 'newPartExplain',
            class: 'mainControlsOptionsExplain',
            text: 'Add new elements to the image',
            parent: this.addNewPartContainerElem
        });
        
        this.addNewTextPartElem = appendElement({
            tag: 'DIV',
            id: 'newPartText',
            class: 'mainControlsOptionsHeader',
            text: 'Text',
            title: 'Add a new text element to your image',
            parent: this.addNewPartContainerElem
        });
        
        this.addNewImagePartElem = appendElement({
            tag: 'DIV',
            id: 'newPartImage',
            class: 'mainControlsOptionsHeader',
            text: 'Image',
            title: 'Add an additional picture to your image',
            parent: this.addNewPartContainerElem
        });
        
        this.addNewImageInputElem = appendElement({
            tag: 'INPUT',
            id: 'newPartImageInput',
            class: 'mainControlsHiddenInput',
            type: 'file',
            accept: 'image/jpg,image/jpeg,image/png',
            title: 'Add an additional picture to your image',
            parent: this.addNewImagePartElem
        });
        
        this.addNewPartExitElem = appendElement({
            tag: 'DIV',
            id: 'newPartExit',
            class: 'mainControlsOptionsHeader',
            text: 'Back',
            parent: this.addNewPartContainerElem
        });
        
        this.addNewPartExitElem.addEvent( 'touchstart', this, false );
        this.addNewTextPartElem.addEvent( 'click', this, false );
        this.addNewTextPartElem.addEvent( 'touchstart', this, false );
        this.addNewImageInputElem.addEvent("change", this, true);
        
    };
    
    this.toggleMainControlsContainer = function() {
        
        if ( this.toggleNewPart > 0 ) {
                
            this.addNewPartElem.style.backgroundColor = 'black';
            this.addNewPartContainerElem.style.top = 0;

        } else {

            this.addNewPartElem.style.backgroundColor = '';
            this.addNewPartContainerElem.style.top = '-92vh';

        }
        
//        if ( this.toggleShareSocial > 0 ) {
//                
//            this.shareToSocialElem.style.backgroundColor = 'black';
//            this.shareSocialContainerElem.style.top = 0;
//
//        } else {
//
//            this.shareToSocialElem.style.backgroundColor = '';
//            this.shareSocialContainerElem.style.top = '-92vh';
//
//        }
        
    };
    
    this.createFromImageUpload = function( img ) {
        
        this.removeInitialBox();
        this.createPlayground( img );
        
        var wallPPart = new PartWallpaper({
            delButton: false
        });
        wallPPart.createFromSource( img );
        
        var copyPart = new CopyrightPart();
        
        var textPart1 = new PartText({
            text: 'Top Text',
            fontSize: 50,
            color: '#ffffff',
            fontFamily: 'Montserrat',
            stroke: '#000000',
            strokeWidth: 1,
            backgroundColor: '#ff0000',
            backgroundOpacity: 0.50,
            fontWeight: 900
        });
        
        var textPart2 = new PartText({
            text: 'Bottom Text',
            alignBottom: true,
            fontSize: 50,
            color: '#ffffff',
            fontFamily: 'Montserrat',
            stroke: '#000000',
            strokeWidth: 1,
            backgroundColor: '#ff0000',
            backgroundOpacity: 0.50,
            fontWeight: 900
        });
        
    };
    
    var _Engine = this;
    
    this.initialBoxElem = document.getElementById("box");
    this.dragMobilePanel = document.getElementById("dragMobile");
    this.uploadMobilePanel = document.getElementById("uploadMobile");
    this.urlMobilePanel = document.getElementById("urlMobile");
    this.playgroundElem;
    this.canvasContainerElem;
    this.controlsContainerElem;
    this.fabricContainerElem;
    this.canvasElem;
    this.mainControlsElem;
    this.exportToSvgElem;
    this.downloadElem;
    this.shareToSocialElem;
    this.addNewPartContainerElem;
    this.addNewPartExplainElem;
    this.addNewPartElem;
    this.addNewTextPartElem;
    this.addNewImagePartElem;
    this.addNewPartExitElem;
    this.panelContainerElem;
    this.shareSocialContainerElem;
    this.shareSocialFacebookElem;
    
    this.canvasRatio = 1;
    this.canvasContainerWidth = 0;
    this.canvasContainerHeight = 0;
    this.canvasWidth = 0;
    this.canvasHeight = 0;
    
    this.toggleNewPart = -1;
    this.toggleShareSocial = -1;
    
    this.ctx;
    this.canvas;
    this.parts = [];
    
};