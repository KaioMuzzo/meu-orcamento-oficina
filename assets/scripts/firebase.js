import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js"

import { getFirestore, collection, addDoc, getDocs, query, where, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js"

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
const auth = getAuth(app)

export function checkAuth(callback) {
    onAuthStateChanged(auth, (user) => {
        callback(user)
    })
}

export async function logout() {
    try {
        await signOut(auth)
    } catch (error) {
        console.log("Erro ao deslogar:", error.message)
    }
}

export async function register(nameUser, lastNameUser, emailUser, passwordUser) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, emailUser, passwordUser)
        const user = userCredential.user

        await setDoc(doc(db, "usuarios", user.uid), {
            nameUser: nameUser, 
            lastNameUser: lastNameUser, 
            emailUser: emailUser, 
            passwordUser: passwordUser,
            keywords: [
                nameUser.toLowerCase(),
                lastNameUser.toLowerCase(),
                `${nameUser.toLowerCase()} ${lastNameUser.toLowerCase()}`
            ]
        })

        alert("Usuário cadastrado: " + userCredential.user.emailUser)
    } catch (error) {
        alert("Erro: " + error.message)
    }
}

export async function login(emailUser, passwordUser) {
    try {
        await signInWithEmailAndPassword(auth, emailUser, passwordUser)
        return true
    } catch (error) {
        return false
    }
}

export async function saveClient(clientName, clientLastname, clientEmail, clientPhone) {
    const user = auth.currentUser;
    const keywords = [
        clientName.toLowerCase(),
        clientLastname.toLowerCase(),
        `${clientName.toLowerCase()} ${clientLastname.toLowerCase()}`
    ]

    return await addDoc(collection(db, "clientes"), {
        uid: user.uid,
        clientName, 
        clientLastname, 
        clientEmail, 
        clientPhone,
        keywords
    })
}

export async function getClients(clientName = "") {
    const user = auth.currentUser;
    let q;

    if(clientName) {
        q = query(
            collection(db, "clientes"),
            where("uid", "==", user.uid),
            where("keywords", "array-contains", clientName.toLowerCase())
        )
    } else {
        q = collection(db, "clientes")
        where("uid", "==", user.uid)
    }

    const snapshot = await getDocs(q)
    const list = []
    snapshot.forEach(doc => list.push(doc.data()))
    return list
}