/**
 * 获取歌词
 */
function parseLrc() {
  const lrcArr = lrc.split("\n");
  return lrcArr.map((item) => {
    const lrcItemArr = item.split("]");

    return {
      time: parseTime(lrcItemArr[0].substring(1)),
      word: lrcItemArr[1],
    };
  });
}

//获取歌词时间（s）
function parseTime(time) {
  const timeArr = time.split(":");
  return Number(timeArr[0]) * 60 + Number(timeArr[1]);
}

const lrcData = parseLrc();

/**
 * 获取html 节点
 */

const dom = {
  container: document.querySelector(".container"),
  ul: document.querySelector(".container ul"),
  audio: document.querySelector("audio"),
};

/**
 * 创建页面
 */
const createElements = () => {
  for (let item of lrcData) {
    const li = document.createElement("li");
    li.textContent = item.word;
    dom.ul.appendChild(li);
  }
};
createElements();

//容器高度
const containerHeight = dom.container.clientHeight;
//li 的高度
const liHeight = dom.ul.children[0].clientHeight;
// 最大偏移量
var maxOffset = dom.ul.clientHeight - containerHeight;

/**
 * 设置 ul 元素的偏移量
 */

function setOffset(active) {
  let activeIndex;
  activeIndex = getActiveIndex();

  const activeLi = dom.ul.querySelector(".active");
  let offsetNum = activeIndex * liHeight + liHeight / 2 - containerHeight / 2;

  if (offsetNum < 0) {
    offsetNum = 0;
  }
  if (offsetNum > maxOffset) {
    offsetNum = maxOffset;
  }
  if (activeLi) {
    activeLi.classList.remove("active");
  }

  dom.ul.children[activeIndex].classList.add("active");
  dom.ul.style.transform = `translateY(-${offsetNum}px)`;
}

/**
 * 获取当前的index
 */
const getActiveIndex = () => {
  const currentTime = dom.audio.currentTime;
  let currentIndex = lrcData.findIndex((item) => currentTime < item.time) - 1;
  if (currentIndex == -1) {
    currentIndex = 0;
  }
  return currentIndex;
};

dom.audio.addEventListener("timeupdate", setOffset);
