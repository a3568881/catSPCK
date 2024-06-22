import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB5-o1azq0ih4YTcy6fJd5uMma7T2IAbkg",
  authDomain: "login-1218a.firebaseapp.com",
  projectId: "login-1218a",
  storageBucket: "login-1218a.appspot.com",
  messagingSenderId: "618411273251",
  appId: "1:618411273251:web:e94a4050a91f5731fbd596",
  measurementId: "G-2ZPSY7DN4K"
};

// 
const app = initializeApp(firebaseConfig);
// Khởi tạo hàm auth
const auth = getAuth(app)
auth.languegeCode = 'en'
// Cung cấp thông tin đăng nhập bằng google
const provider = new GoogleAuthProvider();

const loginGG = document.getElementById('GG');
loginGG.addEventListener('click',function(){
  signInWithPopup(auth, provider)
.then((result) => {
  // This gives you a Google Access Token. You can use it to access the Google API.
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential.accessToken;
  // The signed-in user info.
  const user = result.user;
  window.location.href = "home.html"
}).catch((error) => {
  // Handle Errors here.
  const errorCode = error.code;
  const errorMessage = error.message;
});
})
