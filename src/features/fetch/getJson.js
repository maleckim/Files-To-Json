import { fire } from '../../fire';

export function getJson(res) {
  let temp = res;
  temp = temp.replaceAll('/', '-');
  const adaNameRef = fire.database().ref('data/path');
  return adaNameRef
    .child(temp)
    .get()
    .then((snap) => (snap.exists() ? snap.val() : 'no data'));
}
