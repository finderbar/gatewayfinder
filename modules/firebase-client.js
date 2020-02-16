const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(Assets.getText('xxx.json'))),
  databaseURL: "xxx"
});
const options = { priority: "high", timeToLive: 60 * 60 *24};


export const retriveAuthencationUser = (uid) => {
  return new Promise((resolve, reject) => {
    admin.auth().getUser(uid)
    .then((response) => resolve(response))
    .catch((error) => reject(error))
  });
}

export const retriveAuthencationUserWithEmail = (email) => {
  return new Promise((resolve, reject) => {
    admin.auth().getUserByEmail(email)
    .then((response) => resolve(response))
    .catch((error) => reject(error))
  });
}

export const retriveAuthencationUserWithPhone = (phoneNumber) => {
  return new Promise((resolve, reject) => {
    admin.auth().getUserByPhoneNumber(phoneNumber)
    .then((response) => resolve(response))
    .catch((error) => reject(error))
  });
}

export const sendNotifications = (registrationToken, payload) => {
  return new Promise((resolve, reject) => {
    admin.messaging().sendToDevice(registrationToken, payload, options)
    .then((response) => resolve(response))
    .catch((error)=> reject(error))
  });
}
