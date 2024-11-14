const div = document.getElementById("principal")
let login = ""

const pega_json = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
}

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
        } else {
            alert("Senha incorreta!")
        }
    }

    container.appendChild(areaInfo)
    container.appendChild(areaInput)
    div.appendChild(container)
}

const paginaPrincipal = () => {
    div.innerHTML = ""

    const headerPrincipal = document.createElement("header")
    headerPrincipal.classList.add("header-principal")
    const titulo = document.createElement("h1")
    const logout = document.createElement("button")

    titulo.innerHTML = "Atletas Botafogo 2024.1"
    logout.innerHTML = "Sair"
    headerPrincipal.appendChild(titulo)
    headerPrincipal.appendChild(logout)

    logout.onclick = () => {
        sessionStorage.removeItem("login")
        paginaLogin()
    }

    const divElenco = document.createElement("div")
    divElenco.classList.add("elenco-botoes")
    const masculino = document.createElement("button")
    const feminino = document.createElement("button")
    const elencoCompleto = document.createElement("button")
    const buscaNome = document.createElement("input")
    buscaNome.classList.add("busca-nome")
    const select = document.createElement("select")
    const divAtletas = document.createElement("div")
    divAtletas.classList.add("div-atletas")

    let elencoAtual
    let atletas

    masculino.innerHTML = "Masculino"
    feminino.innerHTML = "Feminino"
    elencoCompleto.innerHTML = "Elenco Completo"
    buscaNome.placeholder = "Busque pelo nome"
    select.innerHTML = `
        <option disabled selected>Escolha o elenco</option>
        <option value="masculino">Masculino</option>
        <option value="feminino">Feminino</option>
        <option value="all">Elenco Completo</option>
    `

    masculino.onclick = () => {
        pega_json("https://botafogo-atletas.mange.li/2024-1/masculino").then((retorno) => {atletas = retorno; exibirAtletas(atletas)})
    }
    feminino.onclick = () => {
        pega_json("https://botafogo-atletas.mange.li/2024-1/feminino").then((retorno) => {atletas = retorno; exibirAtletas(atletas)})
    }
    elencoCompleto.onclick = () => {
        pega_json("https://botafogo-atletas.mange.li/2024-1/all").then((retorno) => {atletas = retorno; exibirAtletas(atletas)})
    }
    select.onchange = () => pega_json(`https://botafogo-atletas.mange.li/2024-1/${select.value}`).then((retorno) => {atletas = retorno; exibirAtletas(atletas)})
    buscaNome.oninput = () => exibirAtletas(atletas, buscaNome.value)

    divElenco.appendChild(masculino)
    divElenco.appendChild(feminino)
    divElenco.appendChild(elencoCompleto)

    div.appendChild(headerPrincipal)
    div.appendChild(divElenco)
    div.appendChild(select)
    div.appendChild(buscaNome)
    div.appendChild(divAtletas)
}

if (sessionStorage.getItem("login")) {
    paginaPrincipal()
} else {
    paginaLogin()
}

const exibirAtletas = (atletas, entrada = "") => {
    const container = document.querySelector(".div-atletas")
    container.innerHTML = ""
    atletas.forEach((atleta) => {
        if (entrada == "") { montaCard(atleta) }
        if (entrada != "") {
            if (atleta.nome.toLowerCase().includes(entrada.toLowerCase())) { montaCard(atleta) }
        }
    })
}

const montaCard = (atleta) => {
    const container = document.querySelector(".div-atletas")

    const cartao = document.createElement("div");
    cartao.classList.add("cartao")
    const nome = document.createElement("h3");
    const imagem = document.createElement("img");
    const link = document.createElement("a");

    nome.innerHTML = atleta.nome;
    cartao.appendChild(nome);

    imagem.src = atleta.imagem;
    cartao.appendChild(imagem);

    link.innerHTML = "SAIBA MAIS"
    link.href = `detalhes.html?id=${atleta.id}`
    cartao.appendChild(link)

    container.appendChild(cartao)
}

const filtraAtletas = (entrada, caminho) => {
    exibirAtletas()
}