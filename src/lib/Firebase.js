import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getStorage,
    ref, 
    uploadBytes,
    getMetadata,
    getDownloadURL 
} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCU0Qbk9HyvY6gTFQTnwMMFljV6hLM_fcU",
    authDomain: "socalmdiea.firebaseapp.com",
    projectId: "socalmdiea",
    storageBucket: "socalmdiea.appspot.com",
    messagingSenderId: "508259225171",
    appId: "1:508259225171:web:5ea15c3521c8ef218bc0a6",
    measurementId: "G-2TR96M767F"
};


const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const storage = getStorage(app);


export function getFilePathFromUrl(url) {
  const baseUrl = 'https://firebasestorage.googleapis.com/v0/b/';
  const decodedUrl = decodeURIComponent(url);
  const index = decodedUrl.indexOf(baseUrl) + baseUrl.length;
  const storageBucketPath = decodedUrl.substring(index, decodedUrl.indexOf('?'));
  return storageBucketPath.split('/o/')[1];
}
