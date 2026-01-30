/**
 * Cescau, un souffle nouveau - Audio Player
 * Custom floating audio player with user-initiated playback
 */

class AudioPlayer {
  constructor() {
    this.audio = null;
    this.isPlaying = false;
    this.isPanelOpen = false;
    this.config = null;
    
    this.init();
  }

  /**
   * Initialize the audio player
   */
  async init() {
    // Load site config
    try {
      const response = await fetch('data/site.json');
      this.config = await response.json();
    } catch (error) {
      console.warn('Could not load audio config:', error);
      this.config = {
        audio: {
          file: 'audio/musique.mp3',
          title: 'Musique d\'Occitanie',
          artist: 'Traditionnelle'
        }
      };
    }

    this.createPlayer();
    this.bindEvents();
  }

  /**
   * Create the player HTML and inject into DOM
   */
  createPlayer() {
    const playerHTML = `
      <div class="audio-player" id="audio-player">
        <div class="audio-panel" id="audio-panel">
          <div class="audio-panel-header">
            <div class="audio-panel-icon">♪</div>
            <div>
              <p class="audio-panel-title">${this.config.audio.title}</p>
              <p class="audio-panel-subtitle">${this.config.audio.artist}</p>
            </div>
          </div>
          <div class="audio-controls">
            <button class="audio-play-btn" id="audio-play" aria-label="Lecture">
              <span id="play-icon">▶</span>
            </button>
          </div>
          <div class="audio-volume">
            <input type="range" id="audio-volume" min="0" max="1" step="0.1" value="0.7" aria-label="Volume">
          </div>
        </div>
        <button class="audio-toggle" id="audio-toggle" aria-label="Ouvrir le lecteur audio">
          <span id="toggle-icon">♪</span>
        </button>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', playerHTML);

    // Create audio element
    this.audio = new Audio(this.config.audio.file);
    this.audio.volume = 0.7;
    this.audio.loop = true;
    
    // Handle audio errors gracefully
    this.audio.addEventListener('error', () => {
      console.warn('Audio file not found or could not be loaded');
    });

    // Get DOM elements
    this.toggleBtn = document.getElementById('audio-toggle');
    this.toggleIcon = document.getElementById('toggle-icon');
    this.panel = document.getElementById('audio-panel');
    this.playBtn = document.getElementById('audio-play');
    this.playIcon = document.getElementById('play-icon');
    this.volumeSlider = document.getElementById('audio-volume');
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    // Toggle panel
    this.toggleBtn.addEventListener('click', () => this.togglePanel());

    // Play/pause
    this.playBtn.addEventListener('click', () => this.togglePlay());

    // Volume control
    this.volumeSlider.addEventListener('input', (e) => {
      this.audio.volume = e.target.value;
    });

    // Update play state on audio events
    this.audio.addEventListener('play', () => this.updatePlayState(true));
    this.audio.addEventListener('pause', () => this.updatePlayState(false));
    this.audio.addEventListener('ended', () => this.updatePlayState(false));

    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
      const player = document.getElementById('audio-player');
      if (player && !player.contains(e.target) && this.isPanelOpen) {
        this.closePanel();
      }
    });
  }

  /**
   * Toggle the audio panel visibility
   */
  togglePanel() {
    this.isPanelOpen = !this.isPanelOpen;
    this.panel.classList.toggle('open', this.isPanelOpen);
  }

  /**
   * Close the audio panel
   */
  closePanel() {
    this.isPanelOpen = false;
    this.panel.classList.remove('open');
  }

  /**
   * Toggle play/pause
   */
  togglePlay() {
    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play().catch(err => {
        console.warn('Playback failed:', err);
      });
    }
  }

  /**
   * Update the play state and UI
   * @param {boolean} playing - Whether audio is playing
   */
  updatePlayState(playing) {
    this.isPlaying = playing;
    this.playIcon.textContent = playing ? '⏸' : '▶';
    this.toggleIcon.textContent = playing ? '♫' : '♪';
    this.toggleBtn.classList.toggle('playing', playing);
  }
}

// Initialize audio player when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new AudioPlayer();
});
