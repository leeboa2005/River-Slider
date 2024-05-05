const riverSlides = document.querySelector(".river_slides");
const riverPlayBtn = document.querySelector(".river_stop_btn");
const riverStopBtn = document.querySelector(".river_play_btn");

// river_slides를 한번 더 복사하는 함수
function clone() {
  const clone = riverSlides.cloneNode(true);
  const riverMovieWrap = document.querySelector(".river_slides_wrap");
  riverMovieWrap.appendChild(clone);

  riverSlides.offsetWidth + "px";

  riverSlides.classList.add("original");
  clone.classList.add("clone");
}

clone();

// 애니메이션 재생 시키는 함수
function animationRunning() {
  const riverOriginal = document.querySelector(".river_slides.original");
  const riverClone = document.querySelector(".river_slides.clone");
  riverOriginal.style.WebkitAnimationPlayState = "running";
  riverClone.style.WebkitAnimationPlayState = "running";
}

// 애니메이션 정지 시키는 함수
function animationPaused() {
  const riverOriginal = document.querySelector(".river_slides.original");
  const riverClone = document.querySelector(".river_slides.clone");
  riverOriginal.style.WebkitAnimationPlayState = "paused";
  riverClone.style.WebkitAnimationPlayState = "paused";
}

//클릭했을때 재생, 정지 이벤트
riverStopBtn.addEventListener("click", (e) => {
  e.preventDefault();
  animationRunning();
  riverStopBtn.classList.remove("active");
  riverPlayBtn.classList.add("active");
});

riverPlayBtn.addEventListener("click", (e) => {
  e.preventDefault();
  animationPaused();
  riverPlayBtn.classList.remove("active");
  riverStopBtn.classList.add("active");
});

//마우스 호버했을때 재생, 정지 이벤트
riverSlides.addEventListener("mouseenter", () => {
  animationPaused();
});

riverSlides.addEventListener("mouseleave", () => {
  if (riverPlayBtn.classList.contains("active")) {
    animationRunning();
  }
});
