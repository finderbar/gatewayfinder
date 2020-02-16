const fs = require('fs');
const aws = require('aws-sdk');
const { accessId, accessSerect, bucketName, endpointURL } = settings.private.dobucket;

aws.config.update({ secretAccessKey: accessSerect, accessKeyId: accessId });
const s3Bucket = new aws.S3({ endpoint: endpointURL });

/**
 * Put an object to s3 bucket
 *
 * @param  {string} imageEncrypt - base64 image
 * @param  {string} contentType - transform image
 * @return {string} objectPath   - specifc file location
 */
export const uploadMedia = (imageEncrypt, contentType, destPath) => {
  return new Promise((resolve, reject) => {
    s3Bucket.putObject({
      Bucket: bucketName,
      ACL: 'public-read',
      Key: destPath,
      Body: imageEncrypt,
      ContentEncoding: 'base64',
      ContentType: contentType
    }, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

/**
 * Get an object from s3 bucket
 *
 * @param  {string} lKey - Object location in the bucket
 * @return {object}     - A promise containing the response
 */
export const downloadMedia = (destPath) => {
  return new Promise((resolve, reject) => {
    const s3Stream = s3Bucket.getObject({ Bucket: bucketName, Key: destPath }).createReadStream();
    const fileStream = fs.createWriteStream(destPath);
    s3Stream.on('error', reject);
    fileStream.on('error', reject);
    fileStream.on('close', () => { resolve(destPath); });
    s3Stream.pipe(fileStream);
  })
}

/**
 * Preview Image from s3 bucket
 *
 * @param  {string} lKey - Object location in the bucket
 * @return {object}     - A promise containing the response
 */
export const previewMedia = (destPath) => {
  return new Promise((resolve, reject) => {
    s3Bucket.getSignedUrl('getObject', {
      Bucket: bucketName,
      Key: destPath
    }, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
};
