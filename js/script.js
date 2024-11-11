const div = document.getElementById("principal")
let login = ""

const paginaLogin = () => {
    div.innerHTML = ""

    const container = document.createElement("div")
    container.classList.add("pagina-login")
    const areaInfo = document.createElement("div")
    areaInfo.classList.add("area-info")
    const areaInput = document.createElement("div")
    areaInput.classList.add("area-input")
    const divInput = document.createElement("div")
    const titulo = document.createElement("h1")
    const input = document.createElement("input")
    const enviar = document.createElement("button")
    const textInicio = document.createElement("p")
    const textoSenha = document.createElement("p")


    titulo.innerHTML = "Atletas do Botafogo em 2024.1"
    textInicio.innerHTML = "Site criado para exibir os atletas do botafogo, como pedido da AP2 de Desenvolvimento Web;"
    areaInfo.appendChild(titulo) 
    areaInfo.appendChild(textInicio)

    input.placeholder = "Insira a senha"
    enviar.innerHTML = "ENVIAR"
    textoSenha.innerHTML = "Efetue login com a senha: LIBERTADORES"
    divInput.appendChild(input)
    divInput.appendChild(enviar)
    areaInput.appendChild(divInput)
    areaInput.appendChild(textoSenha)

    enviar.onclick = () => {
        login = input.value
        if (hex_sha256(login) === "ce855f48b7422de36b50512a9a0a06a59d4f2f6efac6f439456777a396773cc1") {
            sessionStorage.setItem("login", "logado")
            paginaPrincipal()
        }
        console.log(login)
    }

    container.appendChild(areaInfo)
    container.appendChild(areaInput)
    div.appendChild(container)
}

const paginaPrincipal = () => {
    div.innerHTML = ""

    const containerLogout = document.createElement("div")
    containerLogout.classList.add("pagina-principal")
    const titulo = document.createElement("h1")
    const logout = document.createElement("button")


    titulo.innerHTML = "Atletas Botafogo 2024.1"
    logout.innerHTML = "Sair"
    containerLogout.appendChild(titulo)
    containerLogout.appendChild(logout)



    logout.onclick = () => {
        sessionStorage.removeItem("login")
        paginaLogin()
    }

    div.appendChild(containerLogout)
}

if (sessionStorage.getItem("login")) {
    paginaPrincipal()
} else {
    paginaLogin()
}