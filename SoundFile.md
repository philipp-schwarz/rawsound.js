## SoundFile class

### Properties

| Name    | Type             | Description                         |
| ------- | ---------------- | ----------------------------------- |
| loaded  | Boolean          | Indicates if a sound file is loaded |
| playing | Boolean          | Indicates if the sound is playing   |
| paused  | Boolean          | Indicates if playing is paused      |
| buffer  | AudioBuffer      | Loaded sound data                   |
| volume  | Number (0 - 1)   | Default volume                      |
| rate    | Number (0 - ...) | Playback speed                      |

### Constructor

**new SoundFile([file, volume, rate])**

Arguments are optional. Loads a sound file and sets default volume and playback rate.

```javascript
var sound = new SoundFile('sound/rain.mp3', 0.5, 1.25);
```

### Events

#### onLoad

Callback. Called when a sound file is loaded successfully.

```javascript
var sound = new SoundFile('sound/rain.mp3');
sound.onLoad = function() {
    console.log('SoundFx loaded');
}
```

### Methods

#### load(file)

Loads a sound file or base64 data URL.

```javascript
var sound = new SoundFile();
sound.load('sound/rain.mp3');
```

#### play([volume, rate])

Arguments are optional. Plays the loaded sound. Default volume and playback can be overridden.

```html
<button onclick="sound.play();">Play</button>
```

#### playLoop([volume, rate])

Arguments are optional. Plays the loaded sound in an endless loop. Default volume and playback can be overridden.

```html
<button onclick="sound.play();">Play</button>
```

#### pause()

Pause a sound that is currently playing. Use resume() to continue.

```html
<button onclick="sound.pause();">Pause</button>
```

#### resume()

Resume playing a sound that is currently paused.

```html
<button onclick="sound.resume();">Resume</button>
```

#### stop()

Stop playing sound.

```html
<button onclick="sound.stop();">Stop</button>
```

#### SoundFile.initEvent()

Static. You need to initialize sound by a user event like a click to disable the browsers autoplay blocking.

Call this function from a click event to enable sound. You can also just use play() instead, but initEvent is silent.

```html
<button onclick="SoundFile.initEvent();alert('game start');">Click to start game</button>
```

