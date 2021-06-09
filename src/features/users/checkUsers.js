import { fire } from '../../fire';

export function checkUsers(res) {
  const ref = fire.database().ref();
  return ref
    .child('users')
    .child(res)
    .get()
    .then((snap) => (snap.exists() ? snap.val() : 'no data'));
}
