// 模拟获取更多商品的接口
export const fetchMoreGoods = ({ pageNum, pageSize }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (pageNum > 5) {
        reject({ list: null, more: false });
      } else {
        resolve({ list: new Array(pageSize).fill(0), more: pageNum !== 5 });
      }
    }, 1000);
  });
};
// 模拟获取跑马灯文本信息
export const fetchTextSwiper = () => {
  return new Promise((resolve, reject) => {
    const text = [
      "这是第一条文本",
      "这是第二条文本，比较长",
      "这是第三条文本，非常非常长",
      "这是第四条文本，特别特别特别特别特别长",
    ];
    setTimeout(() => {
      resolve({ list: text });
    }, 100);
  });
};
