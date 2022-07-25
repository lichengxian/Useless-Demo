import { useEffect, useState } from "react";
import { fetchMoreGoods } from "../../services";
import styles from "./index.module.less";
import { useScrollGetMore } from "../../utils/useScrollGetMore";

export default function Goods() {
  // 初始列表
  const [list, setList] = useState([]);
  // 请求获取初始商品列表
  useEffect(() => {
    fetchMoreGoods({ pageNum: 1, pageSize: 10 }).then((data) =>
      setList(data?.list || [])
    );
  }, []);
  // 滚轮触发获取更多商品
  const { status, newList } = useScrollGetMore({ getMore: fetchMoreGoods });

  return (
    <div className={styles.goods}>
      {[...list, ...newList].map((good, idx) => (
        <div className={styles.good} key={idx}>
          {idx + 1}
        </div>
      ))}
      {status ? <div className={styles.load}>加载中...</div> : null}
    </div>
  );
}
