import axios from "axios";

// 获取更多商品
export const fetchMoreGoods = ({ pageNum, pageSize }) => {
  const url = `/moregoods`;
  return axios
    .get(url, { data: { pageNum, pageSize } })
    .then((res) => Promise.resolve(res.data));
};
// 获取跑马灯文本信息
export const fetchTextSwiper = () => {
  const url = `/textswiper`;
  return axios.get(url).then((res) => Promise.resolve(res.data));
};
// 九宫格抽奖

export const fetchLotteryPrize = () => {
  const url = `/lottery/init`;
  return axios.get(url).then((res) => Promise.resolve(res.data));
};
// 抽奖按钮
export const fetchWinPrize = () => {
  const url = `/lottery/start`;
  return axios.post(url, {index: Math.floor(Math.random() * 8)}).then((res) => Promise.resolve(res.data));
};
