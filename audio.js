/* ==========================================================================
   BOTHROPS HUNT - GESTOR DE AUDIO SYNTH (audio.js)
   ========================================================================== */

class AudioManager {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.bgmInterval = null;
    
    // Configuración del Secuenciador de Música
    this.isPlayingMusic = false;
    this.bpm = 125;
    this.stepDuration = 60 / this.bpm / 2;
    this.currentStep = 0;
    this.nextNoteTime = 0.0;
    
    // Escala pentatónica
    this.melodyScale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00];
    this.chords = [
      [130.81, 164.81, 196.00], // C3
      [110.00, 130.81, 164.81], // Am
      [87.31,  110.00, 130.81], // F
      [98.00,  123.47, 146.83]  // G
    ];
    this.currentChordIndex = 0;
  }

  init() {
    if (this.ctx) return;
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.warn("Web Audio API no es soportada", e);
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.muted) {
      this.stopMusic();
    } else {
      this.startMusic();
    }
    return this.muted;
  }

  // --- EFECTOS DE SONIDO (SFX) ---
  
  // 1. Captura de serpiente Bothrops
  playCatch() {
    if (this.muted || !this.ctx) return;
    this.resume();
    
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.setValueAtTime(659.25, now + 0.06); // E5
    osc.frequency.setValueAtTime(783.99, now + 0.12); // G5
    osc.frequency.setValueAtTime(1046.50, now + 0.18); // C6
    
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.35);
  }

  // 2. Beber lata energética Xpi (Burbujas / trago)
  playXpiDrink() {
    if (this.muted || !this.ctx) return;
    this.resume();
    
    const now = this.ctx.currentTime;
    // 3 sorbos rápidos
    for (let i = 0; i < 3; i++) {
      const time = now + i * 0.1;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300 + i * 100, time);
      osc.frequency.exponentialRampToValueAtTime(800 + i * 150, time + 0.08);
      
      gain.gain.setValueAtTime(0.18, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.08);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(time);
      osc.stop(time + 0.08);
    }
  }

  // 3. Abrir Cofre con Linterna Frontal
  playChestOpen() {
    if (this.muted || !this.ctx) return;
    this.resume();
    
    const now = this.ctx.currentTime;
    
    // Crujido de madera + Fanfarria
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.15);
    osc.frequency.setValueAtTime(523.25, now + 0.2); // C5
    osc.frequency.setValueAtTime(659.25, now + 0.35); // E5
    osc.frequency.setValueAtTime(783.99, now + 0.5); // G5
    
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.75);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.75);
  }

  // 4. Sonido de Click / Diálogo
  playClick() {
    if (this.muted || !this.ctx) return;
    this.resume();
    
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(350, now);
    osc.frequency.exponentialRampToValueAtTime(700, now + 0.05);
    
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.06);
  }

  // 5. Beep de Máquina de Escribir para Diálogos
  playDialogBeep() {
    if (this.muted || !this.ctx) return;
    this.resume();
    
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600 + Math.random() * 100, now);
    
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.04);
  }

  // 6. Transición a Noche
  playNightTransition() {
    if (this.muted || !this.ctx) return;
    this.resume();
    
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.8);
    
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.85);
  }

  // 7. Melodía de Victoria Final
  playVictory() {
    if (this.muted || !this.ctx) return;
    this.resume();
    this.stopMusic();
    
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50, 880.00, 1046.50];
    const times = [0, 0.15, 0.3, 0.45, 0.65, 0.85];
    
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + times[i]);
      
      gain.gain.setValueAtTime(0.18, now + times[i]);
      gain.gain.exponentialRampToValueAtTime(0.001, now + times[i] + 0.3);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(now + times[i]);
      osc.stop(now + times[i] + 0.3);
    });
  }

  // --- MÚSICA DE FONDO CHIPTUNE ---
  startMusic() {
    if (this.muted || this.isPlayingMusic || !this.ctx) return;
    this.resume();
    
    this.isPlayingMusic = true;
    this.currentStep = 0;
    this.nextNoteTime = this.ctx.currentTime;
    
    const scheduleNextNotes = () => {
      if (!this.isPlayingMusic) return;
      
      while (this.nextNoteTime < this.ctx.currentTime + 0.1) {
        this.playMusicStep(this.currentStep, this.nextNoteTime);
        this.nextNoteTime += this.stepDuration;
        this.currentStep = (this.currentStep + 1) % 16;
        
        if (this.currentStep % 8 === 0) {
          this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;
        }
      }
      this.bgmInterval = setTimeout(scheduleNextNotes, 25);
    };
    
    scheduleNextNotes();
  }

  stopMusic() {
    this.isPlayingMusic = false;
    if (this.bgmInterval) {
      clearTimeout(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  playMusicStep(step, time) {
    if (this.muted || !this.ctx) return;
    
    if (step % 4 === 0) {
      const bassOsc = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();
      bassOsc.type = 'triangle';
      
      const chord = this.chords[this.currentChordIndex];
      bassOsc.frequency.setValueAtTime(chord[0], time);
      
      bassGain.gain.setValueAtTime(0.07, time);
      bassGain.gain.exponentialRampToValueAtTime(0.001, time + this.stepDuration * 1.8);
      
      bassOsc.connect(bassGain);
      bassGain.connect(this.ctx.destination);
      
      bassOsc.start(time);
      bassOsc.stop(time + this.stepDuration * 1.8);
    }
    
    const melodyPattern = [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0];
    if (melodyPattern[step] === 1) {
      const melOsc = this.ctx.createOscillator();
      const melGain = this.ctx.createGain();
      melOsc.type = 'sine';
      
      const noteIndex = (step * 3 + this.currentChordIndex * 2) % this.melodyScale.length;
      const freq = this.melodyScale[noteIndex];
      
      melOsc.frequency.setValueAtTime(freq, time);
      melGain.gain.setValueAtTime(0.035, time);
      melGain.gain.exponentialRampToValueAtTime(0.001, time + this.stepDuration * 0.9);
      
      melOsc.connect(melGain);
      melGain.connect(this.ctx.destination);
      
      melOsc.start(time);
      melOsc.stop(time + this.stepDuration * 0.9);
    }
  }
}

const audio = new AudioManager();
