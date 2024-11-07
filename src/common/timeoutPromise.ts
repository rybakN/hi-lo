export const timeoutPromise = (time: number) => {
  let timeoutId;
  return {
    timer: new Promise((resolve) => {
      timeoutId = setTimeout(() => {
        resolve(null);
      }, time);
    }),
    timeoutId,
  };
};
