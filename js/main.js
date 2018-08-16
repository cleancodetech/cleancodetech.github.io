window.onload = initFunc;

function initFunc() {
    
    rightVoid = 0;
    domain = null;
    sidebarElemens = 5;
    
    createCopyright();
    
    initialArrange();
    
    document.getElementById('photoUpload').addEventListener("change", photoUploadPreview, true);
    
    document.getElementById('photoUrl').addEventListener("input", photoDownload, true);
    
    document.getElementById('drag').addEventListener("drop", dropFile, true);
    
    document.getElementById('drag').addEventListener("dragover", dragOver, true);
    
    document.getElementById('drag').addEventListener("dragenter", dragEnter, true);
    
    document.getElementById('drag').addEventListener("dragleave", dragLeave, true);
    
    document.getElementById('menu').addEventListener("click", expandMobileMenu, true);
    
    document.getElementById('backMobile').addEventListener("click", minimizeMobileMenu, true);
    
    eng = new Engine();
    
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
    
    if ( args.hasOwnProperty('id') )        { elem.id = args.id; }
    if ( args.hasOwnProperty('title') )     { elem.setAttribute("title", args.title ); }
    if ( args.hasOwnProperty('class') )     { elem.setAttribute("class", args.class ); }
    if ( args.hasOwnProperty('type') )      { elem.setAttribute("type", args.type ); }
    if ( args.hasOwnProperty('min') )       { elem.setAttribute("min", args.min ); }
    if ( args.hasOwnProperty('max') )       { elem.setAttribute("max", args.max ); }
    if ( args.hasOwnProperty('step') )      { elem.setAttribute("step", args.step ); }
    if ( args.hasOwnProperty('value') )     { elem.setAttribute("value", args.value ); }
    if ( args.hasOwnProperty('text') )      { elem.innerHTML = args.text; }
    
    args.parent.appendChild( elem );
    
    return elem;
    
};

function initialArrange() {
    
    var width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;

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

var Engine = function(){
    
    var CopyrightPart = function(){
        
        this.handleEvent = function( event ) {
            
            if ( event.type === 'mouseover' ){
                
                this.textInstance.set( 'selectionBackgroundColor', 'rgba(255, 0, 0, 0.5)' );
                
                _Engine.canvas.setActiveObject( this.textInstance );
                
                _Engine.canvas.renderAll();
                
            } else if ( event.type === 'mouseout' ){
                
                this.textInstance.set( 'selectionBackgroundColor', 'rgba(255, 0, 0, 0)' );
                
                _Engine.canvas.renderAll();
                
            } else if ( event.type === 'click' && event.target === this.panelHeaderDelElem ){
                
                this.showDeleteConfirm();
                
            } else if ( event.type === 'click' && event.target === this.offButton ){
                
                this.hideDeleteConfirm();
                
                _Engine.canvas.remove( this.textInstance );
                
                this.remove();
                
            } else if ( event.type === 'click' && event.target === this.onButton ){
                
                this.hideDeleteConfirm();
                
            }
            
        };
        
        this.hideDeleteConfirm = function() {
            
            this.layer.style.display = 'none';

            this.offButton.removeEventListener( 'click', this, false );
            this.onButton.removeEventListener( 'click', this, false );
            
        };
        
        this.showDeleteConfirm = function() {
            
            this.layer.style.display = 'block';

            this.offButton.addEventListener( 'click', this, false );
            this.onButton.addEventListener( 'click', this, false );
            
        };
        
        this.buildCanvasModule = function() {
            
            this.textInstance = new fabric.Textbox( domain, {
                left: 0,
                top: 200,
                width: 110,
                fill: 'rgb(255, 255, 255)',
                fontFamily: 'Montserrat',
                fontSize: 15,
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
            
            this.panelElem.addEventListener( 'mouseover', this, false );
            this.panelElem.addEventListener( 'mouseout', this, false );            
            this.panelHeaderDelElem.addEventListener( 'click', this, false );
            
        };
        
        this.remove = function() {
            
            this.panelHeaderDelElem.removeEventListener( 'click', this, false );
            
            this.panelHeaderIconElem.remove();
            this.panelHeaderDelElem.remove();
            this.panelHeaderIconElem.remove();
            this.panelHeaderElem.remove();
            this.panelElem.remove();
            
        };
        
        var _CopyrightPart = this;
        
        this.textInstance;
        this.topMargin;
        
        this.panelElem;
        this.panelHeaderElem;
        this.panelHeaderIconElem;
        this.panelHeaderDelElem;
        
        this.layer = document.getElementById('delCCLayer');
        this.offButton = document.getElementById('delCCdelete');
        this.onButton = document.getElementById('delCCkeep');
        
        this.buildCanvasModule();
        this.buildControlPanel();
        
    };
    
    var PartWallpaper = function( args ) {
        
        this.handleEvent = function( event ) {
            
            if ( event.type === 'click' && event.target === this.panelGrayscaleButtonElem ){
                
                this.filterGrayscaleFlag = this.filterGrayscaleFlag * (-1);
                
                this.toggleButtonGrayscale();
                
                this.reapplyFilters();
                
            } else if ( event.type === 'click' && event.target === this.panelSepiaButtonElem ){
                
                this.filterSepiaFlag = this.filterSepiaFlag * (-1);
                
                this.toggleButtonSepia();
                
                this.reapplyFilters();
                
            } else if ( event.type === 'input' && event.target === this.brightnessRangeElem ){
                
                this.filterBrightness = event.target.value;
                
                this.reapplyFilters();
                
            } else if ( event.type === 'click' && event.target === this.brightnessUndoElem ){
                
                this.filterBrightness = 0;
                
                this.brightnessRangeElem.value = 0;
                
                this.reapplyFilters();
                
            } else if ( event.type === 'input' && event.target === this.blurRangeElem ){
                
                this.filterBlur = event.target.value;
                
                this.reapplyFilters();
                
            } else if ( event.type === 'click' && event.target === this.blurUndoElem ){
                
                this.filterBlur = 0;
                
                this.blurRangeElem.value = 0;
                
                this.reapplyFilters();
                
            }
            
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
            
            this.panelGrayscaleButtonElem.addEventListener( 'click', this, false );
            this.panelSepiaButtonElem.addEventListener( 'click', this, false );
            this.brightnessRangeElem.addEventListener( 'input', this, false );
            this.brightnessUndoElem.addEventListener( 'click', this, false );
            this.blurRangeElem.addEventListener( 'input', this, false );
            this.blurUndoElem.addEventListener( 'click', this, false );
            
        };
        
        this.createFromSource = function( img ) {
            
            this.imgSrc = img;
            this.buildCanvasModule();
            this.buildControlModule();
            
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
        
        this.handleEvent = function( event ) {
            
            if ( event.type === 'input' && event.target === this.panelInputTextElem ){
                
                this.textInstance.text = this.panelInputTextElem.value;
                
            } else if ( event.type === 'input' && event.target === this.panelInputColorElem ){
                
                this.textInstance.set("fill", convertHex( this.panelInputColorElem.value ) );
                
            } else if ( event.type === 'input' && event.target === this.fontSizeRangeElem ){
                
                this.textInstance.set("fontSize", event.target.value );
                
            } else if ( event.type === 'click' && event.target === this.fontSizeRangeUndoElem ){
                
                this.panelInputColorElem.value = '#ffffff';
                
                this.textInstance.set("fill", 'rgb(255, 255, 255)' );
                
                this.fontSizeRangeElem.value = 40;
                
                this.textInstance.set("fontSize", this.fontSizeRangeElem.value );
                
            } else if ( event.type === 'input' && event.target === this.fontWeightRangeElem ){
                
                this.textInstance.set("fontWeight", event.target.value );
                
            } else if ( event.type === 'click' && event.target === this.fontWeightRangeUndoElem ){
                
                this.fontWeightRangeElem.value = 900;
                
                this.textInstance.set("fontWeight", this.fontWeightRangeElem.value );
                
            } else if ( event.type === 'input' && event.target === this.fontStrokeColorElem ){
                
                this.textInstance.set("stroke", convertHex( this.fontStrokeColorElem.value ) );
                
            } else if ( event.type === 'input' && event.target === this.fontStrokeRangeElem ){
                
                this.textInstance.set('strokeWidth', parseInt( this.fontStrokeRangeElem.value ) );
                
            } else if ( event.type === 'click' && event.target === this.fontStrokeRangeUndoElem ){
                
                this.fontStrokeColorElem.value = '#000000';
                
                this.textInstance.set("stroke", 'rgb(0, 0, 0)' );
                
                this.fontStrokeRangeElem.value = 1;
                
                this.textInstance.set("strokeWidth", parseInt( this.fontStrokeRangeElem.value ) );
                
            } else if ( event.type === 'click' && event.target === this.panelHeaderDelElem ){
                
                this.remove();
                
            } else if ( event.type === 'input' && event.target === this.bgColorElem ){
                
                this.textInstance.set('backgroundColor', convertHexOpacity( this.bgColorElem.value, this.bgRangeElem.value ) );
                
            } else if ( event.type === 'input' && event.target === this.bgRangeElem ){
                
                this.textInstance.set('backgroundColor', convertHexOpacity( this.bgColorElem.value, this.bgRangeElem.value ) );
                
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
                fill: 'rgb(255, 255, 255)',
                fontFamily: 'Montserrat',
                fontSize: 50,
                editable: false,
                fontWeight: 900,
                hasRotatingPoint: false,
                hasBorders: false,
                hasControls: false,
                lockMovementX: true,
                lockScalingX: true,
                lockScalingY: true,
                stroke: 'rgb(0, 0, 0)',
                strokeWidth: 1,
                breakWords: true,
                textAlign: 'center',
                backgroundColor: 'rgba(255, 0, 0, 0.5)'
            });
            
            if ( this.args.alignBottom === true ) {
                
                var topMargin = Math.floor( ( _Engine.canvasHeight - this.textInstance.height ) );

                this.textInstance.set( 'top', topMargin );
                
            }
            
            _Engine.canvas.add( this.textInstance );
            
        };
        
        this.buildBgControl = function() {
            
            this.bgRangeContainerElem = document.createElement("DIV");
            this.bgRangeContainerElem.setAttribute("class", "bgRangeContainer");
            this.panelElem.appendChild( this.bgRangeContainerElem );
            
            this.bgColorElem = document.createElement("INPUT");
            this.bgColorElem.setAttribute("class", "panelInputColor");
            this.bgColorElem.setAttribute("type", "color");
            this.bgColorElem.setAttribute("title", "Change the text's background color");
            this.bgColorElem.value = '#ff0000';
            this.bgRangeContainerElem.appendChild( this.bgColorElem );
            
            this.bgRangeElem = document.createElement("INPUT");
            this.bgRangeElem.setAttribute("class", "bgRange");
            this.bgRangeElem.setAttribute("title", "Adjust the text's background color opacity");
            this.bgRangeElem.setAttribute("type", "range");
            this.bgRangeElem.setAttribute("min", "0");
            this.bgRangeElem.setAttribute("max", "1");
            this.bgRangeElem.setAttribute("step", "0.01");
            this.bgRangeElem.value = 0.50;
            this.bgRangeContainerElem.appendChild( this.bgRangeElem );
            
            this.bgRangeUndoElem = document.createElement("DIV");
            this.bgRangeUndoElem.setAttribute("class", "rangerUndo");
            this.bgRangeUndoElem.setAttribute("title", "Reset the the text's background color to original");
            this.bgRangeContainerElem.appendChild( this.bgRangeUndoElem );
            
            this.bgColorElem.addEventListener( 'input', this, false );
            this.bgRangeElem.addEventListener( 'input', this, false );
            this.bgRangeUndoElem.addEventListener( 'click', this, false );
            
        };
        
        this.buildStrokeControl = function() {
            
            this.fontStrokeRangeContainerElem = document.createElement("DIV");
            this.fontStrokeRangeContainerElem.setAttribute("class", "fontStrokeRangeContainer");
            this.panelElem.appendChild( this.fontStrokeRangeContainerElem );
            
            this.fontStrokeColorElem = document.createElement("INPUT");
            this.fontStrokeColorElem.setAttribute("class", "panelInputColor");
            this.fontStrokeColorElem.setAttribute("type", "color");
            this.fontStrokeColorElem.setAttribute("title", "Change the stroke color around the text");
            this.fontStrokeColorElem.value = '#000000';
            this.fontStrokeRangeContainerElem.appendChild( this.fontStrokeColorElem );
            
            this.fontStrokeRangeElem = document.createElement("INPUT");
            this.fontStrokeRangeElem.setAttribute("class", "fontStrokeRange");
            this.fontStrokeRangeElem.setAttribute("title", "Adjust the stroke size around the text");
            this.fontStrokeRangeElem.setAttribute("type", "range");
            this.fontStrokeRangeElem.setAttribute("min", "0");
            this.fontStrokeRangeElem.setAttribute("max", "40");
            this.fontStrokeRangeElem.setAttribute("step", "1");
            this.fontStrokeRangeElem.value = 1;
            this.fontStrokeRangeContainerElem.appendChild( this.fontStrokeRangeElem );
            
            this.fontStrokeRangeUndoElem = document.createElement("DIV");
            this.fontStrokeRangeUndoElem.setAttribute("class", "rangerUndo");
            this.fontStrokeRangeUndoElem.setAttribute("title", "Reset the stroke color and size to original");
            this.fontStrokeRangeContainerElem.appendChild( this.fontStrokeRangeUndoElem );
            
            this.fontStrokeColorElem.addEventListener( 'input', this, false );
            this.fontStrokeRangeElem.addEventListener( 'input', this, false );
            this.fontStrokeRangeUndoElem.addEventListener( 'click', this, false );
            
        };
        
        this.buildWeightControl = function() {
            
            this.fontWeightRangeContainerElem = document.createElement("DIV");
            this.fontWeightRangeContainerElem.setAttribute("class", "fontWeightRangeContainer");
            this.panelElem.appendChild( this.fontWeightRangeContainerElem );
            
            this.fontWeightRangeIcon = document.createElement("DIV");
            this.fontWeightRangeIcon.setAttribute("class", "fontWeightRangeIcon");
            this.fontWeightRangeIcon.setAttribute("title", "Adjust the font weight");
            this.fontWeightRangeContainerElem.appendChild( this.fontWeightRangeIcon );
            
            this.fontWeightRangeElem = document.createElement("INPUT");
            this.fontWeightRangeElem.setAttribute("class", "fontWeightRange");
            this.fontWeightRangeElem.setAttribute("title", "Adjust the font weight");
            this.fontWeightRangeElem.setAttribute("type", "range");
            this.fontWeightRangeElem.setAttribute("min", "100");
            this.fontWeightRangeElem.setAttribute("max", "900");
            this.fontWeightRangeElem.setAttribute("step", "100");
            this.fontWeightRangeElem.value = 900;
            this.fontWeightRangeContainerElem.appendChild( this.fontWeightRangeElem );
            
            this.fontWeightRangeUndoElem = document.createElement("DIV");
            this.fontWeightRangeUndoElem.setAttribute("class", "rangerUndo");
            this.fontWeightRangeUndoElem.setAttribute("title", "Reset font weight to original");
            this.fontWeightRangeContainerElem.appendChild( this.fontWeightRangeUndoElem );
            
            this.fontWeightRangeElem.addEventListener( 'input', this, false );
            this.fontWeightRangeUndoElem.addEventListener( 'click', this, false );
            
        };
        
        this.buildSizeControl = function() {
            
            this.fontSizeRangeContainerElem = document.createElement("DIV");
            this.fontSizeRangeContainerElem.setAttribute("class", "fontSizeRangeContainer");
            this.panelElem.appendChild( this.fontSizeRangeContainerElem );
            
            this.panelInputColorElem = document.createElement("INPUT");
            this.panelInputColorElem.setAttribute("class", "panelInputColor");
            this.panelInputColorElem.setAttribute("type", "color");
            this.panelInputColorElem.setAttribute("title", "Change the font color");
            this.panelInputColorElem.value = '#ffffff';
            this.fontSizeRangeContainerElem.appendChild( this.panelInputColorElem );
            
            this.fontSizeRangeElem = document.createElement("INPUT");
            this.fontSizeRangeElem.setAttribute("class", "fontSizeRange");
            this.fontSizeRangeElem.setAttribute("title", "Adjust the font size");
            this.fontSizeRangeElem.setAttribute("type", "range");
            this.fontSizeRangeElem.setAttribute("min", "8");
            this.fontSizeRangeElem.setAttribute("max", "120");
            this.fontSizeRangeElem.setAttribute("step", "1");
            this.fontSizeRangeElem.value = 40;
            this.fontSizeRangeContainerElem.appendChild( this.fontSizeRangeElem );
            
            this.fontSizeRangeUndoElem = document.createElement("DIV");
            this.fontSizeRangeUndoElem.setAttribute("class", "rangerUndo");
            this.fontSizeRangeUndoElem.setAttribute("title", "Reset font size to original");
            this.fontSizeRangeContainerElem.appendChild( this.fontSizeRangeUndoElem );
            
            this.panelInputColorElem.addEventListener( 'input', this, false );
            this.fontSizeRangeElem.addEventListener( 'input', this, false );
            this.fontSizeRangeUndoElem.addEventListener( 'click', this, false );
            
        };
        
        this.buildInputControl = function() {
            
            this.panelInputTextElem = document.createElement("INPUT");
            this.panelInputTextElem.setAttribute("class", "panelInputText");
            this.panelInputTextElem.setAttribute("type", "text");
            this.panelInputTextElem.setAttribute("placeholder", "Add some text");
            this.panelInputTextElem.value = this.args.text;
            this.panelElem.appendChild( this.panelInputTextElem );
            
            this.panelInputTextElem.addEventListener( 'input', this, false );
            
        };
        
        this.buildControlModule = function() {
            
            this.panelElem = document.createElement("DIV");
            this.panelElem.setAttribute("class", "panel");
            _Engine.panelContainerElem.appendChild( this.panelElem );
            
            this.panelHeaderElem = document.createElement("DIV");
            this.panelHeaderElem.setAttribute("class", "panelHeader");
            this.panelElem.appendChild( this.panelHeaderElem );
            
            this.panelHeaderIconElem = document.createElement("DIV");
            this.panelHeaderIconElem.setAttribute("class", "panelHeaderTextIcon");
            this.panelHeaderElem.appendChild( this.panelHeaderIconElem );
            
            this.panelHeaderDelElem = document.createElement("DIV");
            this.panelHeaderDelElem.setAttribute("class", "panelHeaderDel");
            this.panelHeaderElem.appendChild( this.panelHeaderDelElem );
            
            this.buildInputControl();
            
            this.buildSizeControl();
            
            this.buildStrokeControl();
            
            this.buildBgControl();
            
            this.buildWeightControl();
            
            this.panelElem.addEventListener( 'mouseover', this, false );
            this.panelElem.addEventListener( 'mouseout', this, false );
            this.panelHeaderDelElem.addEventListener( 'click', this, false );
            
        };
        
        this.remove = function() {
            
            _Engine.canvas.remove( this.textInstance );
            
            this.bgRangeUndoElem.removeEventListener( 'click', this, false );
            this.bgRangeElem.removeEventListener( 'input', this, false );
            this.bgColorElem.removeEventListener( 'input', this, false );
            this.fontWeightRangeUndoElem.removeEventListener( 'click', this, false );
            this.fontWeightRangeElem.removeEventListener( 'input', this, false );
            this.fontStrokeRangeUndoElem.removeEventListener( 'click', this, false );
            this.fontStrokeRangeElem.removeEventListener( 'input', this, false );
            this.fontStrokeColorElem.removeEventListener( 'input', this, false );
            this.fontSizeRangeUndoElem.removeEventListener( 'click', this, false );
            this.fontSizeRangeElem.removeEventListener( 'input', this, false );
            this.panelInputColorElem.removeEventListener( 'input', this, false );
            this.panelInputTextElem.removeEventListener( 'input', this, false );
            this.panelElem.removeEventListener( 'mouseout', this, false );
            this.panelElem.removeEventListener( 'mouseover', this, false );
            
            this.bgRangeUndoElem.remove();
            this.bgRangeElem.remove();
            this.bgColorElem.remove();
            this.bgRangeContainerElem.remove();
            this.fontWeightRangeUndoElem.remove();
            this.fontWeightRangeElem.remove();
            this.fontWeightRangeIcon.remove();
            this.fontWeightRangeContainerElem.remove();
            this.fontStrokeRangeUndoElem.remove();
            this.fontStrokeRangeElem.remove();
            this.fontStrokeColorElem.remove();
            this.fontStrokeRangeContainerElem.remove();
            this.fontSizeRangeUndoElem.remove();
            this.fontSizeRangeElem.remove();
            this.panelInputColorElem.remove();
            this.fontSizeRangeContainerElem.remove();
            this.panelInputTextElem.remove();            
            this.panelHeaderDelElem.remove();
            this.panelHeaderIconElem.remove();
            this.panelHeaderElem.remove();
            this.panelElem.remove();
            
        };
        
        var _PartText = this;
        
        this.args = args;
        this.text;
        this.textInstance;
        
        this.panelElem;
        this.panelHeaderElem;
        this.panelHeaderIconElem;
        this.panelHeaderDelElem;
        this.panelInputTextElem;
        this.panelInputColorElem;
        this.fontSizeRangeContainerElem;
        this.fontSizeRangeIcon;
        this.fontSizeRangeElem;
        this.fontSizeRangeUndoElem;
        this.fontWeightRangeContainerElem;
        this.fontWeightRangeIcon;
        this.fontWeightRangeElem;
        this.fontWeightRangeUndoElem;
        this.bgRangeContainerElem;
        this.bgColorElem;
        this.bgRangeElem;
        this.bgRangeUndoElem;
        
        this.fontStrokeRangeContainerElem;
        this.fontStrokeColorElem;
        this.fontStrokeRangeElem;
        this.fontStrokeRangeUndoElem;
        
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
            
        } else if ( event.type === 'click' && event.target === this.shareToSocialElem ){
            
            this.toggleNewPart = -1;
            this.toggleShareSocial = this.toggleShareSocial * (-1);
            
            this.toggleMainControlsContainer();
            
        } else if ( event.type === 'click' && event.target === this.addNewTextPartElem ){

            this.addNewTextPartElem.style.opacity = 0;
            this.addNewTextPartElem.style.cursor = 'default';

            this.addNewDrawPartElem.style.opacity = 0;
            this.addNewDrawPartElem.style.cursor = 'default';
            
            var textPart = new PartText();
            textPart.buildControlModule();
            textPart.buildCanvasModule();
            
            this.parts.push( textPart );
            
        }
        
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
        
        this.initialBoxElem.parentNode.removeChild( this.initialBoxElem );
        
    };
    
    this.createPlayground = function( img ) {
        
        this.imgWhole = img
        
        var width = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;

        var height = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;
    
        this.playgroundElem = document.createElement("DIV");
        this.playgroundElem.setAttribute("id", "playground");
        document.body.appendChild( this.playgroundElem );
        var allowedPerc = Math.floor( ( ( width - rightVoid ) / width ) * 100 ) - 4;
        this.playgroundElem.style.width = allowedPerc + "vw";
        
        this.canvasContainerElem = document.createElement("DIV");
        this.canvasContainerElem.setAttribute("id", "canvasContainer");
        this.playgroundElem.appendChild( this.canvasContainerElem );
        
        this.controlsContainerElem = document.createElement("DIV");
        this.controlsContainerElem.setAttribute("id", "controlsContainer");
        this.playgroundElem.appendChild( this.controlsContainerElem );
        
        this.canvasContainerWidth = this.canvasContainerElem.offsetWidth;
        this.canvasContainerHeight = this.canvasContainerElem.offsetHeight;
        this.canvasRatio = ( this.canvasContainerWidth / this.canvasContainerHeight );
        var imgRatio = ( img.width / img.height );

        if ( imgRatio > this.canvasRatio ) {

            this.canvasWidth = this.canvasContainerWidth;
            this.canvasHeight = Math.floor( ( this.canvasWidth * img.height ) / img.width );

        } else if ( imgRatio < this.canvasRatio ) {

            this.canvasHeight = this.canvasContainerHeight;
            this.canvasWidth = Math.floor( ( this.canvasHeight * img.width ) / img.height );

        } else {

            this.canvasWidth = this.canvasContainerWidth;
            this.canvasHeight = this.canvasContainerHeight;

        }
        
        var canvasTopMargin = Math.floor( ( this.canvasContainerHeight - this.canvasHeight ) / 2 );
        
        this.canvasElem = document.createElement("CANVAS");
        this.canvasElem.setAttribute("id", "canvas");
        this.canvasContainerElem.appendChild( this.canvasElem );
        this.canvasElem.style.top = canvasTopMargin + 'px';
        
        this.canvas = new fabric.Canvas("canvas", {                         
            width: this.canvasWidth,
            height: this.canvasHeight,
            preserveObjectStacking: true
        });
        
        this.fabricContainerElem = this.canvasContainerElem.firstChild;
        
        this.mainControlsElem = document.createElement("DIV");
        this.mainControlsElem.setAttribute("id", "mainControls");
        this.controlsContainerElem.appendChild( this.mainControlsElem );
        
//        this.exportToSvgElem = appendElement({
//            tag: 'DIV',
//            id: 'exportToSvg',
//            class: 'mainControlsButton',
//            title: 'Export to svg file',
//            parent: this.mainControlsElem
//        });
        
        this.downloadElem = appendElement({
            tag: 'A',
            id: 'download',
            class: 'mainControlsButton',
            title: 'Download the image',
            parent: this.mainControlsElem
        });
        
//        this.shareToSocialElem = appendElement({
//            tag: 'DIV',
//            id: 'shareSocial',
//            class: 'mainControlsButton',
//            title: 'Share the image to social media',
//            parent: this.mainControlsElem
//        });
        
        this.addNewPartElem = appendElement({
            tag: 'DIV',
            id: 'addNewPart',
            class: 'mainControlsButton',
            title: 'Add new elements to the image. Text, drawings, etc.',
            parent: this.mainControlsElem
        });
        
        this.panelContainerElem = document.createElement("DIV");
        this.panelContainerElem.setAttribute("id", "panelContainer");
        this.controlsContainerElem.appendChild( this.panelContainerElem );
        
//        this.addNewTextPartElem = document.createElement("DIV");
//        this.addNewTextPartElem.setAttribute("id", "addNewTextPart");
//        this.addNewTextPartElem.setAttribute("title", "Add text to the image");
//        this.addNewPartContainerElem.appendChild( this.addNewTextPartElem );
//        
//        this.addNewDrawPartElem = document.createElement("DIV");
//        this.addNewDrawPartElem.setAttribute("id", "addNewDrawPart");
//        this.addNewDrawPartElem.setAttribute("title", "Draw a line to the image");
//        this.addNewPartContainerElem.appendChild( this.addNewDrawPartElem );
        
        this.downloadElem.addEventListener( 'click', this, false );
        this.addNewPartElem.addEventListener( 'click', this, false );
//        this.shareToSocialElem.addEventListener( 'click', this, false );
//        this.addNewTextPartElem.addEventListener( 'click', this, false );

        this.buildModuleNewParts();
        
//        this.buildModuleShareSocial();
        
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
        
        this.shareSocialFacebookElem.addEventListener( 'click', this, false );
        
    };
    
    this.buildModuleNewParts = function(){
        
        this.addNewPartContainerElem = appendElement({
            tag: 'DIV',
            id: 'newPartsContainer',
            class: 'mainControlsDropDownContainer',
            parent: this.controlsContainerElem
        });
        
        this.addNewTextPartElem = appendElement({
            tag: 'DIV',
            id: 'newPartText',
            class: 'mainControlsOptionsHeader',
            text: 'Text',
            title: 'Add a new text element to your image',
            parent: this.addNewPartContainerElem
        });
        
        this.addNewDrawPartElem = appendElement({
            tag: 'DIV',
            id: 'newPartDraw',
            class: 'mainControlsOptionsHeader',
            text: 'Draw',
            title: 'Draw freely on the image',
            parent: this.addNewPartContainerElem
        });
        
    };
    
    this.toggleMainControlsContainer = function() {
        
        if ( this.toggleNewPart > 0 ) {
                
            this.addNewPartElem.style.backgroundColor = 'black';
            this.addNewPartContainerElem.style.top = 0;

        } else {

            this.addNewPartElem.style.backgroundColor = '';
            this.addNewPartContainerElem.style.top = '-92vh';

        }
        
        if ( this.toggleShareSocial > 0 ) {
                
            this.shareToSocialElem.style.backgroundColor = 'black';
            this.shareSocialContainerElem.style.top = 0;

        } else {

            this.shareToSocialElem.style.backgroundColor = '';
            this.shareSocialContainerElem.style.top = '-92vh';

        }
        
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
            text: 'Top Text'
        });
        
        var textPart2 = new PartText({
            text: 'Bottom Text',
            alignBottom: true
        });
        
    };
    
    var _Engine = this;
    
    this.initialBoxElem = document.getElementById("box");
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
    this.addNewPartElem;
    this.addNewTextPartElem;
    this.addNewDrawPartElem;
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

function createLab( img ) {
    
    var eng = new canvasEngine( canvas, img, canvasWidth, canvasHeight );
    
    var controls = new Controls( eng );
    
}

var Controls = function( canvasEngine ) {
    
    var _Controls = this;
    
    this.box;
    
    this.box = document.createElement("DIV");
    this.box.setAttribute("id", "controlsBox");
    document.body.appendChild( this.box );
    
};

var canvasEngine = function( canvas, img, canvasWidth, canvasHeight ) {
    
    var ctx = canvas.getContext("2d");
    
    ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
    
};