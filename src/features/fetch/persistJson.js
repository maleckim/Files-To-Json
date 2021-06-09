import { fire } from '../../fire';

export function persistJson(res) {
  const { folder, json } = res;
  const [first] = json;
  let temp = folder;
  temp = temp.replaceAll('/', '-');
  const adaNameRef = fire.database().ref('data/path');

  return adaNameRef
    .child(temp)
    .push(first)
    .then((snap) => snap);
}
