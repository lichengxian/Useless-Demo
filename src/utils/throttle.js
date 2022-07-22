// 截流
export const throttle = (fn, delay = 50) => {
  let last = 0;
  return (args) => {
    const now = +Date.now();
    if (now - last > delay) {
      last = now;
      fn(args);
    }
  };
};
