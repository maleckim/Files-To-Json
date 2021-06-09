import AWS from 'aws-sdk'; // eslint-disable-line

export function uploadToS3(res) {
  const { workingDir, stream } = res;

  const params = [];

  Array.from(stream).map((streamObj) => {
    console.log(streamObj);
    const fileName = streamObj.name;
    const fullPath = workingDir + fileName;
    const newParam = {
      Bucket: '',
      Key: fullPath,
      Body: streamObj,
      ACL: 'public-read',
    };
    return params.push(newParam);
  });

  const responses = Promise.all(
    params.map((param) => {
      const upload = new AWS.S3.ManagedUpload({ params: param }).promise();
      return upload;
    })
  );

  return responses;
}
