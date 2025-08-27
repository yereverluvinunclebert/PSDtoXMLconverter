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

# Basic Tutorial - How to create a Yahoo Widget by yereverluvinuncleber on DeviantArt

I'd be happy to show you the basics, it is really quite straightforward - if not simple. I create all my widgets first as Yahoo /Konfabulator widgets as the process is the easiest of all the engines. Then I convert to other widget engines as I wish, taking the code and porting it.

To create a Konfabulator or Yahoo widget is really just a few steps. First of all, take your image, pull it into Photoshop.

[![click to download the script from Adobe](https://i.imgur.com/BHpNHjm.png "punk-camera.png")](https://www.deviantart.com/users/outgoing?https://helpx.adobe.com/creative-suite/kb/cs2-product-downloads.html "click to download the script from Adobe")I use Photoshop CS to create the design. Every mature development environment has its own IDE but despite being mature, the yahoo widget engine does not have an IDE, a glaring omission on the part of the original developers but one which allowed them to focus on the widget engine itself. Instead of an IDE, the yahoo widget developer is allowed to graphically develop using any tool he wants. In my case, I create highly individual graphic widgets, one of which is shown left. To create these I use Photoshop and so it becomes my IDE of choice.

Photoshop CS is the oldest version of Photoshop. It is a superb product and can do everything the later versions can do in respect of design and creativity. Later versions offer enhancements that can be useful but most are unnecessary. The earlier version is also much faster to operate and respond. Regardless, all that is demonstrated here is fundamentally the same in the later versions. FYI, you can get older versions of all the Adobe products entirely for free. All you need to do is register at adobe. The link to the old versions is here: [helpx.adobe.com/creative-suite…](https://www.deviantart.com/users/outgoing?https://helpx.adobe.com/creative-suite/kb/cs2-product-downloads.html)

![photoshop](https://i.imgur.com/zxreYS9.jpg "photoshop")

Photoshop uses layers. Each cog, individual component exists on a layer and you paint it on that layer using the various methods that Photoshop has to do that. You can add shadows, internal gradients, colours, glows and the like using Photoshop tools. You build up the design in layers, each layer having a separate item on it.

Then you group the layers in layer sets or groups according to![Photoshop layers windows](https://i.imgur.com/f8gKWg2.png "Photoshop layers windows") their function on the widget. So, the chain and arm on the steampunk clock is created as a layer set or group as it is going to be moved as a

single group of components

. Fundamentally anything that is going to perform a function needs to be created as a layer set or group.

Naming the layers correctly is vital at this stage, every layer and group should be named according to its function. A silver ball on the end of the bar needs to be called something like "RH silver ball slider bar". Groups need to be named appropriately after their function, the slider group for example should be called "slider". A group of layers that will be a moving component, for example a crank handle, needs to be named? Yes you've guessed it - "crank handle"!

Note: Each layer in your design needs to have a transparent background or the background will appear on your finished widget.

When the design is done and saved, you simply run a Photoshop script that was provided by the Konfabulator/Yahoo Widget developers. This script is run within Photoshop and converts the photoshop design groups and layers to Yahoo widget entities. The script creates a basic widget automatically. It creates an XML file that describes each group or layer object's properties, ie: height, width, x and y offsets. It also creates a PNG transparent image for each layer and group as an individual object and stores them in a \\Resources folder created especially for the new widget.

![bit s and pieces](https://i.imgur.com/jnCaBm0.jpg "bit s and pieces")

The script is now available here:

\[ Photoshop script to create a widget \]  
[![2.0 Photoshop Yahoo Widget creation script by yereverluvinuncleber](https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/a1801b85-b94c-478d-993b-c405a5efbd4d/dbbij73-ba22febf-f99c-4fec-baa4-af828f6e6607.png/v1/fit/w_150,h_150,q_70,strp/2_0_photoshop_yahoo_widget_creation_script_by_yereverluvinuncleber_dbbij73-150.jpg)](https://www.deviantart.com/yereverluvinuncleber/art/2-0-Photoshop-Yahoo-Widget-creation-script-684468399 "2.0 Photoshop Yahoo Widget creation script by yereverluvinuncleber, Jun 4, 2017")  
Click the above image and it will take you to the page.  
[](https://www.deviantart.com/users/outgoing?https://lightquick.co.uk/downloads/photoshop-script-to-create-yahoo-widgets.html?Itemid=264 "https://lightquick.co.uk/downloads/photoshop-script-to-create-yahoo-widgets.html?Itemid=264")

You simply place it in the following folder:  DRIVE:\\Program Files\\Adobe\\Photoshop CS\\Presets\\Scripts

The script is called from the scripts menu.

A small PSD file with one or two layers will take no longer than 30 seconds to a minute or two to render into a widget. When done, copy the whole widget into a development location on your drive so that you don't accidentally overwrite it when you re-run the script.

[![My Steampunk Clock/Calendar Widget](https://i.imgur.com/c09ODMF.png "My Steampunk Clock/Calendar Widget")](https://www.deviantart.com/users/outgoing?http://rocketdock.com/addon/misc/39487)  
My steampunk clock /calendar, which is a

very

complex, multi-layer high definition PSD takes approximately 20 mins to render into discrete objects. My machine is a core2duo 2.5ghz with 3gb Ram. The conversion process is fascinating to watch. The design is disassembled piece by piece, saved and then when the design has been completely deconstructed you will see it quickly reassemble and a widget is created before your eyes. You will need to close all other apps to free as much memory as you can if you are working with a very complex photoshop design.

The end result is a widget folder with the same name as your photoshop design, contained within a \\Resources folder and a file with the  .KON suffix. This .KON file is the thing you double-click upon, if the Yahoo widget engine is already installed it will then use the widget runtime engine to run your first Yahoo widget. It will run on your Windows or Mac OS/X desktop so you have a multi-platform widget, it will be movable but at this stage it won't actually do a whole lot. Howerver, it will have a right click menu and will be moveable, it will also appear on the widget dock.

[![click to get this widget](https://lightquick.co.uk/images/stories/stamp.png "click to get this widget")](https://www.deviantart.com/users/outgoing?https://lightquick.co.uk/jdownloads/british-penny-red-stamp-widget.html?Itemid=264 "click to get this widget")See here for my stamp widget that is basically the result of the above process:  
[](https://www.deviantart.com/users/outgoing?https://lightquick.co.uk/downloads/other-downloads.html)
[lightquick.co.uk/jdownloads/br…](https://www.deviantart.com/users/outgoing?https://lightquick.co.uk/jdownloads/british-penny-red-stamp-widget.html?Itemid=264)

This will demonstrate a fully functioning yahoo widget - In the resources folder you will find all your layered and grouped images created as individual portions of the design, broken down into their constituent components. You'll have all of these and the .KON file that describes where these components will be displayed. However, there is currently no code behind any of this that would be needed to make the various bits actually do anything. At the moment, it just looks pretty on the desktop and you can move it about. You could do the same with any image you have to hand. Note: Since I started to write this article I have added a bit of functionality to the stamp widget so there is now some more code for you to analyse.

So, to make it do anything you need to add some code, in the case of Yahoo widgets this is achieved with Javascript. To do this you need to create a .js file in the widget folder and call it from the .KON file. See Figure 1. below.

What you need to do next is to view [](https://www.deviantart.com/users/outgoing?https://lightquick.co.uk/downloads/yahoo-widget-converter.html?Itemid=264 "Download it here")other people's widgets so you can see how they are constructed. You can even copy/borrow code from them and see how things are done. Each widget's code is designed differently and in javascript there are many methods to obtain the same result. It is up to you how you do things. Have a look in my thermometers widget and open it using the widget converter.

Most widgets you will find come packaged up, zipped, so you have to unzip them before you can open them and see the contents. The widget converter that converts widgets back and forth between zip and folder formats is available here:

[](https://www.deviantart.com/users/outgoing?https://lightquick.co.uk/steampunk-widgets.html?Itemid=264 "https://lightquick.co.uk/steampunk-widgets.html?Itemid=264")
[lightquick.co.uk/downloads/yah…](https://www.deviantart.com/users/outgoing?https://lightquick.co.uk/downloads/yahoo-widget-converter.html?Itemid=264)

The cpu/gpu thermometer is not the best-written widget in the world. It was one of my first but it will still give you an idea as to how it is put together. The widget can be downloaded here:

[lightquick.co.uk/downloads/ste…](https://www.deviantart.com/users/outgoing?https://lightquick.co.uk/downloads/steampunk-cpu-gpu-temperature-monitor-yahoo-widget.html?Itemid=264)

[![click to get this widget](https://lightquick.co.uk/images/stories/photoshop-design.jpg "click to get this widget")](https://www.deviantart.com/users/outgoing?https://lightquick.co.uk/downloads/steampunk-cpu-gpu-temperature-monitor-yahoo-widget.html?Itemid=264)Assuming you have decompressed and opened my thermometers widget you'll have a widget folder and a few files within. Open the .KON file and you will see a call to thermometer.js. This action trigger line causes the.KON file to call a javascript program called thermometer.js. It does this when the widget loads and immediately after runs a function called startup. The startup function would be the main program function.

Figure 1.  
<action trigger="onload"> <!\[CDATA\[  
    include("thermometers.js");  
    startup();  
// \]\]> </action>

For each object in the .KON file you can add some javascript code to handle a mouse drag or click event. You can see how this is done by opening thermometer.js in my widget and having a poke around. You can add similar code to your widget. Then it is all up to you. You might get more of an idea from the steampunk clock widget as it is a lot more complicated and has more functions to comprehend. Here is an example of some typical code, a mix of XML and javascript:

<name>redTap3</name>  
<hOffset>951</hOffset>  
<vOffset>1257</vOffset>  
<opacity>255</opacity>  
<onMouseDown> <!\[CDATA\[  
        redTap3.rotation=redTap3.rotation +16;  
        if (preferences.muteswitchPref.value == "enable")  
        {  puffit();  };  
        if (bulbglow.visible == true)  
               {  
                   bulb.visible = false;  
                   bulbglow.visible = false;![You need an editor!](https://lightquick.co.uk/images/stories/steampunk-console.png "steampunk-console.png")        if (preferences.muteswitchPref.value == "enable")  
        {   
            play(suck,false);  };  
               }  
               else  
               {  
                      if (preferences.muteswitchPref.value ==    "enable")  
            {  play(zzzz,false);  };  
                      bulb.visible = true;  
                      bulbglow.visible = true;  
        }  
// \]\]> </onMouseDown>  
<visible>true</visible>

This demonstrates the mousedown event on an object called redtap3. In one of my widgets redtap3 is a red valve and when it is pressed the red valve rotates by sixteen percent. It then calls a function that emits a puff of steam. The next thing that occurs is that two images called bulb and bulbglow are made visible. You get the idea...

This shows how code can be attached to an image so that when it is clicked on something happens. This is XML code with javascript embedded between the

tags <!\[CDATA\[   and   // \]\]> . The same code could be called instead within the thermometer.js code and it would look like this:

//==============================  
// the tap turns...  
//==============================

redTap3.onMouseDown = function () {  
               redTap3.rotation=redTap3.rotation +16;  
        if (preferences.muteswitchPref.value == "enable")  
        {  puffit();  };  
        if (bulbglow.visible == true)  
               {  
                   bulb.visible = false;  
                   bulbglow.visible = false;  
        if (preferences.muteswitchPref.value == "enable")  
        {   
            play(suck,false);  };  
               }  
               else  
               {  
                      if (preferences.muteswitchPref.value == "enable")  
            {  play(zzzz,false);  };  
                      bulb.visible = true;  
                      bulbglow.visible = true;  
        }  
};

![You need an editor!](https://i.imgur.com/DoIpVUN.png "steampunk-console.png")Simple javascript. Now, even for simple widget/programming development there is often an IDE. There is unfortunately no IDE for Yahoo Widgets. Instead you'll need a decent editor. The ConTEXT editor is the one you'll most probably get to grips with straight out of the box. Open source. I use it ALL the time for everything as it really rather good. The editor is available here:

[](https://www.deviantart.com/users/outgoing?http://www.contexteditor.org)
[www.contexteditor.org](https://www.deviantart.com/users/outgoing?http://www.contexteditor.org)

New development has stopped on the context editor but don't let that put you off - it is still a very good, streamlined code and general editor. Notepad++ is another good alternative.

Without an IDE debugging can be difficult. So, for debugging there is a solution provided by the developers, a debugging window which shows errors during widget runtime. This functionality is difficult to find for some. So pay attention. ![:)](https://e.deviantart.net/emoticons/s/smile.gif ":) (Smile)") It is turned on by finding the Yahoo Widget Engine icon in the systray. Hovering over that icon and pressing shift+ctrl then right clicking on the mouse will bring up a menu with an extra hidden option - DEBUG. Click on it, enable it. Then close and restart your widget. This time the debug window will appear and any errors will be shown as debug messages.

A simpler way is to put these lines in the beginning of your .KON file.

<settings>  
<setting name="allowCustomObjectAttributes" value="true"/>  
<setting name="debug" value="on"/>  
</settings>

Top tip, if you are going to venture into widget development, backup your widget code EVERY time before you do any packaging/widget deletion. The widget engine has the nasty habit of occasionally removing your code entirely when you remove a widget, so you need to have backups. To prevent this don't store your development widgets in the default widget folder, put them elsewhere in a separate development folder.

I hope the above isn't daunting, once you know what to do it is easy. Creating that stamp widget took 15 minutes, creating the steampunk clock/calendar widget cumulatively took weeks of my time but it is VERY complex.

[](https://www.deviantart.com/users/outgoing?https://helpx.adobe.com/creative-suite/kb/cs2-product-downloads.html "click to download the script from Adobe")
[](https://www.deviantart.com/users/outgoing?https://helpx.adobe.com/creative-suite/kb/cs2-product-downloads.html "click to download the script from Adobe")
[](https://www.deviantart.com/users/outgoing?https://helpx.adobe.com/creative-suite/kb/cs2-product-downloads.html "click to download the script from Adobe")The two versions of Photoshop CS that I use are version 8.0 (Photoshop CS1) and Photoshop CS2. The script works with both these versions of Photoshop. A full blown version of Photoshop is fairly expensive but you need not worry as you can download the older but fully functional versions of Photoshop for free at the link above.

GIMP (the GNU Image Manipulation Program) can work with Photoshop layers and might be able to run a photoshop compatible script - I have not tried it. GIMP is free and you will be able to design a widget using it. I just do not know whether the conversion script would function. To manually create all the layers and export them individually to PNG files, then create the XML file to position the objects as a manual process is entirely feasible

and can be done using GIMP and an editor. It is just a little more slow and a bit more painful. My suggestion is to get a copy of Photoshop by hook or by crook!

Some might ask themselves why create a Yahoo widget at all? Well, the reason I do it is that the YWE! is the most elegant solutions of all the widget engines. It uses almost pure javascript which means that your code can be re-usable on the web with only a little migration. Also, using the process described above, it is much easier to create a Yahoo widget than say creating a Xwidget version of the same sort using the Xwidget IDE. The conversion to Xwidgets is relatively simple and I will document it here later. The javascript in the two engines is more or less identical.

It is as simple as this - when your chosen widget engine goes obsolete will the code still be usable elsewhere? With javascript the code will always work

somewhere

. Your investment in time is safe. The code will always be readable and usable. If the yahoo widget engine stops working then it can run under Xwidget, if Xwidget goes under then it can be ported to QT Widgets. Can the same be said of Rainmeter code? (A Rainmeter expert is welcome to answer this question)

As and when I get time I will drop some more screenshots here to illustrate the above Yahoo widget creation process.

![](https://orig12.deviantart.net/a5af/f/2015/124/9/8/windows_8_tablet_steampunk_widget_screenshot_by_yereverluvinuncleber-d8kmrim.png)

![](https://fc04.deviantart.net/fs71/i/2015/026/8/1/my_current_steampunk_desktop_by_yereverluvinuncleber-d8fh8mt.jpg)
