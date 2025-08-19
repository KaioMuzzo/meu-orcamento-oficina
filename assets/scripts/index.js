import { saveClient, getClients } from "./firebase.js"

const links = document.querySelectorAll(".navigation")
const content = document.getElementById("contentBody")
const bottomLinks = document.querySelectorAll(".bottom-navigation")

links.forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault()
        menuSetActive(".menu li", link)
        const page = textNormalize(this.textContent)
        alterPage(page)
    })
})

bottomLinks.forEach(bLink => {
    bLink.addEventListener("click", function(e) {
        e.preventDefault()
        menuSetActive(".bottom-bar li", bLink)

        const selectedTitle = bLink.dataset.title
        const page = textNormalize(selectedTitle)
        const title = document.createElement("span")
        const titles = document.querySelectorAll(".bottom-bar span")

        if(titles) {
            titles.forEach(title => {
                title.remove()
            })
        }
        title.textContent = selectedTitle
        bLink.appendChild(title)
        alterPage(page)
    })
})

function initClients() {    
    const newClient = document.getElementById("new-client")
    const newClientMenu = document.getElementById("new-client-menu")
    const returnButton = document.getElementById("return-button")
    const newClientForm = document.getElementById("new-client-form")
    const addSuccess = document.getElementById("add-success")
    const successButton = document.getElementById("success-button")
    const menuSearch = document.getElementById("menu-search")

    listClients()

    newClient.addEventListener("click", () => {
        newClientMenu.style.display = "flex"
    })

    returnButton.addEventListener("click", () => {
        newClientMenu.style.display = "none"
    })

    successButton.addEventListener("click", () => {
        listClients()
        addSuccess.style.display = "none"
    })

    menuSearch.addEventListener("submit", (e) => {
        e.preventDefault()
        listClients()
    })

    newClientForm.addEventListener("submit", async (e) => {
        e.preventDefault()

        const clientName = document.getElementById("client-name").value
        const clientLastname = document.getElementById("client-lastname").value
        const clientEmail = document.getElementById("client-email").value
        const clientPhone = document.getElementById("client-phone").value
        await saveClient(clientName, clientLastname, clientEmail, clientPhone)
        addSuccess.style.display = "flex"
        newClientMenu.style.display = "none"
        newClientForm.reset()
    })
}

async function listClients() {
    const clientsList = document.getElementById("clients-list")
    const nameSearch = document.getElementById("name-search").value
    const clients = await getClients(nameSearch)
    clientsList.innerHTML = "";

    clients.forEach(client => {
        const clientFullName = `${client.clientName} ${client.clientLastname}`
        const clientPhone = client.clientPhone
        const clientEmail = client.clientEmail

        const div = document.createElement("div")
        div.classList = "clients-list-divider"

        clientsList.appendChild(clientAddList(clientFullName, clientPhone, clientEmail))
        clientsList.appendChild(div)
    })

    const divs = clientsList.querySelectorAll("div")
    if(divs.length > 0) divs[divs.length - 1].remove()
}

function initPage(page) {
    if (page === "clientes") initClients();
}

function textNormalize(str) {
    return str
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(" ", "")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/ç/g, "c")
}

function menuSetActive(classRef, link) {
    document.querySelectorAll(classRef).forEach(li => li.classList.remove("active"))
    link.parentElement.classList.add("active")
}

function alterPage(page) {
    fetch(`pages/${page}.html`)
    .then(res => res.text())
    .then(data => {
        content.innerHTML = data
        initPage(page)
    })
    .catch(() => {
        content.innerHTML = "<h2>Erro ao carregar a página</h2>"
    })
}

// Parte que cria Elementos HTML
function clientAddList(clientName, clientPhone, clientEmail) {
    const li = document.createElement("li")
    const img = document.createElement("img")
    const div = document.createElement("div")
    const h3 = document.createElement("h1")
    const pPhone = document.createElement("p")
    const pEmail = document.createElement("p")

    img.src = "assets/images/perfil.png"
    img.alt = "foto do cliente"
    h3.textContent = clientName
    pPhone.textContent = clientPhone
    pEmail.textContent = clientEmail

    div.appendChild(h3)
    div.appendChild(pPhone)
    div.appendChild(pEmail)
    li.appendChild(img)
    li.appendChild(div)

    return li
}
