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
