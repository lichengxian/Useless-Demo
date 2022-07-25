import { useRef, useState, useEffect } from "react";
import styles from "./index.module.less";
import cn from "classnames";
import { fetchLotteryPrize, fetchWinPrize } from "../../services";
import { Speed, runOrder } from "../../constants/Lottery";
import LotteryPrizeItem from "../LotteryPrizeItem";

export default function Lottery() {
  // 抽奖剩余次数
  const [remainTimes, setRemainTimes] = useState(0);
  // 九宫格奖品列表
  const [prizeList, setPrizeList] = useState<any>([]);
  // 中奖奖品列表
  const [winPrize, setWinPrize] = useState<any>({});
  // 抽奖完成停止转动，谢谢参与为1，中奖为2
  const [isFinish, setIsFinish] = useState(0);
  // 抽奖运行状态
  const [isPlay, setIsPlay] = useState(false);
  // 抽奖开始时间
  const startTime = useRef(0);
  // 转动时，当前奖品位置，奖品列表索引
  const [curPrize, setCurPrize] = useState(1);
  // 转动结束位置，等待请求时-2，请求出错时-1，请求成功时奖品列表索引
  const finalPrize = useRef(-2);
  // 转动计数
  const count = useRef(0);

  // 获取九宫格奖品
  useEffect(() => {
    fetchLotteryPrize().then((data) => {
      setRemainTimes(data?.remainTimes || 0);
      setPrizeList(data?.prizeList || []);
    });
  }, []);
  // 重新抽奖
  useEffect(() => {
    if (isFinish) {
      setTimeout(() => {
        setIsFinish(0);
        console.log(`中奖结果：${winPrize?.prize_name}`);
      }, 1000);
    }
  }, [isFinish]);
  // 转速下降曲线
  const curve = (x) => (1 - Math.sqrt(1 - Math.pow(x, 2))) * 800 + Speed;
  // 降速到指定位置
  const slowDown = (start, end) => {
    setTimeout(() => {
      count.current += 1;
      setCurPrize(runOrder[count.current % 8]);
      // 抽奖结束，还原变量
      if (count.current === end) {
        setIsPlay(false);
        finalPrize.current === 0 ? setIsFinish(1) : setIsFinish(2);
        count.current = 0;
        finalPrize.current = -2;
        return;
      } else {
        slowDown(start, end);
      }
    }, curve((count.current - start) / (end - start + 0.1)));
  };

  // 点击开始抽奖
  const handleStartPlay = () => {
    // 已经开始抽奖则返回
    if (isPlay || isFinish) return;
    // 没有抽奖次数，提示并返回
    if (remainTimes <= 0) return;
    // 先响应转圈，转圈的时候发起请求
    setIsPlay(true);
    setCurPrize(1);
    setRemainTimes(remainTimes - 1);
    startTime.current = Date.now();
    // 获取最终奖品
    fetchWinPrize()
      .then((data) => {
        setWinPrize(data || {});
        // 未中奖，谢谢参与
        if (data?.prize_type === 1) {
          finalPrize.current = 0;
        } else {
          finalPrize.current = prizeList.findIndex(
            (item) => item.prize_id === data?.prize_id
          );
        }
      })
      // 抽奖出错
      .catch((e) => {
        setRemainTimes(remainTimes);
        setIsPlay(false);
        finalPrize.current = -1;
      });
    // 匀速开始转起来
    const startPlay = () => {
      const timer = setInterval(() => {
        count.current += 1;
        setCurPrize(runOrder[count.current % 8]);
        // 抽奖出错
        if (finalPrize.current === -1) {
          count.current = 0;
          finalPrize.current = -2;
          clearInterval(timer);
        }
        // 时间大于指定时间且请求有结果后开始降速，请求没回来的时候一直匀速转圈
        if (Date.now() - startTime.current > 500 && finalPrize.current >= 0) {
          // 计算离结束位置的距离，至少转一圈
          const distence =
            count.current +
            runOrder.indexOf(finalPrize.current) +
            8 +
            (8 - (count.current % 8));
          slowDown(count.current, distence);
          clearInterval(timer);
        }
      }, Speed);
    };
    startPlay();
  };
  // 抽奖按钮样式
  const active = (e) => {
    if (!isPlay && !isFinish && remainTimes > 0) {
      e.target.style.backgroundColor = "#5A3A24";
    }
  };
  const deactive = (e) => {
    e.target.style.backgroundColor = "";
  };

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        {/* 前4个奖品 */}
        {prizeList.slice(0, 4).map((prize) => (
          <LotteryPrizeItem
            key={prize.prize_id}
            choose={prizeList[curPrize].prize_id}
            isPlay={isPlay}
            prizeInfo={prize}
            isFinish={isFinish}
          />
        ))}
        {/* 点击抽奖按钮 */}
        {prizeList.length ? (
          <div
            className={cn(styles.img, {
              [styles.disable]: !remainTimes && !isPlay,
            })}
            onClick={handleStartPlay}
            onTouchStart={active}
            onTouchEnd={deactive}
          >
            抽奖次数：{remainTimes}次
          </div>
        ) : null}
        {/* 后4个奖品 */}
        {prizeList.slice(-4).map((prize) => (
          <LotteryPrizeItem
            key={prize.prize_id}
            choose={prizeList[curPrize].prize_id}
            isPlay={isPlay}
            prizeInfo={prize}
            isFinish={isFinish}
          />
        ))}
      </div>
    </div>
  );
}
