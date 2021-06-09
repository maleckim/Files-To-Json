import AWS from 'aws-sdk';

export function fetchTest(res) {
  const t = new AWS.S3();
  const params = {
    Bucket: 'key-yan',
  };
  async function getBuckets() {
    const objects = await t.listObjects(params).promise();
    return objects;
  }
  return getBuckets();
}
