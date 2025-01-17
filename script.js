let chave = "6c9bb1b4cac9d1e0f2461f6b8ca7aeb5"

function colocarNaTela(dados) {
    console.log(dados)
    document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name
    document.querySelector(".temp").innerHTML = Math.floor(dados.main.temp) + "°C"
    document.querySelector(".descricao").innerHTML = dados.weather[0].description
    document.querySelector(".icone").src = "https://openweathermap.org/img/wn/" + dados.weather[0].icon + ".png"
    document.querySelector(".umidade").innerHTML = `Umidade: ${dados.main.humidity}%`
}

async function buscarCidade(cidade) {
    let dados = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" +
        cidade +
        "&appid=" +
        chave +
        "&lang=pt_br" +
        "&units=metric"
    )
        .then(resposta => resposta.json())

    return dados
}

function cliqueiNoBotao() {
    let cidade = document.querySelector(".input-cidade").value
    let loading = document.querySelector(".loading")
    loading.style.display = "block" // mostra a tela de carregamento
    Promise.all([buscarCidade(cidade)]) // espera a resposta da API
        .then(dados => {
            loading.style.display = "none" // esconde a tela de carregamento
            colocarNaTela(dados[0]) // coloca os dados na tela
        })
        .catch(erro => {
            console.error(erro)
            loading.style.display = "none" // esconde a tela de carregamento
            alert("Ocorreu um erro ao buscar a cidade") // mostra uma mensagem de erro
        })
}


(async function start() {
    await buscarCidade("Belo horizonte")
        .then(dados => {
            colocarNaTela(dados)
        })
        .catch(erro => {
            console.error(erro)
            alert("Ocorreu um erro ao buscar a cidade")
        })
})()