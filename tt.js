const str = "你知道的，我其实是个好人，";
const delay = 1000;
let chartIndex = 0;
let timer;

const getInfo = () => {
  chartIndex++;
  const info = str.substring(0, chartIndex);
  console.log("info", info);

  if (info.length == str.length) {
    clearInterval(timer);
  }

  timer = setInterval(() => {
    getInfo();
  }, delay);
};

getInfo();
