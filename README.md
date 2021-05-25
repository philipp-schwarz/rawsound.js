# rawsound.js

rawsound.js provides sound effects and loops for web projects and web based games. It uses [AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext) and [ES6 classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes).

It provides two classes

* SoundFx - for short sound effects
* SoundFile - for music and longer playing sounds 

The main difference is that **SoundFx** effects can <u>overlap</u> each other. When a second explosion(sound) occurs while a first explosion is still in progress, SoundFx is what you need.

Use **SoundFile** for background music, dialogues and sounds where overlapping is not required. These sounds can be <u>paused</u>, <u>resumed</u> and <u>looped</u> endlessly.

## API Documentation

Class documentation

* [SoundFx](SoundFx.md)
* [SoundFile](SoundFile.md)

Also see: Demo / Getting Started

### Cheatcheat

```javascript
var sfx = new SoundFx(file);
var sfx = new SoundFx(file, volume, rate);
sfx.play();
sfx.play(volume, rate);

var sfile = new SoundFile(file);
var sfile = new SoundFile(file, volume, rate);
sfile.play();
sfile.play(volume, rate);
sfile.playLoop();
sfile.playLoop(volume, rate);
sfile.pause();
sfile.resume();
sfile.stop();
```

## Demo

If you just want to see rawsound.js in action, open the demo:

ONLINE DEMO

## Getting started

Load SoundFile.js and SoundFx.js in the head or body of your HTML file.

```html
<script src="src/SoundFx.js"></script>
<script src="src/SoundFile.js"></script>
```

If you don't want to download this project, you can use a CDN of your choice for development. You should <u>not</u> use this in production.

```html
<script src="https://cdn.jsdelivr.net/gh/philipp-schwarz/rawsound.js/src/SoundFile.js"></script>
<script src="https://cdn.jsdelivr.net/gh/philipp-schwarz/rawsound.js/src/SoundFx.js"></script>
```

### Use a webserver

For development you need a webserver running at localhost. Any server will do.

Install (may require root)

```bash
npm install -g node-static
```

Run

```bash
static -p 8000
```

Open

http://localhost:8000/

You need to refresh the page every time you made changes to the code.

### Load a sound

Load an mp3 file into a SoundFx or SoundFile object:

```html
<script>
var dog = new SoundFx('sound/dog.mp3');
</script>
```

### Play a sound

Just call play() on your object:

```html
<button onclick="dog.play();">Play</button>
```

Woof - You did it!

### Troubleshooting

Make sure you have

* a webserver running
* played the first sound by a user event (onclick)

You cannot load mp3 files without a server. You cannot play sounds without the user permission - capture a click event for this purpose. You can do it without actually playing a noticeable sound:

```html
onclick="SoundFx.initEvent()"
```

Check the console for errors.

When you deliver your project using [Electron](https://www.electronjs.org/) or [Cordova](https://cordova.apache.org/), you no longer need a server or the click event.
