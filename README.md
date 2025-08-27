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

<img width="460" height="460" alt="BHpNHjm" src="https://github.com/user-attachments/assets/ee575270-3bd7-471d-b427-44599cc2a888" />

I use Photoshop CS to create the design. Every mature development environment has its own IDE but despite being mature, the yahoo widget engine does not have an IDE, a glaring omission on the part of the original developers but one which allowed them to focus on the widget engine itself. Instead of an IDE, the yahoo widget developer is allowed to graphically develop using any tool he wants. In my case, I create highly individual graphic widgets, one of which is shown left. To create these I use Photoshop and so it becomes my IDE of choice.

Photoshop CS is the oldest version of Photoshop. It is a superb product and can do everything the later versions can do in respect of design and creativity. Later versions offer enhancements that can be useful but most are unnecessary. The earlier version is also much faster to operate and respond. Regardless, all that is demonstrated here is fundamentally the same in the later versions. FYI, you can get older versions of all the Adobe products entirely for free. All you need to do is register at adobe.

Photoshop uses layers. Each cog, individual component exists on a layer and you paint it on that layer using the various methods that Photoshop has to do that. You can add shadows, internal gradients, colours, glows and the like using Photoshop tools. You build up the design in layers, each layer having a separate item on it.

Then you group the layers in layer sets or groups according to![Photoshop layers windows](https://i.imgur.com/f8gKWg2.png "Photoshop layers windows") their function on the widget. So, the chain and arm on the steampunk clock is created as a layer set or group as it is going to be moved as a

single group of components

. Fundamentally anything that is going to perform a function needs to be created as a layer set or group.

Naming the layers correctly is vital at this stage, every layer and group should be named according to its function. A silver ball on the end of the bar needs to be called something like "RH silver ball slider bar". Groups need to be named appropriately after their function, the slider group for example should be called "slider". A group of layers that will be a moving component, for example a crank handle, needs to be named? Yes you've guessed it - "crank handle"!

Note: Each layer in your design needs to have a transparent background or the background will appear on your finished widget.

When the design is done and saved, you simply run a Photoshop script that was provided by the Konfabulator/Yahoo Widget developers. This script is run within Photoshop and converts the photoshop design groups and layers to Yahoo widget entities. The script creates a basic widget automatically. It creates an XML file that describes each group or layer object's properties, ie: height, width, x and y offsets. It also creates a PNG transparent image for each layer and group as an individual object and stores them in a \\Resources folder created especially for the new widget.

![bit s and pieces](https://i.imgur.com/jnCaBm0.jpg "bit s and pieces")

You simply place it in the following folder:  DRIVE:\\Program Files\\Adobe\\Photoshop CS\\Presets\\Scripts

The script is called from the scripts menu.

A small PSD file with one or two layers will take no longer than 30 seconds to a minute or two to render into a widget. When done, copy the whole widget into a development location on your drive so that you don't accidentally overwrite it when you re-run the script.

 <img width="352" height="443" alt="c09ODMF" src="https://github.com/user-attachments/assets/e049e707-6c48-49f3-9b4e-6fd5ac0bbeba" />
My steampunk clock /calendar, which is a very complex, multi-layer high definition PSD takes approximately 20 mins to render into discrete objects. My machine is a core2duo 2.5ghz with 3gb Ram. The conversion process is fascinating to watch. The design is disassembled piece by piece, saved and then when the design has been completely deconstructed you will see it quickly reassemble and a widget is created before your eyes. You will need to close all other apps to free as much memory as you can if you are working with a very complex photoshop design.

The end result is a widget folder with the same name as your photoshop design, contained within a \\Resources folder and a file with the  .KON suffix. This .KON file is the thing you double-click upon, if the Yahoo widget engine is already installed it will then use the widget runtime engine to run your first Yahoo widget. It will run on your Windows or Mac OS/X desktop so you have a multi-platform widget, it will be movable but at this stage it won't actually do a whole lot. However, it will have a right click menu and will be moveable, it will also appear on the widget dock.

This will demonstrate a fully functioning yahoo widget - In the resources folder you will find all your layered and grouped images created as individual portions of the design, broken down into their constituent components. You'll have all of these and the .KON file that describes where these components will be displayed. However, there is currently no code behind any of this that would be needed to make the various bits actually do anything. At the moment, it just looks pretty on the desktop and you can move it about. You could do the same with any image you have to hand. Note: Since I started to write this article I have added a bit of functionality to the stamp widget so there is now some more code for you to analyse.

So, to make it do anything you need to add some code, in the case of Yahoo widgets this is achieved with Javascript. To do this you need to create a .js file in the widget folder and call it from the .KON file. See Figure 1. below.

What you need to do next is to view other people's widgets so you can see how they are constructed. You can even copy/borrow code from them and see how things are done. Each widget's code is designed differently and in javascript there are many methods to obtain the same result. It is up to you how you do things. Have a look in my thermometers widget and open it using the widget converter.

Most widgets you will find come packaged up, zipped, so you have to unzip them before you can open them and see the contents. The widget converter that converts widgets back and forth between zip and folder formats is available here

For each object in the .KON file you can add some javascript code to handle a mouse drag or click event. You can see how this is done by opening thermometer.js in my widget and having a poke around. You can add similar code to your widget. Then it is all up to you. You might get more of an idea from the steampunk clock widget as it is a lot more complicated and has more functions to comprehend. Here is an example of some typical code, a mix of XML and javascript:


![](https://orig12.deviantart.net/a5af/f/2015/124/9/8/windows_8_tablet_steampunk_widget_screenshot_by_yereverluvinuncleber-d8kmrim.png)

![](https://fc04.deviantart.net/fs71/i/2015/026/8/1/my_current_steampunk_desktop_by_yereverluvinuncleber-d8fh8mt.jpg)
