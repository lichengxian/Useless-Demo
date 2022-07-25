import Mock from "mockjs";

// 跑马灯文本信息
Mock.mock("/textswiper", "get", {
  list: [
    "这是第一条文本",
    "这是第二条文本，比较长",
    "这是第三条文本，非常非常长",
    "这是第四条文本，特别特别特别特别特别长",
  ],
});
// 更多商品
Mock.mock("/moregoods", "get", (options) => {
  const { pageNum, pageSize } = JSON.parse(options.body);
  if (pageNum > 5) return Mock.mock({ list: null, more: false });
  else
    return Mock.mock({
      list: new Array(pageSize).fill(0),
      more: pageNum !== 5,
    });
});
// 九宫格抽奖
const prizeList = [
  { prize_id: 11, prize_name: "谢谢参与", pic_url: "", prize_type: 1 },
  { prize_id: 22, prize_name: "我是奖品2", pic_url: "", prize_type: 2 },
  { prize_id: 33, prize_name: "我是奖品3", pic_url: "", prize_type: 2 },
  { prize_id: 44, prize_name: "我是奖品4", pic_url: "", prize_type: 2 },
  { prize_id: 55, prize_name: "我是奖品5", pic_url: "", prize_type: 2 },
  { prize_id: 66, prize_name: "我是奖品6", pic_url: "", prize_type: 2 },
  { prize_id: 77, prize_name: "我是奖品7", pic_url: "", prize_type: 2 },
  { prize_id: 88, prize_name: "我是奖品8", pic_url: "", prize_type: 2 },
];
const remainTimes = 5;
Mock.mock("/lottery/init", "get", {
  prizeList,
  remainTimes,
});
// 抽奖按钮
Mock.mock("/lottery/start", "post", (options) => {
  const { index } = JSON.parse(options.body);
  return Mock.mock({
    ...prizeList[index],
  });
});
// 延迟响应
Mock.setup({
  timeout: "100-500",
});
