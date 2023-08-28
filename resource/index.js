// -----------------------------------------------------변수
// 페이지, 부분페이지 관련 변수
const totalPage_Element = document.getElementById("totalpage");
const sectionPages = totalPage_Element.getElementsByClassName("section");
const section_size = sectionPages.length;
let pageNum = 0;
let count = 1;
let imgCount = 1;

let currSection = sectionPages[pageNum];
const gageBar = document.querySelector(".gageBar");
const gageBarDiv = document.querySelector(".gageBar> div");
const gageBarImg = document.querySelector(".gageBar > img");
let raf; // requestAnimationFrame을 담을 변수
let width = 0; // 메인화면 게이지바 관련 가로축 초기화값

//네비게이션 관련 변수
const navSide = document.querySelectorAll(".sidebar a");
const navSide_size = navSide.length;
let currSidebar = navSide[0];
const default_color = "rgba(0, 0, 0, 0.2)";
const change_color = "rgba(0, 0, 0, 0.7)";
// -----------------------------------------------------변수

// -----------------------------------------------------초기화
//각 section별 페이지 사이즈 동적으로 부여
for (let i = 0; i < section_size; i++) {
  sectionPages[i].style.width = window.innerWidth + "px";
  sectionPages[i].style.height = window.innerHeight + "px";
}
navSide[0].style.backgroundColor = change_sidebar_color;

//0번쨰 section gageBar 사이즈 설정
gageBar.style.width = "0%";
gageBar.style.height = "1%";
gageBar.style.backgroundColor = "black";
gageBar.style.top = "49.5%";
gageBar.style.left = "17%";

gageBarDiv.style.width = "100%";
gageBarDiv.style.height = "100%";
// -----------------------------------------------------초기화

// ----------------------------------------------------- 함수
function gageBar_animation() {
  gageBar.style.width = width / 2 + "%";
  width += 1;

  if (width > imgCount * 3 * count) {
    imgCount += 1;
    if (imgCount > 6) {
      imgCount = 1;
      count += 1;
    }
    console.log(imgCount);
  }
  gageBarImg.src = "resource/dogAni/dog" + imgCount + ".png";
  if (width > 120) {
    cancelAnimationFrame(raf);
    return;
  }
  raf = requestAnimationFrame(gageBar_animation);
}

requestAnimationFrame(gageBar_animation);

function change_sidebar_color(_target) {
  if (currSidebar != _target) {
    currSidebar.style.backgroundColor = default_color;
  }
  currSidebar = _target;
  currSidebar.style.backgroundColor = change_color;
}

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
// window.addEventListener("wheel", function (event) {
//   // 현재 페이지 번호 0이하인 경우 예외처리.
//   if (pageNum < 0) {
//     console.log("현제 페이지 값 0 이하로 들어가 있음.");
//     pageNum = 0;
//     return;
//   }

//   // 휠 아래로 내릴때
//   if (event.deltaY > 0) {
//     if (pageNum < section_size) {
//       ++pageNum;
//       window.scrollTo({
//         top: sectionPages[pageNum].offsetTop,
//         behavior: "smooth",
//       });
//       currSection = sectionPages[pageNum];
//     } else {
//       pageNum = section_size;
//       currSection = sectionPages[section_size];
//     }
//   }
//   // 휠 위로 올릴때
//   else {
//     if (pageNum > 0) {
//       --pageNum;
//       window.scrollTo({
//         top: sectionPages[pageNum].offsetTop,
//         behavior: "smooth",
//       });
//       currSection = sectionPages[pageNum];
//     } else {
//       pageNum = 0;
//       currSection = sectionPages[section_size];
//     }
//   }
// });

//우측 사이드 바 색상 변경
for (let i = 0; i < navSide_size; i++) {
  navSide[i].addEventListener("click", function (event) {
    change_sidebar_color(event.target);
  });
}
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
