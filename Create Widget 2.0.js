/*

	Create Widget 2.0
	
	Code: Arlo Rose
	1.1, 2.0 Edits: Rob Marquardt

	This is a Photoshop JavaScript Script that when run will take the open
	document and make a complete Widget from it.
	
	(c) 2003 - 2007 Yahoo!, Inc.

*/

// Get the platform in order to enable or disable the shadow option:
var isMac = (File.fs == "Macintosh") ? true : false;
var isCS2 = (app.version.split(".")[0] > 8) ? true : false;
var nonNormalAlert = false;

// This function creates a dynamic dialog for choosing Widget creation options:
function makeDialog(widgetInfo)
{
	var docRef = activeDocument;
	var dialogW = 390;					// dialog width
	var dialogH = 352;					// dialog height
	var buttonW = 80;					// button width
	var buttonH = (isCS2) ? 22 : 20;	// button height
	var textW = 270;					// text width
	var textH = 22;						// text height
	var margin = 10;					// margin

	var bounds = {x:0, y:0, width:dialogW, height:dialogH};
	var yLayout = margin;

	var myWindow = new Window("dialog", "Please Choose Your Widget's Options", bounds);

	bounds = {x:(dialogW - buttonW - margin), y:yLayout, width:buttonW, height:buttonH};
	myWindow.buttonRun = myWindow.add("button", bounds, "Create");
	myWindow.defaultElement = myWindow.buttonRun;
	myWindow.buttonRun.onClick = buttonRunOnClick;

	yLayout += buttonH + margin;
	bounds = {x:(dialogW - buttonW - margin), y:yLayout, width:buttonW, height:buttonH};
	myWindow.buttonCancel = myWindow.add("button", bounds, "Cancel");
	myWindow.buttonCancel.onClick = function() { this.parent.close(0); };

	yLayout = margin; // reset

	bounds = {x:margin, y:yLayout, width:180, height:textH};
	myWindow.add("statictext", bounds, "Widget Name:");

	yLayout += textH;
	bounds = {x:margin, y:yLayout, width:textW, height:textH};
	myWindow.widgetName = myWindow.add("edittext", bounds, widgetInfo.theWidgetName);

	yLayout += textH + margin;
	bounds = {x:margin, y:yLayout, width:180, height:textH};
	myWindow.add("statictext", bounds, "Author:");

	yLayout += textH;
	bounds = {x:margin, y:yLayout, width:textW, height:textH};
	myWindow.widgetAuthor = myWindow.add("edittext", bounds, widgetInfo.theWidgetAuthor);

	yLayout += textH + margin;
	bounds = {x:margin, y:yLayout, width:textW/2, height:textH};
	myWindow.add("statictext", bounds, "Widget Version:");

	bounds = {x:(textW/2)+margin, y:yLayout, width:textW/2, height:textH};
	myWindow.add("statictext", bounds, "Minimum Y! Version:");

	yLayout += textH;
	bounds = {x:margin, y:yLayout, width:(textW/2)-margin, height:textH};
	myWindow.widgetVersion = myWindow.add("edittext", bounds, widgetInfo.widgetVersion);

	bounds = {x:(textW/2)+margin, y:yLayout, width:(textW/2), height:textH};
	myWindow.widgetMinVersion = myWindow.add("edittext", bounds, widgetInfo.minVersion);

	yLayout += textH + margin;
	bounds = {x:margin, y:yLayout, width:180, height:textH};
	myWindow.add("statictext", bounds, "Destination:");

	yLayout += textH;
	bounds = {x:margin, y:yLayout, width:textW-buttonW-margin-5, height:textH}; // 5px smaller
	myWindow.fileDestination = myWindow.add("edittext", bounds, widgetInfo.theSavePath);

	bounds = {x:margin+textW-buttonW-5, y:yLayout, width:buttonW+5, height:buttonH}; // 5px wider
	myWindow.buttonBrowse = myWindow.add("button", bounds, "Browse...");
	myWindow.buttonBrowse.onClick = buttonBrowseOnClick;

	yLayout += textH + margin;
	bounds = {x:margin, y:yLayout, width:textW, height:textH};
	myWindow.checkboxFullWidget = myWindow.add( "checkbox", bounds, "Build Full Widget");
	myWindow.checkboxFullWidget.value = widgetInfo.createFullWidget;

	yLayout += textH + margin;
	bounds = {x:margin, y:yLayout, width:textW, height:textH};
	myWindow.checkboxDebug = myWindow.add( "checkbox", bounds, "Enable Widget's Debug Mode");
	myWindow.checkboxDebug.value = widgetInfo.enableDebug;

	yLayout += textH + margin;
	bounds = {x:margin, y:yLayout, width:textW, height:textH};
	myWindow.checkboxShadow = myWindow.add( "checkbox", bounds, "Enable Widget Drop Shadow");
	myWindow.checkboxShadow.value = widgetInfo.aquaShadow;

	yLayout += textH + margin;
	bounds = {x:margin, y:yLayout, width:textW, height:textH};
	myWindow.checkboxHiddenLayers = myWindow.add( "checkbox", bounds, "Build Widget With Hidden Layers");
	myWindow.checkboxHiddenLayers.value = widgetInfo.addHiddenLayers;


	myWindow.center();
	var result = myWindow.show();
	if ( 0 == result ) return result;  // close to quit

	widgetInfo.theWidgetName = myWindow.widgetName.text;
	widgetInfo.theWidgetAuthor = myWindow.widgetAuthor.text;
	widgetInfo.widgetVersion = myWindow.widgetVersion.text;
	
	if( isNaN( Number( myWindow.widgetMinVersion.text ) ) || Number( myWindow.widgetMinVersion.text ) < 4 )
		widgetInfo.minVersion = "4.0";
	else
		widgetInfo.minVersion = myWindow.widgetMinVersion.text;
	
	widgetInfo.aquaShadow = myWindow.checkboxShadow.value;
	widgetInfo.enableDebug = myWindow.checkboxDebug.value;
	widgetInfo.createFullWidget = myWindow.checkboxFullWidget.value;
	widgetInfo.theSavePath = myWindow.fileDestination.text;
	widgetInfo.addHiddenLayers = myWindow.checkboxHiddenLayers.value

	instructionData = widgetInfo.widgetVersion + "," + widgetInfo.minVersion + ",";
	instructionData = (widgetInfo.aquaShadow) ? instructionData + "1," : instructionData + ",";
	instructionData = (widgetInfo.createFullWidget) ? instructionData + "1," : instructionData + ",";
	instructionData = (widgetInfo.enableDebug) ? instructionData + "1," : instructionData + ",";
	instructionData = (widgetInfo.addHiddenLayers) ? instructionData + "1" : instructionData + "";

	app.activeDocument.info.instructions = instructionData;
	app.activeDocument.info.title = widgetInfo.theWidgetName;
	app.activeDocument.info.author = widgetInfo.theWidgetAuthor;

	return result;
}

function buttonBrowseOnClick() // call back function
{
	var defaultFolder = this.parent.fileDestination.text;
	var testFolder = new Folder(this.parent.fileDestination.text);
	if (!testFolder.exists) defaultFolder = "";
	var selFolder = Folder.selectDialog("Please choose a destination folder:", defaultFolder);
	if ( selFolder != null ) {
		this.parent.fileDestination.text = selFolder.toString();
	}
	return;
}

function buttonRunOnClick()
{
	this.parent.close(1);
}


// This function is responsible for writing the Header portion of the .kon file
function writeWidgetHeader(myFile, docRefName, widgetInfo)
{
	var docRef = activeDocument;

	var widgetXmlFile = new File( widgetInfo.theSavePath +'/' + widgetInfo.theWidgetName + '.widget/Contents/widget.xml' );
	widgetXmlFile.open( 'w', 'TEXT','K0nF' );

	widgetXmlFile.writeln( '<?xml version="1.0" encoding="utf-8"?>' );
	widgetXmlFile.writeln( '<metadata>');
	widgetXmlFile.writeln( '	<name>' + widgetInfo.theWidgetName + '</name>' );
	widgetXmlFile.writeln( '	<version>' + widgetInfo.widgetVersion + '</version>' );

	if( widgetInfo.theWidgetAuthor != '' )
	{
		widgetXmlFile.writeln( '	<author name = "' + widgetInfo.theWidgetAuthor.replace(/\"/g,'') + '" />' );
	}

	if( docRef.info.copyrightNotice != '' )
	{
		widgetXmlFile.writeln( '	<copyright>' + docRef.info.copyrightNotice + '</copyright>' );
	}

	if( docRef.info.caption != '' )
	{
		widgetXmlFile.writeln( '	<description>' + docRef.info.caption.replace(/\n/g,' ') + '</description>' );
	}

	widgetXmlFile.writeln( '	<platform minVersion = "' + widgetInfo.minVersion + '" />' );
	widgetXmlFile.writeln( '</metadata>');

	widgetXmlFile.close();

	myFile.writeln( '<?xml version="1.0" encoding="utf-8"?>' );
	myFile.writeln( '<widget minimumVersion="' + widgetInfo.minVersion + '">' );
	myFile.writeln( '	<settings>' );
	if (widgetInfo.enableDebug)
	{
		myFile.writeln( '		<setting debug = "on" />' );
	}
	else
	{
		myFile.writeln( '		<setting debug = "off" />' );
	}
	myFile.writeln( '	</settings>' );

	myFile.writeln( '' );

	myFile.writeln('<!--');
	myFile.writeln('	 ' + widgetInfo.theWidgetName);
	if (docRef.info.copyrightNotice != '') myFile.writeln(docRef.info.copyrightNotice);
	if (widgetInfo.theWidgetAuthor !='') myFile.writeln('	 Written by: '+ widgetInfo.theWidgetAuthor);
	if (widgetInfo.theWidgetAuthor !='' || docRef.info.title != '') myFile.writeln('');
	if (docRef.info.caption != '')
	{
		myCaption = docRef.info.caption.split("\n");
	
		for (line in myCaption)
		{
			myFile.writeln('	 ' + myCaption[line]);
		}
		myFile.writeln('');
	}
	myFile.writeln('	 Generated by Photoshop Widget Generator Script');
	myFile.writeln('	 Copyright (C) 2004 - 2007 Yahoo!, Inc. All Rights Reserved.');
	myFile.writeln('');
	myFile.writeln('	 Any modifications will be lost if the generation script is run again.');
	myFile.writeln('-->');
	myFile.writeln('');
}

/*  This function is for removing units suffixes that Photoshop 8 sticks in.  */
function fixValue(theValue)
{
	theValue = String(theValue).replace(/ px| pt/, '');
	return theValue;
}

/*  This function is for removing spaces in layer names and convertingThemToCamelCase.  */
function camelCase(theValue)
{
	theValue = theValue.toLowerCase().replace(/[^\w ]/g, "");
	var theNewValue = "";
	var capTheChar = false;
	for (var i = 0; i < theValue.length; i++)
	{
		var c = theValue.charAt(i);
		if (c == " " && theNewValue.length > 0)
			capTheChar = true;
		else if (c != " ")
		{
			if (capTheChar)
			{
				theNewValue += c.toUpperCase();
				capTheChar = false;
			}
			else
				theNewValue += c;
		}
	}
	return theNewValue;
}

// This function does most of the hard work and is responsible for extracting the layer information
// contained within the Photoshop document and building the representations of them in the generated
// .kon file.  It also merges and extracts the contents of each art layer into a separate .png file.
// If it encounters a text layer, it will ask whether to rasterize it or keep it as plain text.
function writeLayerDefinitions(myFile, resource_dir, widgetInfo)
{
	var origVisibilities = [];
	var docRef = activeDocument;

	// Save original document state so that we can return to it when done
	var originalDocumentState = docRef.activeHistoryState;

	// Delete hidden layers
	numLayers = docRef.artLayers.length;
	do
	{
		numLayers = docRef.artLayers.length;
		mustRestart = false;
		for (var i = 0; i < numLayers; i++)
		{
			if ( docRef.layers[i].visible == false )
			{
				docRef.layers[i].remove();
				mustRestart = true;
				break;
			}
		}
	}
	while (mustRestart);
	// Merge any grouped or embedded art layers in top down order	
	do
	{
		numLayers = docRef.artLayers.length;
		mustRestart = false;
		for (var i = numLayers-1; i >= 0; i--)
		{
			if (docRef.artLayers[i].grouped)
			{
				docRef.artLayers[i].merge();
				mustRestart = true;
				break;
			}
		}
	}
	while (mustRestart);

	// Now process remaining layers
	numLayers = docRef.layers.length;

	// Save original layer visibilities (not needed any longer)
	for (var i = 0; i < numLayers; i++)
	{
		origVisibilities[i] = docRef.layers[i].visible;
		docRef.layers[i].visible = false;
	}
		
	// Scan layers and extract information to build representation in .kon file
	// Also, extract each individual layer and save as a separate .png file
	for (var i = (numLayers-1); i >= 0; i--)
	{	
		if (docRef.layers[i].blendMode != "BlendMode.NORMAL")
		{
			if (!nonNormalAlert) alert ( "This file contains layers that use a blend mode other than \"Normal\".\nBe aware that as a Widget, the layers that don't use \"Normal\" may not blend as you'd expect." );
			nonNormalAlert = true;
		}
		if ( origVisibilities[i] == true || widgetInfo.addHiddenLayers == true)
		{
			// Ask user if they would like to have the text layer rasterized
			var rasterizeText = true;
			if (docRef.layers[i].kind == LayerKind.TEXT)
			{
				rasterizeText = confirm('Make text layer "'+ docRef.layers[i].name +'" into an image?');
			}
		
			// If 'false' and is a Text layer, treat the text as a Konfabulator <text> object.
			// Extract position, font, size, alignment, etc. for building representation in .kon file
			if (!rasterizeText && (docRef.layers[i].kind == LayerKind.TEXT))
			{
				var textStyleString = '			style		= "'; 
			
				var pos = docRef.layers[i].textItem.position;
				var newVOffset = Math.round(fixValue(pos[1]));

				if (docRef.layers[i].textItem.kind == TextType.PARAGRAPHTEXT)
					newVOffset -= 3;

				myFile.writeln( '		<text');
				myFile.writeln( '			data		= "' + docRef.layers[i].textItem.contents + '"' );
				myFile.writeln( '			name		= "' + camelCase(docRef.layers[i].name) +'"' );

				if (Math.round(fixValue(pos[0])) != 0)
					myFile.writeln( '			hOffset		= "' + Math.round(fixValue(pos[0])) + '"' );
				if (newVOffset != 0)
					myFile.writeln( '			vOffset		= "' + newVOffset + '"' );

				if (docRef.layers[i].textItem.kind == TextType.PARAGRAPHTEXT)
				{
					myFile.writeln( '			width		= "' + Math.round(fixValue(docRef.layers[i].textItem.width)) + '"' );
					myFile.writeln( '			height		= "' + Math.round(fixValue(docRef.layers[i].textItem.height)) + '"' );
					myFile.writeln( '			wrap		= "true"' );
				}

				textStyleString += "font-family: '" + fonts[docRef.layers[i].textItem.font].name + "';";
				
				textStyleString += " font-size: " + Math.round(fixValue(docRef.layers[i].textItem.size)) + "px;";

				if (docRef.layers[i].textItem.color.rgb.hexValue != "000000" )
					textStyleString += " color: #" + docRef.layers[i].textItem.color.rgb.hexValue + ";";

				if (docRef.layers[i].textItem.justification == Justification.CENTER)
				{
					var align = 'center';
				}
				else if (docRef.layers[i].textItem.justification == Justification.RIGHT)
				{
					var align = 'right';
				}
				else
				{
					var align = 'left';
				}

				if ( align != "left" )
					textStyleString += " text-align: '" + align + "';";


				if (origVisibilities[i] == false)
				{
					textStyleString += " opacity: 0.0;";
				}
				else
				{
					if (docRef.layers[i].opacity != 100)
						textStyleString += " opacity: " + (Math.round(docRef.layers[i].opacity)/100) + ";";
				}

				textStyleString += '"'

				myFile.writeln( textStyleString );

				myFile.writeln('		/>');
			}
			else
			{ // Treat layer as an image layer

				// Make current layer visible
				docRef.layers[i].visible = true;
			
				// Cache name (I've hit a strange problem where "Background" can becaome "Layer 0"
				theLayerName = docRef.layers[i].name;

     				// Save original width and height of document to compute hOffset and vOffset of layer
				beforeWidth = docRef.width;
				beforeHeight = docRef.height;

				// Save current document state as a restore point
				savedState = docRef.activeHistoryState;
			
				// Trim away all transparent pixels to the left and above of layer content
				if (theLayerName != "Background")
				{
					docRef.trim(TrimType.TRANSPARENT, true, true, false, false);
				}
			
				// hOffset and vOffset is the original dimensions minus the resulting dimensions
				hOffset = beforeWidth - (docRef.width * 1);
				vOffset = beforeHeight - (docRef.height * 1);

				// Trim the bottom and right portions to: a) get width and height info, and b) to save as a .png
				if (theLayerName != "Background")
				{
					docRef.trim(TrimType.TRANSPARENT, false, false, true, true);
				}

				var theNewLayerName = camelCase(theLayerName);
				
                                layerWidth = docRef.width ;
                                layerHeight = docRef.height;

				// Extract layer details for .kon representation
				myFile.writeln( '		<image');
				myFile.writeln( '			src			= "Resources/' + theNewLayerName +'.png"' );
				myFile.writeln( '			name		= "' + theNewLayerName +'"' );
				myFile.writeln( '			width		= "' + layerWidth +'"' );
				myFile.writeln( '			height		= "' + layerHeight +'"' );

				if (fixValue(hOffset) != 0)
					myFile.writeln( '			hOffset		= "' + fixValue(hOffset) +'"' );

				if (fixValue(vOffset) != 0)
					myFile.writeln( '			vOffset		= "' + fixValue(vOffset) +'"' );

				if (origVisibilities[i] == false)
					myFile.writeln( '			opacity		= "0"' );
				else if (docRef.layers[i].opacity != 100)
					myFile.writeln( '			opacity		= "' + Math.floor(255*(docRef.layers[i].opacity/100)) +'"' );

				myFile.writeln( '		/>');

				// Set to full opacity before extracting, otherwise we would be essentially doubling the opacity
				// (once during rendering in Photoshop, and again when Konfabulator interprets the opacity attribute)
				docRef.layers[i].opacity = 100;
			
				// Extract layer into separate .png file
				if (widgetInfo.createFullWidget)
				{
					pngFile = new File(resource_dir +'/'+ theNewLayerName +'.png');
				}
				else 
				{
					pngFile = new File(widgetInfo.theSavePath +'/' + widgetInfo.theWidgetName + '.widget/Contents/Resources/'+ theNewLayerName +'.png');
				}
				saveForWebPNG(pngFile);

				// Restore to pre-Trim state
				docRef.activeHistoryState = savedState;
			
				// Clean up
				delete pngFile;
				delete pngSaveOptions;
				delete savedState;
			
				// Done working on this layer, hide it
				docRef.layers[i].visible = false;
			}
		
			myFile.writeln('');
		}
	}

	// Restore original document state
	docRef.activeHistoryState = originalDocumentState;

	// Restore original document layer visibilities
	for (i = 0; i < numLayers; i++)
	{
		docRef.layers[i].visible = origVisibilities[i];
	}
}

// This function is responsible for writing out the <window> block of the .kon file.
// The .kon file representation is based on the current Photoshop active document values.
function writeWindowDefinition(myFile, docRefName, widgetInfo)
{
	var docRef = activeDocument;

	myFile.writeln('	<window');
	myFile.writeln('		title		= "' + widgetInfo.theWidgetName + '"');
	myFile.writeln('		name		= "mainWindow"');
	myFile.writeln('		width		= "' + fixValue((docRef.width * 1)) + '"');
	myFile.writeln('		height		= "' + fixValue((docRef.height * 1)) + '"');
	myFile.writeln('		visible		= "true"');

	if (widgetInfo.aquaShadow)
		myFile.writeln('		shadow		= "true"');
	else
		myFile.writeln('		shadow		= "false"');

	myFile.writeln('	>');
	myFile.writeln('');
}

// This function is responsible for finishing up the .kon file.  Closes off the
// window and widget definitions.
function writeWidgetFooter(myFile)
{
	myFile.writeln('	</window>');
	myFile.writeln('');
	myFile.writeln('</widget>');
}

// This function write out the overall layout of the widget, the window representation
// and the layer representations.
function writeWidgetLayout(myFile, resource_dir, docRefName, widgetInfo)
{
	writeWindowDefinition(myFile, docRefName, widgetInfo);
	writeLayerDefinitions(myFile, resource_dir, widgetInfo);
}

// This is the main function used to begin code generation for the widget.
function createWidget(widgetInfo)
{
	var safeDocRef = activeDocument;
	var docRef = safeDocRef.duplicate();

	// Get document name and remove '.psd' extension (if present) from generated name
	var docRefName = safeDocRef.name;
	docRefName = docRefName.replace('.psd', '');

	// Remember original ruler Unit preference
	var origUnit = preferences.rulerUnits;

	// Set rulerUnits to PIXELS for the duration of this script.
	preferences.rulerUnits = Units.PIXELS;

	if (widgetInfo.createFullWidget)
	{
		var widget_dir = widgetInfo.theSavePath +'/' + widgetInfo.theWidgetName + '.widget';
		widgetDir = new Folder(widget_dir);
		widgetDir.create();
	
		var contents_dir = widgetInfo.theSavePath +'/' + widgetInfo.theWidgetName + '.widget/Contents';
		contentsDir = new Folder(contents_dir);
		contentsDir.create();

		var resource_dir = widgetInfo.theSavePath +'/' + widgetInfo.theWidgetName + '.widget/Contents/Resources';
		resDir = new Folder(resource_dir);
		resDir.create();
	
		// Backup existing .kon file if present.
		// Using a .txt extension instead of .kon to avoid confusion.
		var origName = widgetInfo.theSavePath +'/' + widgetInfo.theWidgetName + '.widget/Contents/'+ widgetInfo.theWidgetName +'.kon';
		var backName = widgetInfo.theSavePath +'/' + widgetInfo.theWidgetName + '.widget/Contents/'+ widgetInfo.theWidgetName +' backup.txt';
		origFile = new File(origName);
		if (origFile.open('r', 'TEXT','K0nF'))
		{
			backFile = new File(backName);
			backFile.open('w', 'TEXT','R*ch');
			while (!origFile.eof)
			{
				line = origFile.readln();
				backFile.writeln(line);
			}
			origFile.close();
			backFile.close();
		}
	
		// Open .kon file to hold generated code
		var filename = widgetInfo.theSavePath +'/' + widgetInfo.theWidgetName + '.widget/Contents/'+ widgetInfo.theWidgetName +'.kon';
	
	} else {

		// Create Resources folder (if none exists) to hold rendered images
		var resource_dir = widgetInfo.theSavePath +'/Resources';
		resDir = new Folder(resource_dir);
		resDir.create();
	
		// Backup existing .kon file if present.
		// Using a .txt extension instead of .kon to avoid confusion.
		var origName = widgetInfo.theSavePath +'/'+ docRefName +'.kon';
		var backName = widgetInfo.theSavePath +'/'+ docRefName +' backup.txt';
		origFile = new File(origName);
		if (origFile.open('r', 'TEXT','K0nF'))
		{
			backFile = new File(backName);
			backFile.open('w', 'TEXT','R*ch');
			while (!origFile.eof)
			{
				line = origFile.readln();
				backFile.writeln(line);
			}
			origFile.close();
			backFile.close();
		}
	
		// Open .kon file to hold generated code
		var filename = widgetInfo.theSavePath +'/'+ docRefName +'.kon';
	}

	myFile = new File(filename);
	myFile.open('w', 'TEXT','K0nF');

	// Write out data...
	writeWidgetHeader(myFile, docRefName, widgetInfo);
	writeWidgetLayout(myFile, resource_dir, docRefName, widgetInfo);
	writeWidgetFooter(myFile);

	// Close it up
	myFile.close();

	// Clean up and return things to original settings
	docRef.trim(TrimType.TRANSPARENT, true, true, true, true);
	preferences.rulerUnits = origUnit;
	docRef.close(SaveOptions.DONOTSAVECHANGES);
}

function setUpDialogInfo(widgetInfo)
{
	if (app.activeDocument.info.instructions == "")
	{
		var instructionData = "1.0,4.0,,1,,";
		app.activeDocument.info.instructions = instructionData;
	}
	else
	{
		var instructionData = app.activeDocument.info.instructions;
	}

	instructionData = instructionData.split(",");

	widgetInfo.widgetVersion = instructionData[0];
	widgetInfo.minVersion = instructionData[1];
	widgetInfo.aquaShadow = instructionData[2];
	widgetInfo.createFullWidget = instructionData[3];
	widgetInfo.enableDebug = instructionData[4];
	widgetInfo.addHiddenLayers = instructionData[5];

	if (app.activeDocument.info.title)
	{
		widgetInfo.theWidgetName = app.activeDocument.info.title;
	}
	else
	{
		widgetInfo.theWidgetName = app.activeDocument.name.replace('.psd', '');
	}

	if (app.activeDocument.info.author)
	{
		widgetInfo.theWidgetAuthor = app.activeDocument.info.author;
	}
	else
	{
		widgetInfo.theWidgetAuthor = "";
	}

	try {
		widgetInfo.theSavePath = String(app.activeDocument.path);
	} catch(someError) {
		if (isMac)
		{
			widgetInfo.theSavePath = "~/Desktop";
		}
		else
		{
			widgetInfo.theSavePath = "";
		}
	}
}

function saveForWebPNG( filePath )
{
	var id48 = charIDToTypeID( "Expr" );
		var desc7 = new ActionDescriptor();
		var id49 = charIDToTypeID( "Usng" );
			var desc8 = new ActionDescriptor();
			var id50 = charIDToTypeID( "Op  " );
			var id51 = charIDToTypeID( "SWOp" );
			var id52 = charIDToTypeID( "OpSa" );
			desc8.putEnumerated( id50, id51, id52 );
			var id53 = charIDToTypeID( "Fmt " );
			var id54 = charIDToTypeID( "IRFm" );
			var id55 = charIDToTypeID( "PN24" );
			desc8.putEnumerated( id53, id54, id55 );
			var id56 = charIDToTypeID( "Intr" );
			desc8.putBoolean( id56, false );
			var id57 = charIDToTypeID( "Trns" );
			desc8.putBoolean( id57, true );
			var id58 = charIDToTypeID( "Mtt " );
			desc8.putBoolean( id58, true );
			var id59 = charIDToTypeID( "MttR" );
			desc8.putInteger( id59, 255 );
			var id60 = charIDToTypeID( "MttG" );
			desc8.putInteger( id60, 255 );
			var id61 = charIDToTypeID( "MttB" );
			desc8.putInteger( id61, 255 );
			var id62 = charIDToTypeID( "SHTM" );
			desc8.putBoolean( id62, false );
			var id63 = charIDToTypeID( "SImg" );
			desc8.putBoolean( id63, true );
			var id64 = charIDToTypeID( "SSSO" );
			desc8.putBoolean( id64, false );
			var id65 = charIDToTypeID( "SSLt" );
				var list1 = new ActionList();
			desc8.putList( id65, list1 );
			var id66 = charIDToTypeID( "DIDr" );
			desc8.putBoolean( id66, false );
			var id67 = charIDToTypeID( "In  " );
			desc8.putPath( id67, filePath );
		var id68 = stringIDToTypeID( "SaveForWeb" );
		desc7.putObject( id49, id68, desc8 );
	executeAction( id48, desc7, DialogModes.NO );
}

function main()
{
	if ( app.documents.length <= 0 ) {
		alert( "No Open Documents\nYou must have a document open to create a Widget from." );
		return;
	}
	var widgetInfo = new Object();
	setUpDialogInfo(widgetInfo);
	if (0 == makeDialog(widgetInfo)) return;
	var widgetName = widgetInfo.theWidgetName;
	if (widgetName.match(/[\!|\?]/) && !isMac) {
		alert ( "Bad File Name\nThe file name you're using contains characters that will not work on Windows." );
		main();
		return;
	}
	var destination = widgetInfo.theSavePath;
	if (destination.length == 0) {
		alert("Please Specify Destination\nIn order to save your Widget, you need to specify a destination folder for it.");
		main();
		return;
	}
	createWidget(widgetInfo);
	alert("Creation Is Complete\nA Widget has been created from your document and is ready to go!");
}

main();