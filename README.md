# PSDtoXMLconverter

Converts a PSD file to a series of XML descriptors within a KON file (XML)

A javascript program to be used with Photoshop

Place the script in the presets scripts folder under Photoshop, eg.

C:\Program Files (x86)\Adobe\Photoshop CS\Presets\Scripts

Load your PSD into Photoshop. Run the script.

File - scripts - create Widget 2.0

Choose an output folder.

The program will create a container folder with an images folder within.

The PSD layers will be exported to separate images of the same name.

An XML file will be created with a .KON suffix. This contains an XML description of each layer
including X and Y positions described as hOffset and vOffset in pixels.

If you have Yahoo widgets installed then a double-click on the KON file will create a floating 
desktop image with a right-click menu and a preference utility by default, with no effort.

Without Yahoo widgets you end up with a useful XML file that can be parsed and used by other programs, complete
with images extracted and ready to use in your program, regardless of language. All your programs needs to 
do is to be able to parse XML, read the data from it.

You can then place the images in an images folder within your program structure, load them into a collection 
and then use the XML to position them at design or runtime

Original script created by Arlo Rose of Konfabulator, then Yahoo Widgets. 
Modified by Harry Whitfield and myself.

