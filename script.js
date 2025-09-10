// List of all video sources
const videoSources = [
  'videos/compressed_1.mp4',
  'videos/raversusvideo2_p0_clip_000_compressed.mp4',
  'videos/raversusvideo2_p0_clip_000_compressed_compressed.mp4',
  'videos/raversusvideo2_p0_clip_001_compressed.mp4',
  'videos/raversusvideo2_p0_clip_001_compressed_compressed.mp4',
  'videos/raversusvideo3_final_000.mp4',
  'videos/raversusvideo3_final_001.mp4',
  'videos/raversusvideo_part_000.mp4',
  'videos/raversusvideo_part_001.mp4',
  'videos/raversusvideo_part_002.mp4'
];

let currentVideo = 0;
const player = document.getElementById('raversusPlayer');

// Load the first video
function loadVideo(index) {
  player.src = videoSources[index];
  player.load();
  player.play().catch(err => console.log("Playback error:", err));
}

// Move to next video when one ends
player.addEventListener('ended', () => {
  currentVideo = (currentVideo + 1) % videoSources.length; // loop back
  loadVideo(currentVideo);
});

// Start with first video
loadVideo(currentVideo);
