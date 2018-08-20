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
                
            } else if ( event.type === 'touchstart' && event.target === this.panelHeaderDelElem ){
                
                this.showDeleteConfirm();
                
            } else if ( event.type === 'click' && event.target === this.offButton ){
                
                this.hideDeleteConfirm();
                
                _Engine.canvas.remove( this.textInstance );
                
                this.remove();
                
            } else if ( event.type === 'touchstart' && event.target === this.offButton ){
                
                this.delIcon.style.backgroundImage = "url('/imgs/sad2.svg')";
                
            } else if ( event.type === 'touchend' && event.target === this.offButton ){
                
                this.hideDeleteConfirm();
                
                _Engine.canvas.remove( this.textInstance );
                
                this.remove();
                
                this.delIcon.style.backgroundImage = "url('/imgs/sad1.svg')";
                
            } else if ( event.type === 'click' && event.target === this.onButton ){
                
                this.hideDeleteConfirm();
                
            } else if ( event.type === 'touchstart' && event.target === this.onButton ){
                
                this.delIcon.style.backgroundImage = "url('/imgs/heart.svg')";
                
            } else if ( event.type === 'touchend' && event.target === this.onButton ){
                
                this.hideDeleteConfirm();
                
                this.delIcon.style.backgroundImage = "url('/imgs/sad1.svg')";
                
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
            
            this.panelHeaderDelElem.removeEventListener( 'touchstart', this, false );
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
        this.delIcon = document.getElementById('delCCIcon');
        
        this.buildCanvasModule();
        this.buildControlPanel();
        
    };
    
    var PartWallpaper = function( args ) {
        
        this.handleEvent = function( event ) {
            
            if ( event.type === 'touchend' && event.target === this.panelGrayscaleButtonElem ){
                
                this.filterGrayscaleFlag = this.filterGrayscaleFlag * (-1);
                
                this.toggleButtonGrayscale();
                
                this.reapplyFilters();
                
            } else if ( event.type === 'click' && event.target === this.panelGrayscaleButtonElem ){
                
                this.filterGrayscaleFlag = this.filterGrayscaleFlag * (-1);
                
                this.toggleButtonGrayscale();
                
                this.reapplyFilters();
                
            } else if ( event.type === 'touchend' && event.target === this.panelSepiaButtonElem ){
                
                this.filterSepiaFlag = this.filterSepiaFlag * (-1);
                
                this.toggleButtonSepia();
                
                this.reapplyFilters();
                
            } else if ( event.type === 'click' && event.target === this.panelSepiaButtonElem ){
                
                this.filterSepiaFlag = this.filterSepiaFlag * (-1);
                
                this.toggleButtonSepia();
                
                this.reapplyFilters();
                
            } else if ( event.type === 'input' && event.target === this.brightnessRangeElem ){
                
                this.filterBrightness = event.target.value;
                
                this.reapplyFilters();
                
            } else if ( event.type === 'touchend' && event.target === this.brightnessUndoElem ){
                
                this.filterBrightness = 0;
                
                this.brightnessRangeElem.value = 0;
                
                this.reapplyFilters();
                
            } else if ( event.type === 'click' && event.target === this.brightnessUndoElem ){
                
                this.filterBrightness = 0;
                
                this.brightnessRangeElem.value = 0;
                
                this.reapplyFilters();
                
            } else if ( event.type === 'input' && event.target === this.blurRangeElem ){
                
                this.filterBlur = event.target.value;
                
                this.reapplyFilters();
                
            } else if ( event.type === 'touchend' && event.target === this.blurUndoElem ){
                
                this.filterBlur = 0;
                
                this.blurRangeElem.value = 0;
                
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
                
                this.fontInputColorContainerElem.style.backgroundColor = this.panelInputColorElem.value;
                
            } else if ( event.type === 'input' && event.target === this.fontSizeRangeElem ){
                
                this.textInstance.set("fontSize", event.target.value );
                
            } else if ( event.type === 'touchstart' && event.target === this.fontSizeRangeUndoElem ){
                
                this.panelInputColorElem.value = '#ffffff';
                
                this.fontInputColorContainerElem.style.backgroundColor = this.panelInputColorElem.value;
                
                this.textInstance.set("fill", 'rgb(255, 255, 255)' );
                
                this.fontSizeRangeElem.value = 50;
                
                this.textInstance.set("fontSize", this.fontSizeRangeElem.value );
                
            } else if ( event.type === 'click' && event.target === this.fontSizeRangeUndoElem ){
                
                this.panelInputColorElem.value = '#ffffff';
                
                this.fontInputColorContainerElem.style.backgroundColor = this.panelInputColorElem.value;
                
                this.textInstance.set("fill", 'rgb(255, 255, 255)' );
                
                this.fontSizeRangeElem.value = 50;
                
                this.textInstance.set("fontSize", this.fontSizeRangeElem.value );
                
            } else if ( event.type === 'input' && event.target === this.fontWeightRangeElem ){
                
                this.textInstance.set("fontWeight", event.target.value );
                
            } else if ( event.type === 'touchstart' && event.target === this.fontWeightRangeUndoElem ){
                
                this.fontWeightRangeElem.value = 900;
                
                this.textInstance.set("fontWeight", this.fontWeightRangeElem.value );
                
            } else if ( event.type === 'click' && event.target === this.fontWeightRangeUndoElem ){
                
                this.fontWeightRangeElem.value = 900;
                
                this.textInstance.set("fontWeight", this.fontWeightRangeElem.value );
                
            } else if ( event.type === 'input' && event.target === this.fontStrokeColorElem ){
                
                this.textInstance.set("stroke", convertHex( this.fontStrokeColorElem.value ) );
                
                this.fontStrokeInputColorContainerElem.style.backgroundColor = this.fontStrokeColorElem.value;
                
            } else if ( event.type === 'input' && event.target === this.fontStrokeRangeElem ){
                
                this.textInstance.set('strokeWidth', parseInt( this.fontStrokeRangeElem.value ) );
                
            } else if ( event.type === 'touchstart' && event.target === this.bgRangeUndoElem ){
                
                this.bgColorElem.value = '#ff0000';
                
                this.bgInputColorContainerElem.style.backgroundColor = this.bgColorElem.value;
                
                this.textInstance.set("backgroundColor", 'rgba(255, 0, 0, 0.5)' );
                
                this.bgRangeElem.value = 0.50;
                
            } else if ( event.type === 'click' && event.target === this.bgRangeUndoElem ){
                
                this.bgColorElem.value = '#ff0000';
                
                this.bgInputColorContainerElem.style.backgroundColor = this.bgColorElem.value;
                
                this.textInstance.set("backgroundColor", 'rgba(255, 0, 0, 0.5)' );
                
                this.bgRangeElem.value = 0.50;
                
            } else if ( event.type === 'touchstart' && event.target === this.fontStrokeRangeUndoElem ){
                
                this.fontStrokeColorElem.value = '#000000';
                
                this.fontStrokeInputColorContainerElem.style.backgroundColor = this.fontStrokeColorElem.value;
                
                this.textInstance.set("stroke", 'rgb(0, 0, 0)' );
                
                this.fontStrokeRangeElem.value = 1;
                
                this.textInstance.set("strokeWidth", parseInt( this.fontStrokeRangeElem.value ) );
                
            } else if ( event.type === 'click' && event.target === this.fontStrokeRangeUndoElem ){
                
                this.fontStrokeColorElem.value = '#000000';
                
                this.fontStrokeInputColorContainerElem.style.backgroundColor = this.fontStrokeColorElem.value;
                
                this.textInstance.set("stroke", 'rgb(0, 0, 0)' );
                
                this.fontStrokeRangeElem.value = 1;
                
                this.textInstance.set("strokeWidth", parseInt( this.fontStrokeRangeElem.value ) );
                
            } else if ( event.type === 'touchstart' && event.target === this.panelHeaderDelElem ){
                
                this.remove();
                
            } else if ( event.type === 'click' && event.target === this.panelHeaderDelElem ){
                
                this.remove();
                
            } else if ( event.type === 'input' && event.target === this.bgColorElem ){
                
                this.textInstance.set('backgroundColor', convertHexOpacity( this.bgColorElem.value, this.bgRangeElem.value ) );
                
                this.bgInputColorContainerElem.style.backgroundColor = this.bgColorElem.value;
                
            } else if ( event.type === 'input' && event.target === this.bgRangeElem ){
                
                this.textInstance.set('backgroundColor', convertHexOpacity( this.bgColorElem.value, this.bgRangeElem.value ) );
                
                this.bgInputColorContainerElem.style.backgroundColor = this.bgColorElem.value;
                
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
            
            if ( this.args.alignMiddle === true ) {
                
                var topMargin = Math.floor( ( _Engine.canvasHeight - this.textInstance.height ) / 2 );

                this.textInstance.set( 'top', topMargin );
                
            }
            
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
                value: '#ff0000',
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
                value: 0.50,
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
                value: '#000000',
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
                value: 1,
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
                value: 900,
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
                value: '#ffffff',
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
                value: 50,
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
            
            this.buildInputControl();
            
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
            
            this.bgRangeUndoElem.removeEventListener( 'touchstart', this, false );
            this.bgRangeUndoElem.removeEventListener( 'click', this, false );
            this.bgRangeElem.removeEventListener( 'input', this, false );
            this.bgColorElem.removeEventListener( 'input', this, false );
            this.fontWeightRangeUndoElem.removeEventListener( 'touchstart', this, false );
            this.fontWeightRangeUndoElem.removeEventListener( 'click', this, false );
            this.fontWeightRangeElem.removeEventListener( 'input', this, false );
            this.fontStrokeRangeUndoElem.removeEventListener( 'touchstart', this, false );
            this.fontStrokeRangeUndoElem.removeEventListener( 'click', this, false );
            this.fontStrokeRangeElem.removeEventListener( 'input', this, false );
            this.fontStrokeColorElem.removeEventListener( 'input', this, false );
            this.fontSizeRangeUndoElem.removeEventListener( 'touchstart', this, false );
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
        this.bgInputColorContainerElem;
        this.fontStrokeInputColorContainerElem;
        this.fontInputColorContainerElem;
        
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
                alignMiddle: true
            });
            
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
        
        var allowedPerc = Math.floor( ( ( clientWidth - rightVoid ) / clientWidth ) * 100 ) - 4;
        
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
        
        this.addNewDrawPartElem = appendElement({
            tag: 'DIV',
            id: 'newPartDraw',
            class: 'mainControlsOptionsHeader',
            text: 'Draw',
            title: 'Draw freely on the image',
            parent: this.addNewPartContainerElem
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
            text: 'Top Text'
        });
        
        var textPart2 = new PartText({
            text: 'Bottom Text',
            alignBottom: true
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
    this.addNewDrawPartElem;
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