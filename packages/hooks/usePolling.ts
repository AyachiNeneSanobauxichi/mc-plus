import { onUnmounted } from "vue";

export type PollingCallback<T = any> = (
  res: T,
  resolve: (value: any) => void,
  reject: (reason?: any) => void
) => void;

export type PollingOptions<T> = Partial<{
  interval: number;
  maxTimes: number;
  callback: PollingCallback<T>;
}>;

// polling
const usePolling = <T = any, R = any>(
  fn: () => Promise<T>,
  options: PollingOptions<T> = {}
): Promise<R> => {
  const { interval = 1000, maxTimes = 10, callback } = options;

  let timer: NodeJS.Timeout | null = null;
  let times = 1;

  // clean
  const clean = () => {
    timer && clearInterval(timer);
  };

  const pro = new Promise((_resolve, _reject) => {
    // resolve
    const resolve = (value: any) => {
      _resolve(value);
      clean();
    };

    // reject
    const reject = (reason?: any) => {
      _reject(reason);
      clean();
    };

    timer = setInterval(async () => {
      // fetch data
      const res = await fn();

      // exceed max times
      if (times >= maxTimes) {
        clean();
        resolve(res);
      }

      // callback
      callback?.(res, resolve, reject);
      // increase times
      times++;
    }, interval);
  });

  // clear timer
  onUnmounted(() => clean());

  return pro as Promise<R>;
};

export default usePolling;
