import { useRef, useState } from "react";
import styles from "./index.module.less";
import { useInterval } from "ahooks";
import cn from "classnames";

export default function TextSwiper(props) {
  const { textArray, className, delay = 1500, transition = 500 } = props;
  const textNum = textArray.length;
  const swiperRef = useRef(null);
  const [swiperStyle, setSwiperStyle] = useState({
    transform: `translateY(0px)`,
    transition: `transform 0ms`,
  });
  const index = useRef(0);

  // 每隔一定时间切换一次
  useInterval(() => {
    if (!swiperRef.current || textNum < 2) return;
    const height = swiperRef.current.clientHeight / (textNum + 1);
    setSwiperStyle({
      transform: `translateY(-${height * (index.current + 1)}px)`,
      transition: `transform ${transition}ms`,
    });
    if (index.current >= textNum - 1) {
      setTimeout(() => {
        index.current = 0;
        setSwiperStyle({
          transform: `translateY(0px)`,
          transition: `transform 0ms`,
        });
      }, transition);
    } else {
      index.current += 1;
    }
  }, delay + transition);

  return (
    <div className={cn(styles.textSwiper, className)}>
      <div className={styles.allText} ref={swiperRef} style={swiperStyle}>
        {textNum
          ? textArray.concat(textArray[0]).map((string, idx) => {
              return (
                <div className={cn(styles.textWrapper, className)} key={idx}>
                  <div className={styles.text}>{string}</div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}
