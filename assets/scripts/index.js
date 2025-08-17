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
    })
    .catch(() => {
        content.innerHTML = "<h2>Erro ao carregar a página</h2>"
    })
}