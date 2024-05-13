"use script";
// 각각의 슬라이드 data를 불러옴
function loadItems() {
  return fetch("data/data.json")
    .then((response) => response.json())
    .then((json) => json.items);
}

const riverMovieWrap = document.querySelector(".river_slides_wrap");
const riverSlides = document.querySelector(".river_slides");
const riverStopBtn = document.querySelector(".river_stop_btn");
const riverPlayBtn = document.querySelector(".river_play_btn");

// 각각의 슬라이드들이 화면에 출력됨
function displayItems(items) {
  riverSlides.innerHTML = items.map((item) => createHTMLString(item)).join("");
}

// 각각의 슬라이드에 data값 적용 후 슬라이드 생성
function createHTMLString(item) {
  return `
  <li>
  <a href="${item.link}" target="_blank" aria-label="${item.title}">
    <img src="${item.img}" alt="${item.title}">
    <h2 class="river_slides-content">
      <span class="river_slides_cta">상세정보</span>
    </h2>
  </a>
</li>
    `;
}

// river_slides를 복사 기능
function clone() {
  const clone = riverSlides.cloneNode(true);
  riverMovieWrap.appendChild(clone);
  riverSlides.classList.add("original");
  clone.classList.add("clone");
}

// 슬라이드들이 화면에 출력된후 river_slides를 복사함
loadItems()
  .then((items) => {
    displayItems(items);
    clone();
  })
  .catch(() => console.log("Failed..."));

// 애니메이션 재생 시키는 함수
function animationRunning(run) {
  const riverOriginal = document.querySelector(".river_slides.original");
  const riverClone = document.querySelector(".river_slides.clone");
  riverOriginal.style.WebkitAnimationPlayState = `${run}`;
  riverClone.style.WebkitAnimationPlayState = `${run}`;
}

// 애니메이션 정지 시키는 함수
function animationPaused(stp) {
  const riverOriginal = document.querySelector(".river_slides.original");
  const riverClone = document.querySelector(".river_slides.clone");
  riverOriginal.style.WebkitAnimationPlayState = `${stp}`;
  riverClone.style.WebkitAnimationPlayState = `${stp}`;
}

//클릭했을때 재생, 정지 이벤트
riverPlayBtn.addEventListener("click", (e) => {
  e.preventDefault();
  animationRunning("running");
  riverPlayBtn.classList.remove("active");
  riverStopBtn.classList.add("active");
});

riverStopBtn.addEventListener("click", (e) => {
  e.preventDefault();
  animationPaused("paused");
  riverStopBtn.classList.remove("active");
  riverPlayBtn.classList.add("active");
});

//마우스 호버했을때 재생, 정지 이벤트
riverMovieWrap.addEventListener("mouseenter", () => {
  animationPaused("paused");
});

riverMovieWrap.addEventListener("mouseleave", () => {
  if (riverStopBtn.classList.contains("active")) {
    animationRunning("running");
  }
});
