export function retrievePreviews(res) {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', process.env.BASIC_AUTH);

  const uploadAll = Promise.all(
    res.map((uploadURL) => {
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };
      return fetch(uploadURL, requestOptions).then((response) =>
        response.json()
      );
    })
  );

  return uploadAll;
}
