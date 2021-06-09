export function generatePreviews(res) {
  console.log(res);

  const uploadAll = Promise.all(
    res.map((uploadURL) => {
      const raw = JSON.stringify({
        url: `${uploadURL}`,
        format: 'png',
        pages: 'all',
      });
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };
      return fetch(
        'https://api.filepreviews.io/v2/previews/',
        requestOptions
      ).then((response) => response.json());
    })
  );

  return uploadAll;
}
