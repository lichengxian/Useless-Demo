import { useEffect, useState } from "react";
import { fetchTextSwiper } from "./services";
import styles from './index.module.less';
import Goods from "./components/Goods";
import TextSwiper from "./components/TextSwiper";
import Lottery from "./components/Lottery";

function App() {
  // 文字跑马灯
  const [text, setText] = useState([]);

  useEffect(() => {
    // 获取文字跑马灯
    fetchTextSwiper().then(data => setText(data?.list || []));
  }, []);

  return (
    <div>
      {/* 九宫格抽奖 */}
      <Lottery />
      {/* 文字跑马灯 */}
      <TextSwiper className={styles.textSwiper} textArray={text} />
      {/* 滚动懒加载 */}
      <Goods />
    </div>
  );
}

export default App;
