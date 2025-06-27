/* app.js */

/* Конфигурация вашего проекта Firebase */
const firebaseConfig = {
  apiKey: "AIzaSyC-YmRIRmDvRz8XfNP1d6e01mrb7pL6XE",
  authDomain: "wish-list-dc0bd.firebaseapp.com",
  projectId: "wish-list-dc0bd",
  storageBucket: "wish-list-dc0bd.appspot.com",
  messagingSenderId: "516019652744",
  appId: "1:516019652744:web:8699ac66d6db0bb9df73d",
  measurementId: "G-S9088KLN4P"
};

/* Инициализация Firebase */
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/* Контейнер для карточек */
const giftList = document.getElementById("gift-list");

/* Функция рендера одной карточки */
function renderGift(doc) {
  const data = doc.data();

  const div = document.createElement("div");
  div.className = "p-4 bg-white rounded shadow";

  div.innerHTML = `
    <h2 class="text-xl font-semibold">${data.name}</h2>
    <p>${data.description}</p>
    <p class="mt-2">
      Статус:
      <span class="font-bold">${data.reserved ? "Зарезервировано" : "Не зарезервировано"}</span>
    </p>
    <button
      class="mt-2 px-4 py-2 text-white ${
        data.reserved
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600"
      } rounded"
      ${data.reserved ? "disabled" : ""}
    >
      ${data.reserved ? "Уже зарезервировано" : "Зарезервировать"}
    </button>
  `;

  /* Обработчик клика */
  div.querySelector("button").addEventListener("click", () => {
    if (!data.reserved) {
      db.collection("gifts").doc(doc.id).update({ reserved: true });
    }
  });

  giftList.appendChild(div);
}

/* Подписка на realtime-обновления */
db.collection("gifts").onSnapshot((snapshot) => {
  giftList.innerHTML = "";          // очищаем
  snapshot.forEach((doc) => renderGift(doc)); // перерисовываем
});
