const video = document.querySelector(".video");
const nav = document.querySelector(".navigation");
const toggleBtn = document.querySelector(".toggleButton");
const controlBtnVideo = document.querySelector(".control-btn-video");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.querySelector("video-info h4");
const fullScreen = document.querySelector('fullscreen-btn')
const durTime = document.querySelector("#durTime");
const currTime = document.querySelector("#currTime");
const timerWrapper = document.querySelector(".timer");
const timer = document.querySelector(".timer span");
const timerBar = document.querySelector(".timer div");
const controlBtn = document.querySelector(".control-btn");
const skipBtns = document.querySelectorAll("[data-skip]");
const volume = document.querySelector(".volume");
const volumeRange = document.querySelector(".volume_range");
const videoScr = document.querySelector("#video-src");
const pictureInpicture = document.querySelector(".picture_in_picture_mode");
const fullscreenMode = document.querySelector(".fullscreen-btn");

function togglePlay() {
  if (video.paused || video.ended) {
    video.play();
    toggleBtn.innerHTML = "❚ ❚";
    toggleBtn.classList.remove("titel");
  } else {
    video.pause();
    toggleBtn.innerHTML = "►";
  }
}
toggleBtn.addEventListener("click", togglePlay);

video.addEventListener("timeupdate", updateProgress);

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  let progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

document.addEventListener("keydown", (event) => {
  event.code === "Space" && togglePlay();
});

skipBtns.forEach((btn) => {
  btn.addEventListener("click", handleSkip);
});

function handleSkip() {
  video.currentTime += Number(this.dataset.skip);
}

video.addEventListener('timeupdate', setTime);
function setTime() {
    const minutes = Math.floor(video.currentTime / 60);
    const seconds = Math.floor(video.currentTime - minutes * 60);

    const minuteValue = minutes.toString().padStart(2, '0');
    const secondValue = seconds.toString().padStart(2, '0');

    const videoTime = `${minuteValue}:${secondValue}`;
    timer.textContent = videoTime;

    const barLength = timerWrapper.clientWidth * (video.currentTime / video.duration);
    timerBar.style.width = `${barLength}px`;
}

let isMousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousedown", () => handleMouseEvent(true));
progress.addEventListener("mousemove", (event) => isMousedown && scrub(event));
progress.addEventListener("mouseup", () => handleMouseEvent(false));

function handleMouseEvent(handleProps) {
  isMousedown = handleProps;
}

function scrub(event) {
  const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}
video.addEventListener("mouseenter", () => {
    nav.classList.add("active");
  });

//FULLSCREEN

fullscreenMode.addEventListener("click", () => {
    if (!video.classList.contains("openFullScreen")) {
      video.classList.add("openFullScreen");
      fullscreenMode.innerHTML = "fullscreen_exit";
      video.requestFullscreen();
    } else {
      video.classList.remove("openFullScreen");
      fullscreenMode.innerHTML = "fullscreen";
      document.exitFullscreen();
    }
  });

//VOLUME

const setVolume = () => {
    videoScr.volume = volumeRange.value / 100;
    if (volumeRange.value == 0) {
      volume.innerHTML = "volume_off";
    } else if (volumeRange.value < 39) {
      volume.innerHTML = "volume_down";
    } else {
      volume.innerHTML = "volume_up";
    }
  };
  volumeRange.addEventListener("change", setVolume);
  
  const muteVideoVolume = () => {
    if (volumeRange.value == 0) {
      volumeRange.value = 60;
      videoScr.volume = 0.6;
      volume.innerHTML = "volume_up";
    } else {
      volumeRange.value = 0;
      videoScr.volume = 0;
      volume.innerHTML = "volume_off";
    }
  };
  volume.addEventListener("click", muteVideoVolume)

  //Pic in Pic
      function togglePictureInPicture() {
        if (document.pictureInPictureElement) {
          document.exitPictureInPicture();
        } else if (document.pictureInPictureEnabled) {
          video.requestPictureInPicture();
        }
      }
      