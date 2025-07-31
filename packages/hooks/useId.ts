// use id hook
const useId = (key?: string) => {
  const randomId = Math.random().toString(36).slice(2, 15);
  const id = key ? `${key}-${randomId}` : randomId;
  return id;
};

export default useId;
