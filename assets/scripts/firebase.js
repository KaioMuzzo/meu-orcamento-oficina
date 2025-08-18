import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js"
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyC-eFNNNn6ZqS4aumhHNCFKUkzeOLl99gU",
    authDomain: "projeto-oficina-69ae1.firebaseapp.com",
    projectId: "projeto-oficina-69ae1",
    storageBucket: "projeto-oficina-69ae1.firebasestorage.app",
    messagingSenderId: "70333720247",
    appId: "1:70333720247:web:77bc2f4b6bef750b408f32"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export async function saveClient(clientName, clientLastname, clientEmail, clientPhone) {
    return await addDoc(collection(db, "clientes"), {
        clientName, 
        clientLastname, 
        clientEmail, 
        clientPhone 
    })
}

export async function listClients() {
    const query = await getDocs(collection(db, "clientes"))
    let list = []
    query.forEach((doc) => list.push(doc.data()))
    return list
}