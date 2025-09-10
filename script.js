// Raversus Seamless Video Loop Player
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

const container = document.getElementById('videoContainer');
let currentVideoIndex = 0;
let videoElements = [];

function createVideoElements() {
  videoSources.forEach((src, index) => {
    const video = document.createElement('video');
    video.src = src;
    video.preload = 'auto';
    video.muted = false; // change to true if you want silent playback
    video.playsInline = true;
    video.loop = false; // manual looping

    // First video: wait until ready
    if (index === 0) {
      video.addEventListener('canplay', () => {
        container.innerHTML = ''; // clear "Loading..."
        videoElements.forEach(v => container.appendChild(v));
        playNextVideo();
      });
    }

    video.addEventListener('ended', playNextVideo);

    videoElements.push(video);
  });
}

function playNextVideo() {
  videoElements.forEach(v => v.style.display = 'none');
  const currentVideo = videoElements[currentVideoIndex];
  currentVideo.style.display = 'block';
  currentVideo.currentTime = 0;
  currentVideo.play().catch(e => console.log("Playback failed:", e));
  currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
}

document.addEventListener('DOMContentLoaded', createVideoElements);
