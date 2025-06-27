// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCJa-dYGC2bnBUYuKhaPkCSGqjFbkqx5BI",
  authDomain: "wlist-73644.firebaseapp.com",
  projectId: "wlist-73644",
  storageBucket: "wlist-73644.firebasestorage.app",
  messagingSenderId: "979034781813",
  appId: "1:979034781813:web:0119b8ef52a35d6110a03c",
  measurementId: "G-G039GYNKQ9"
};

// Инициализация Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Получение данных из Firestore и отображение
db.collection("gifts").get().then((querySnapshot) => {
  const giftList = document.getElementById("gift-list");
  querySnapshot.forEach((doc) => {
    const item = document.createElement("div");
    item.className = "p-4 bg-white rounded shadow";
    item.textContent = doc.data().name;
    giftList.appendChild(item);
  });
}).catch((error) => {
  console.error("Ошибка при получении данных: ", error);
});
