export const download = (json) => {
  const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(json)
  )}`;
  const link = document.createElement('a');
  link.href = dataStr;
  link.setAttribute('download', 'scene.json');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const sliceBucket = (path) => {
  console.log(path);
  let endOfPath = path.slice(path.lastIndexOf('/'), path.length - 1);
  console.log(endOfPath);
};
