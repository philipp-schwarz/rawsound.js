class SoundFile {

	constructor(file, volume, rate) {

		// Events
		this._onLoad = function() {};

		// Variables
		this.loaded = false;
		this.buffer = null;
		this.source = null;
		this.volume = (typeof volume=='undefined' ? 0.5 : volume);
		this.rate = (typeof rate=='undefined' ? 1 : rate);

		this.playing = false;
		this.paused = false;

		this.playVolume = 0;
		this.playRate = 0;
		this.playTime = null;
		this.playLoopinging = null;
		this.offsetTime = 0;

		// Audio context
		SoundFx.init();
		this.context = SoundFx.context;

		if (file)
			this.load(file);
		
	}

	get onLoad() {
		throw new Error('onLoad is not accessible');
	}

	set onLoad(fun) {
		this._onLoad = fun;
		if (this.loaded)
			this._onLoad();
	}

	load(file) {

		// Base64 data URL
		if (file.substr(0,5) == 'data:') {
			var data = atob(file.split(',')[1]);
			var arrayBuffer = new ArrayBuffer(data.length);
			var arr = new Uint8Array(arrayBuffer);
			for (var i = 0; i < data.length; i++) {
				arr[i] = data.charCodeAt(i);
			}
			this.context.decodeAudioData(arrayBuffer, function(t) {
				return function(buffer) {
					t.buffer = buffer;
					t.loaded = true;
					t._onLoad();
				}
			}(this));
		}

		// Regular URL
		else {
			var request = new XMLHttpRequest();
			request.open('GET', file, true);
			request.responseType = 'arraybuffer';
			request.onload = function(t) {
				return function() {
					t.context.decodeAudioData(request.response, function(buffer) {
						t.buffer = buffer;
						t.loaded = true;
						t._onLoad();
					});
				}
			}(this);
			request.send();
		}

	}

	play(volume, rate) {
		this._play(false, volume, rate);
	}

	playLoop(volume, rate) {
		this._play(true, volume, rate);
	}

	_playCreateSource(offset, loop, volume, rate) {
		var context = this.context;

		var gain = context.createGain();
		gain.connect(context.destination);

		var source = context.createBufferSource();
		source.buffer = this.buffer;
		source.loop = loop;
		source.connect(gain);

		gain.gain.value = volume;
		source.playbackRate.value = rate;

		source.start(0, offset);
		this.source = source;
	}

	_play(loop, volume, rate) {

		if (this.playing)
			this.stop();

		if (!volume)
			volume = this.volume;

		if (!rate)
			rate = this.rate;

		if (this.buffer) {

			this._playCreateSource(0, loop, volume, rate);

			this.offsetTime = 0;
			this.playing = true;
			this.playTime = this.context.currentTime;

			this.playVolume = volume;
			this.playRate = rate;
			this.playLooping = loop;
		}

	}

	pause() {

		if (this.playing && !this.paused) {
			this.offsetTime += this.context.currentTime - this.playTime;
			this.paused = true;
			this.source.stop(0);
		}

	}

	resume() {
		if (this.paused) {

			if (!this.playLooping) {
				if (this.offsetTime * this.playRate > this.buffer.duration)
					return;
			}

			var offset = (this.offsetTime * this.playRate) % this.buffer.duration;
			this._playCreateSource(offset, this.playLooping, this.playVolume, this.playRate);

			this.playTime = this.context.currentTime;
			this.paused = false;
		}
	}

	stop() {
		if (this.playing) {
			this.source.stop(0);
		}
		this.playing = false;
		this.paused = false;
	}

	static init() {

		if (!SoundFx.context) {
			var AudioContext = window.AudioContext || window.webkitAudioContext;
			SoundFx.context = new AudioContext();
			if (!SoundFx.context.createGain)
				SoundFx.context.createGain = SoundFx.context.createGainNode;

			SoundFx.initEvent();
		}

	}

	static initEvent() {

		SoundFx.init();
		var context = SoundFx.context;

		var gain = context.createGain();
		gain.connect(context.destination);
		gain.gain.value = 0.01;

		var oscillator = context.createOscillator();
		oscillator.type = 'sine';
		oscillator.connect(gain);
		oscillator.frequency.setValueAtTime(500, context.currentTime);

		oscillator.start(context.currentTime);
		oscillator.stop(context.currentTime+0.01);

	}

}
