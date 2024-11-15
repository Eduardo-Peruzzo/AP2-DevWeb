const container = document.getElementById("atleta")

const params = new URLSearchParams(window.location.search)
const id = parseInt(params.get("id"))

const pega_json = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
}

const criaDetalhes = (atleta) => {
    const pagina = document.createElement("div");
    pagina.classList.add("pagina")

    const foto = document.createElement("div");
    foto.classList.add("foto")

    const info = document.createElement("div");
    info.classList.add("info")

    const nome = document.createElement("h1");
    const imagem = document.createElement("img");
    const desc = document.createElement("p");
    const posicao = document.createElement("h3")
    const nJogos = document.createElement("h3")
    const altura = document.createElement("h3")
    const no_botafogo_desde = document.createElement("h3")
    const nascimento = document.createElement("h3")
    const naturalidade = document.createElement("h3")

    const link = document.createElement("a")

    nome.innerHTML = atleta.nome;
    container.appendChild(nome);

    imagem.src = atleta.imagem;
    foto.appendChild(imagem);

    posicao.innerHTML = `Posição: ${atleta.posicao}`
    info.appendChild(posicao)

    nJogos.innerHTML = `Número de jogos: ${atleta.n_jogos}`
    info.appendChild(nJogos)

    if (atleta.altura != "") {
        altura.innerHTML = `Altura: ${atleta.altura}`
        info.appendChild(altura)
    }

    no_botafogo_desde.innerHTML = `Joga no botafogo desde: ${atleta.no_botafogo_desde}`
    info.appendChild(no_botafogo_desde)

    nascimento.innerHTML = `Data de nascimento: ${atleta.nascimento}`
    info.appendChild(nascimento)

    naturalidade.innerHTML = `Naturalidade: ${atleta.naturalidade}`
    info.appendChild(naturalidade)

    desc.innerHTML = atleta.detalhes;
    info.appendChild(desc);

    link.innerHTML = "Voltar"
    link.href = `index.html`

    pagina.appendChild(foto)
    pagina.appendChild(info)
    container.appendChild(pagina)
    container.appendChild(link)
}


if (sessionStorage.getItem("login")) {
    pega_json(`https://botafogo-atletas.mange.li/2024-1/${id}`).then(
        (retorno) => {
            if (typeof(retorno.id) == "undefined") {
                document.body.innerHTML = "<h1>Falha ao carregar atleta!</h1> <a href='index.html'>Voltar</a>"

            } else {
                criaDetalhes(retorno)
            }

        }
    )
} else {
    document.body.innerHTML = "<h1>Você precisa estar logado.</h1> <a href='index.html'>Voltar</a>"
}