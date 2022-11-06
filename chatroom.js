{/* <script type="module"> */}
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
  import { getDatabase, ref, set, onChildAdded } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCG9B4RH2os7EroB5ZH_NJNmXdU3Y2yYP8",
    authDomain: "mealth-chatroom.firebaseapp.com",
    projectId: "mealth-chatroom",
    storageBucket: "mealth-chatroom.appspot.com",
    messagingSenderId: "27030954605",
    appId: "1:27030954605:web:7c9dc90ef1f86e175e9564",
    databaseURL: "https://mealth-chatroom-default-rtdb.asia-southeast1.firebasedatabase.app/",
  };

  // Data User
  const url = 'https://6361da91fabb6460d8ffede3.mockapi.io/users'

  // Initialize Firebase and Realtime Database
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// TODO: kalau app nya ada register page, bisa dipakai data user dari situ
const username = prompt("Please Tell Us Your Name");
// const username = 'test_user';

const elMessageForm = document.getElementById("form-chat")
elMessageForm.addEventListener("submit", sendMessage);

function sendMessage(event) {
  event.preventDefault();

  // get values to be submitted
  const timestamp = Date.now();
  const messageInput = document.getElementById("chat");
  const message = messageInput.value;
  const messagesBox = document.getElementById("chat-box")

  // clear the input box
  messageInput.value = "";

  //auto scroll to bottom
  messagesBox.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

  // create db collection and send in the data
  set(ref(database, 'messages/' + timestamp), {
    username: username || 'anonymous',
    message,
  });
}

function displayMessage() {
  let messagesBox = document.getElementById("chat-box")
  const messagesRef = ref(database, 'messages/');
  
  onChildAdded(messagesRef, (snapshot) => {
    const messages = snapshot.val();
    const message = `
            <div class="chat-message-right pb-4">
              <div>
                <div class="font-weight-bold mb-1 bg-light"></div>
                ${messages.username}: ${messages.message}
              </div>
            </div>
`;
    messagesBox.innerHTML += message;
  });
}

displayMessage();

  