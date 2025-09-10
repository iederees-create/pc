// Raversus Seamless Video Loop Player
// Replace the placeholder paths with your actual video file paths

const videoSources = [
    'videos/compressed_1.mp4',  // ← PLACEHOLDER 1
    'videos/raversusvideo2_p0_clip_000_compressed.mp4',  // ← PLACEHOLDER 2
    'videos/raversusvideo2_p0_clip_000_compressed_compressed.mp4',  // ← PLACEHOLDER 3
    'videos/raversusvideo2_p0_clip_001_compressed.mp4', 
    'videos/raversusvideo2_p0_clip_001_compressed_compressed.mp4',
    'videos/raversusvideo3_final_000.mp4',
    'videos/raversusvideo3_final_001.mp4', 
    'videos/raversusvideo_part_000.mp4', 
    'videos/raversusvideo_part_001.mp4', 
    'videos/raversusvideo_part_002.mp4', // ← PLACEHOLDER 4
];

const container = document.getElementById('videoContainer');
let currentVideoIndex = 0;
let videoElements = [];

function createVideoElements() {
    videoSources.forEach((src, index) => {
        const video = document.createElement('video');
        video.src = src;
        video.preload = 'auto';
        video.muted = false; // Set to true if you want no sound
        video.playsInline = true;
        video.loop = false; // We handle looping manually

        // Hide loading message when first video is ready
        if (index === 0) {
            video.addEventListener('canplay', () => {
                container.innerHTML = ''; // Clear "Loading..." message
                container.append(...videoElements);
                playNextVideo();
            });
        }

        video.addEventListener('ended', () => {
            playNextVideo();
        });

        videoElements.push(video);
        container.appendChild(video); // Temporarily for preloading
    });
}

function playNextVideo() {
    // Hide all videos
    videoElements.forEach(v => v.style.display = 'none');

    // Play current video
    const currentVideo = videoElements[currentVideoIndex];
    currentVideo.style.display = 'block';
    currentVideo.currentTime = 0;
    currentVideo.play().catch(e => console.log("Playback failed:", e));

    // Advance index, loop to 0 if needed
    currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    createVideoElements();
});
