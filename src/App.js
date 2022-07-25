import { useEffect, useState } from "react";
import { fetchTextSwiper } from "./services";
import styles from './index.module.less';
import Goods from "./components/Goods";
import TextSwiper from "./components/TextSwiper";

function App() {
  const [text, setText] = useState([]);

  useEffect(() => {
    fetchTextSwiper().then(data => setText(data?.list || []));
  }, []);

  return (
    <div>
      {/* 文字跑马灯 */}
      <TextSwiper className={styles.textSwiper} textArray={text} />
      {/* 滚动懒加载 */}
      <Goods />
    </div>
  );
}

export default App;
