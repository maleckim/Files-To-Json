export const sliceBucket = (path) => {
  const endOfPath = path.slice(path.lastIndexOf('/'));
  return endOfPath;
};
