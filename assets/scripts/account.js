import { login, register } from "./firebase.js"

if (window.location.pathname.includes("pages/cadastro.html")) {
    const userRegister = document.getElementById("user-register")
    
    userRegister.addEventListener("submit", async (e) => {
        e.preventDefault()
        
        const nameUser = document.getElementById("name-user").value
        const lastNameUser = document.getElementById("last-name-user").value
        const emailUser = document.getElementById("email-user").value
        const passwordUser = document.getElementById("password-user").value

        await register(capitalize(nameUser), capitalize(lastNameUser), emailUser, passwordUser)
    })
}
console.log('teste 1')
if (window.location.pathname.includes("pages/login.html")) {
    const userLogin = document.getElementById("user-login")
    console.log('teste 1')
    userLogin.addEventListener("submit", async (e) => {
        e.preventDefault()
        console.log('teste 2')
        const emailUser = document.getElementById("email-user").value
        const passwordUser = document.getElementById("password-user").value
        const success = await login(emailUser, passwordUser)

        if(success) {
            console.log('teste 3')
            window.location.href = "../index.html"
        } else {
            alert("Email ou senha incorretos.")
        }
    })
}

function capitalize(text) {
    text = text.trim().replace(/\s+/g, " ")
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}