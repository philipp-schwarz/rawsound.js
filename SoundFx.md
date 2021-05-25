## SoundFx class

### Properties

| Name   | Type             | Description                         |
| ------ | ---------------- | ----------------------------------- |
| loaded | Boolean          | Indicates if a sound file is loaded |
| buffer | AudioBuffer      | Loaded sound data                   |
| volume | Number (0 - 1)   | Default volume                      |
| rate   | Number (0 - ...) | Playback speed                      |

### Constructor

**new SoundFx([file, volume, rate])**

Arguments are optional. Loads a sound file and sets default volume and playback rate.

```javascript
var sound = new SoundFx('sound/dog.mp3', 0.5, 1.25);
```

### Events

#### onLoad

Callback. Called when a sound file is loaded successfully.

```javascript
var sound = new SoundFx('sound/dog.mp3');
sound.onLoad = function() {
    console.log('SoundFx loaded');
}
```

### Methods

#### load(file)

Loads a sound file or base64 data URL.

```javascript
var sound = new SoundFx();
sound.load('sound/dog.mp3');
```

#### play([volume, rate])

Arguments are optional. Plays the loaded sound. Default volume and playback can be overridden.

```html
<button onclick="sound.play();">Play</button>
```

#### SoundFx.initEvent()

Static. You need to initialize sound by a user event like a click to disable the browsers autoplay blocking.

Call this function from a click event to enable sound. You can also just use play() instead, but initEvent is silent.

```html
<button onclick="SoundFx.initEvent();alert('game start');">Click to start game</button>
```

