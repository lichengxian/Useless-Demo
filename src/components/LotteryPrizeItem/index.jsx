import styles from "./index.module.less";
import cn from "classnames";

export default function LotteryPrizeItem(props) {
  const { prizeInfo, choose, isPlay, isFinish } = props;

  return (
    <div
      className={cn(styles.main, {
        [styles.play]: isPlay && choose !== prizeInfo.prize_id,
        [styles.final]: isFinish && choose === prizeInfo.prize_id,
      })}
    >
      <div className={styles.img} src={prizeInfo.pic_url} />
      <div className={styles.text}>{prizeInfo.prize_name}</div>
    </div>
  );
}
