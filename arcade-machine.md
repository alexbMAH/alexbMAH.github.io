---
layout: page
title: Arcade Machine
permalink: /arcade/
---

This guide explains how to develop and publish games for Malmö University game development program’s arcade machine, currently found in section A3 of Orkanen, outside OR:A332.

![The arcade machine, in all its glory!](/assets/arcademachine.png)

As a game development framework, the arcade machine uses a modified version of the C#-based [MonoGame](http://www.monogame.net/) framework, which can be downloaded [here](https://github.com/alexbMAH/MAHArcade/raw/master/MAHArcadeSystemSetup.exe) in the form of an installer (including a Visual Studio template). A full example project (the game Breakanoid, currently installed on the arcade machine) can be found [here](https://github.com/alexdbaldwin/ab4645-Breakout) - excuse the lack of comments! Note that the project uses the [Farseer Physics Engine](https://farseerphysics.codeplex.com/), which is a convenient way to add physics to a MonoGame project (however, it doesn't cooperate particularly well with the modified version of MonoGame we use. I was able to overcome this problem by including the Farseer source code in my project directly instead of simply referencing the compiled .dll).

Those familiar with MonoGame (or XNA) development, will find the MAHArcade framework mostly unchanged from standard MonoGame, but there are a number of key differences:

* MAHArcade games are not executable files, they are DLL files which are loaded by a program installed on the arcade machine.
* A Game cannot be exited/closed manually - this is handled by the software installed on the arcade machine (and achieved by holding down both start buttons).
* A running game will be exited automatically if the input is idle for 90 seconds - so makes sure your cutscenes aren’t too long!
* Games run in fullscreen at a resolution of  1920x1080. This cannot be altered.
* Games are not permitted to open new windows.
* Since the arcade machine is not controlled with a keyboard and mouse, the classes Keyboard and Mouse are inaccessible, replaced instead by the static class InputHandler, which provides access to input states for the arcade machine’s buttons and joysticks. The details of how MAHArcade handles input can be found below, in the section Input.

## Preview Image/Banner:
Once installed on the arcade machine, the game can be selected from a menu. Every game should have an associated preview image, shown to the right of the menu when an option is selected and (optionally) a banner to show in the menu. The preview image should be a png image named GamePreviewInfoImage.png, with dimensions 1280x1024 pixels. The image can contain anything, but it is recommended that it displays at least the game’s name and instructions for controlling the game. 

![Example preview image.](/assets/GamePreviewInfoImage.png) 
<br>
*An example of a suitable (but basic) preview image.*

The menu banner should be a png image named GameBanner.png, with dimensions 512x64 pixels. The image should contain the game’s name. 

![Example preview image.](/assets/GameBanner.png)
<br>
*An example of a suitable banner.*

If no banner is provided, the name specified by the property GameDisplayName in Game1.cs will be used instead:

{% highlight csharp %}
public override string GameDisplayName { get { return "project-name"; } }
{% endhighlight %}


Both of these files must be placed in the Content/PreviewData subdirectory of the project (a default GamePreviewInfoImage.png is created in the correct location by the MAHArcade visual studio template). Make sure they are added to the visual studio project and the option “Copy to Output Directory” in the properties panel is set to “Copy always”.


## Publishing your game
Once you’ve completed your masterpiece, complete the following steps to get your game on the arcade machine:

1. Remember to add a preview image and game banner as described above.
2. Change the Visual Studio build configuration to Release and build the project.
3. In a file browser, navigate to the project’s bin/Windows/Release subdirectory and copy the Content folder, project-name.dll and AssemblyInfo.txt to a new folder with the same name as the first line in AssemblyInfo.txt.
4. Compress the folder and e-mail it to alexander.baldwin@mah.se with a suitable subject/message.
5. Alex will be kind enough to install your game for you if you did everything properly.

## Input

# InputHandler

InputHandler defines the following methods:

Name | Type | Description |
:--- | :--- | :---
InputIsIdle | Property: get boolean | Returns true if both joysticks are in their upright position and no button has been pressed since the previous update.
InputIdleTime | Property: get double | Returns a double representing the total number of seconds that InputIsIdle has been true.
InputSuppressed | Property: get boolean | Returns true if player input is blocked.
InputSuppressedTime | Property: get double | Returns a double representing the total number of seconds that InputSuppressed has been true.
InputState GetButtonState(PlayerIndex, PlayerInput) | Method | Given a PlayerIndex and a PlayerInput, returns an InputState.
bool IsButtonDown(PlayerIndex, PlayerInput, bool) | Method | Given a PlayerIndex and a PlayerInput, returns true if that input is pressed. Setting the optional third input argument to true returns whether the input was pressed in the previous update instead of the current one.
bool IsButtonUp(PlayerIndex, PlayerInput, bool) | Method | Given a PlayerIndex and a PlayerInput, returns true if that input is not pressed. Setting the optional third input argument to true returns whether the input was not pressed in the previous update instead of the current one.

<br>

# InputState

InputState is an enumeration indicating the status of a button/input.

Value | Description
:--- | :--- 
Up | The button was not pressed in the current or the previous update.
Down | The button was pressed in both the current and the previous update.
Pressed | The button was pressed in this update, but not the previous.
Released | The button was released in this update, but not in the previous.

<br>

# PlayerIndex

There are two sets of inputs, each owned by one player. The player is indicated using the PlayerIndex enumeration.

|Value |
|:--- |
|PlayerOne|
|PlayerTwo|

<br>

# PlayerInput

PlayerInput is an enumeration representing the available input buttons. The following table shows how the values relate to the buttons on the arcade machine, as well as buttons on the keyboard for use when testing.

Value | PlayerOne key-binding | PlayerTwo key-binding | Physical button
:--- | :--- | :--- | :---
None | N/A | N/A | No button
Start | Spacebar | Numpad 0 | Start button
Up | W | Up arrow | Joystick up
Down | S | Down arrow | Joystick down
Left | A | Left arrow | Joystick left
Right | D | Right arrow | Joystick right
A | M | Numpad 3 | Lower white button
B | J | Numpad 6 | Upper white button
Red | N | Numpad 5 | Red button
Blue | H | Numpad 4 | Blue button
Yellow | B | Numpad 2 | Yellow button
Green | G | Numpad 1 | Green button
Side | V | Numpad 7 | Side button

