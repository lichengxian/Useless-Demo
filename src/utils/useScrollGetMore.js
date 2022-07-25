import { useEffect, useState, useRef, useCallback } from "react";
import { throttle } from "./throttle";

// 滚轮触发获取更多商品
export const useScrollGetMore = (props) => {
  const {
    container = document, // 带滚动条的元素
    threshold = 40, // 滚动到离底部的阈值，触发获取更多商品
    getMore, // 请求
    pageNum = 2, // 请求页数
    pageSize = 10, // 请求个数
    errCb, // 请求出错后的回调函数
    resCb, // 请求成功后的回调函数
  } = props;
  // 状态是否正在加载
  const [status, setStatus] = useState(false);
  // 更多商品
  const [newList, setNewList] = useState({ list: [], more: true });
  // 请求页数信息
  const page = useRef(pageNum);

  // 元素绑定滚轮监听事件
  useEffect(() => {
    const onScroll = async (e) => {
      const target =
        e.target === document
          ? document.documentElement || document.body
          : e.target;
      const scroll = target.scrollTop || window.pageYOffset;
      const bottom = target.scrollHeight - target.clientHeight;
      if (bottom - scroll < threshold && !status && newList.more) {
        setStatus(true);
        console.log(`发起请求 pageNum: ${page.current}, pageSize: ${pageSize}`);
        const res = await getNewList({ pageNum: page.current, pageSize });
        console.log(`请求结果：`, res);
        setNewList({ list: newList.list.concat(res.list), more: res.more });
        page.current += 1;
      }
    };
    const throttleOnScroll = throttle(onScroll, 50);
    container.addEventListener("scroll", throttleOnScroll);
    return () => container.removeEventListener("scroll", throttleOnScroll);
  }, [status, newList]);

  // 发送请求获取更多商品
  const getNewList = useCallback((pageInfo) => {
    return getMore(pageInfo)
      .then((res) => {
        if (resCb && typeof resCb === "function") return resCb(res);
        return res;
      })
      .catch((err) => {
        if (errCb && typeof errCb === "function") return errCb(err);
        return { list: [], more: false };
      })
      .finally(() => setStatus(false));
  }, []);

  return { status, newList: newList.list };
};
