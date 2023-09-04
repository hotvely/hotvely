// -----------------------------------------------------변수

//-------------------- page, sectionPage 관련 변수
const body = document.querySelector("body");
const totalPage_Element = document.getElementById("totalpage");
const sectionPages = totalPage_Element.getElementsByClassName("section");
const section_size = sectionPages.length;
let pageNum = 0;
let count = 1;
let imgCount = 1;
let currSection = sectionPages[pageNum];

//-------------------- loading 기능 변수
const loadingText = document.querySelectorAll(".loading");
const mainAni = document.querySelector(".mainAni");
const mainAniImg = document.querySelector(".mainAni > img");
const loadingImg = document.querySelector(".mainAni img");
loadingImg.style.position = "fixed";
loadingImg.style.top = "25%";
let isNext = false; //index 값 제어
let changing_paddingVal = 0;
let time = 0; // 메인화면 로딩창 시간 관련 변수
let idx = 0;
let raf; // requestAnimationFrame을 담을 변수
const text_frame = 20;
const maxTimeMill = (loadingText.length + 1) * text_frame;

//-------------------- navigation 관련 변수
const navSide = document.querySelectorAll(".sidebar a");
const navSide_size = navSide.length;
let currSidebar = navSide[0];
const default_color = "rgba(0, 0, 0, 0.2)";
const change_color = "rgba(0, 0, 0, 0.7)";

// -----------------------------------------------------변수

// ----------------------------------------------------- 초기화
// --------------------------------- page 초기화
//각 section별 페이지 사이즈 동적으로 부여
for (let i = 0; i < section_size; i++) {
  sectionPages[i].style.width = window.innerWidth + "px";
  sectionPages[i].style.height = window.innerHeight + "px";
}
navSide[0].style.backgroundColor = change_sidebar_color;

//---------------------------우측 사이드 바 색상 변경
for (let i = 0; i < navSide_size; i++) {
  navSide[i].addEventListener("click", function (event) {
    change_sidebar_color(event.target);
  });
}

// 사이즈 변경될 시 이벤트 호출
window.addEventListener("resize", () => {
  if (window.innerHeight < 600 || window.innerWidth < 600) {
    // 미디어 쿼리... 자바스크립트로.. 특정 값 이하로 해상도가 줄어들었을 경우에 로직
    // TODO...
  }

  for (let i = 0; i < section_size; i++) {
    sectionPages[i].style.width = window.innerWidth + "px";
    sectionPages[i].style.height = window.innerHeight + 40 + "px";
  }

  console.log(
    " section width : " +
      sectionPages[0].style.width +
      "/ section height : " +
      sectionPages[0].style.height
  );
});

// ----------------------------------------------------- 초기화

// ----------------------------------------------------- 함수
// ------------------------------ 로딩기능.
function main_animation() {
  time++;
  mainAni.style.height = window.innerHeight + "px";
  document.querySelector("#wrap").style.display = "none";
  document.querySelector("#wrap").style.backgroundColor =
    "rgba(255, 255, 255, 1)";

  //LOADING 글자 게임 로딩창 처럼 움직이게..
  //index값이 글자 갯수와 같아질 때 까지 (같아야 하는 이유는.. 마지막 글자가 내려가는 애니메이션을 끝날 때 까지 동작해야 하므로..)
  if (idx <= loadingText.length) {
    // %연산이 0 이 되면 다음글자로 넘어가야 하므로..  고정값으로 변경해 주고 index값을 올릴 수 있는 bool 변수 true로 만들어서 제어해줌.
    changing_paddingVal = (time % text_frame) * 1.5;
    if (changing_paddingVal == 0) {
      changing_paddingVal = text_frame * 1.5;
      isNext = true;
    }
  }

  // index값이 글자 갯수 보다 작을 때에 기존 글자 위,아래 움직이게 작업
  if (idx < loadingText.length) {
    loadingText[idx].style.paddingBottom = changing_paddingVal + "px";

    if (idx > 0 && idx < loadingText.length) {
      loadingText[idx - 1].style.paddingBottom =
        text_frame * 1.5 - changing_paddingVal + "px";
    }
  }

  // index값이 글자수와 같아지면 마지막 글자 내려가게 설계
  if (idx == loadingText.length) {
    loadingText[idx - 1].style.paddingBottom =
      text_frame * 1.5 - changing_paddingVal + "px";
  }

  // 결론적으로 index 값을 올려주는 코드.
  if (isNext) {
    idx++;
    isNext = false;
  }

  if (time >= maxTimeMill) {
    document.querySelector("#wrap").style.display = "block";
    document.querySelector("#wrap").style.backgroundColor = "rgb(1, 1, 1, 0)";
    mainAni.style.display = "none";
    mainAniImg.src = "";
    cancelAnimationFrame(raf);
    return;
  }
  raf = requestAnimationFrame(main_animation);
}
requestAnimationFrame(main_animation);

// ----------------------------------------- 사이드 바 색상 변경
function change_sidebar_color(_target) {
  if (currSidebar != _target) {
    currSidebar.style.backgroundColor = default_color;
  }
  currSidebar = _target;
  currSidebar.style.backgroundColor = change_color;
}

// --------------- 휠 스크롤 이벤트 시 사이드 바 이동 처리.
window.addEventListener("wheel", function () {
  let scrollTop = window.pageYOffset;
  let sidebar_Count = 0;
  if (scrollTop < 500) {
    change_sidebar_color(navSide[0]);
  } else if (scrollTop < 1200) {
    change_sidebar_color(navSide[1]);
  } else if (scrollTop < 1900) {
    change_sidebar_color(navSide[2]);
  } else {
    change_sidebar_color(navSide[3]);
  }
});

// -----------------------------------------------------------휠 스크롤 이동 함수 이벤트 인데 뭔가 말 안들어 처머금 ㅠㅜ
window.addEventListener(
  "wheel",
  function (event) {
    // 현재 페이지 번호 0이하인 경우 예외처리.
    if (pageNum < 0) {
      console.log("현제 페이지 값 0 이하로 들어가 있음.");
      pageNum = 0;
      return;
    }

    // 휠 아래로 내릴때
    if (event.deltaY > 0) {
      if (currSection == sectionPages[pageNum]) {
        ++pageNum;
        if (pageNum > section_size) {
          pageNum = section_size - 1;
        }
        window.scrollTo({
          top: sectionPages[pageNum].offsetTop,
          behavior: "smooth",
        });
        currSection = sectionPages[pageNum];
      } else {
        pageNum = section_size;
        currSection = sectionPages[section_size];
      }
    }
    // 휠 위로 올릴때
    else {
      if (pageNum > 0) {
        --pageNum;
        if (pageNum < 0) {
          pageNum = 0;
        }
        window.scrollTo({
          top: sectionPages[pageNum].offsetTop,
          behavior: "smooth",
        });
        currSection = sectionPages[pageNum];
      } else {
        pageNum = 0;
        currSection = sectionPages[section_size];
      }
    }
  },
  { passive: false }
);
