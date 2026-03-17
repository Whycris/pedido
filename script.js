import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCOy6fNOjxaQP7Si8GRYUdH3FJ6K84K-p8",
  authDomain: "pedido-ao-carlos.firebaseapp.com",
  projectId: "pedido-ao-carlos",
  storageBucket: "pedido-ao-carlos.firebasestorage.app",
  messagingSenderId: "37831831117",
  appId: "1:37831831117:web:0974089880024868fdb604"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function registrarResposta(resposta){
    try{
        await addDoc(collection(db,"respostas"),{
            resposta: resposta,
            data: new Date()
        });
    }catch(e){
        console.error(e);
    }
}

(async function checkForUpdates() {
    const currentVersion = "1.0";
    const versionUrl = "https://raw.githubusercontent.com/ivysone/Will-you-be-my-Valentine-/main/version.json"; 

    try {
        const response = await fetch(versionUrl);
        if (!response.ok) return;

        const data = await response.json();

        if (currentVersion !== data.version) {
            alert(data.updateMessage);
        }
    } catch (error) {
        console.error("Error checking for updates:", error);
    }
})();

const messages = [
    "tem certeza?",
    "Tem terteza mesmo??",
    "Esta certo disso??",
    "Por favor gatinho...",
    "pensa mais um pouquinho pfv!",
    "se você disser que não, eu vou ficar triste...",
    "vou ficar triste...",
    "eu vou ficar muito muito muito...",
    "Certo certo, eu vou parar de perguntar...",
    "brincadeira, fala sim por favor! ❤️"
];

let messageIndex = 0;

window.handleNoClick = async function() {

    registrarResposta("nao");

    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');

    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;

    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    yesButton.style.fontSize = `${currentSize * 1.5}px`;
}

window.handleYesClick = async function() {

    registrarResposta("sim");

    window.location.href = "yes_page.html";
}
