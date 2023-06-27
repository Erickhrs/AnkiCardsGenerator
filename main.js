let input = document.getElementById("input");
let content;
var i, j, y = 0;
var x;
var result = [];
const alphaC = /[\u0400-\u04FF]/;
const alpha = /[a-zA-Z]/;
var sentences = [];

//chamado quando um evento específico acontece.
input.addEventListener("input", (event) => {
  //o arquivo que foi selecionado pelo usuário (0 pq é só o primeiro arquivo)
  // criando um leitor de arquivos (objeto)
  const file = event.target.files[0];
  const reader = new FileReader();

  //lendo como texto o arquivo selecionado
  reader.readAsText(file);

  //quando a leitura terminar vai pegar o resultado e passar pra content
  reader.onload = function (e) {
    content = e.target.result;
    alert(content)
  }

});

function generate() {
  let i = 0
  let ql = content.match(/\n/g);
  let count = ql.length;
  let valuesTxt = [];
  //passa tudo pra array
  valuesTxt = content.split(/\r\n/)
  //valida o tipo de alfabeto (c-l)
  //valida se é frase ou não (f-p)
  if (AlphabetValidator(valuesTxt)) {
    //russo
    for (i = 0; i < valuesTxt.length; i++) {
      x = typeValidator(valuesTxt[i])
    }
    russianGenerator(valuesTxt)
  }
  else {
    //inglês
    for (i = 0; i < valuesTxt.length; i++) {
      x = typeValidator(valuesTxt[i])
    }
    englishGenerator(valuesTxt);
  }

}

function AlphabetValidator(array) {
  let i = 0
  //erro linha em branco 
  for (i = 0; i < array.length; i++) {
    if (array[i].trim() === "") {
      alert(`ERRO: LINHA ${i + 1} EM BRANCO`)
    }
  }
  if (alphaC.test(array[0])) {
    //russo
    return true;
  }
  else {
    //inglês
    return false
  }
}

function typeValidator(value) {
  let j = 0
  if (value.includes(" ")) {
    //frase
    for (j = 1; j <= 3; j++) {
      result.push(value)
      result.push("f")
      result.push("-")
      result.push("-")
      result.push("-")
    }
  } else {
    //palavra
    for (j = 1; j <= 3; j++) {
      result.push(value)
      result.push("p")
      result.push("-")
      result.push("-")
      result.push("-")
    }
  }
}

function englishGenerator(array) {
  let wpcounter = 0;
  j = 0
  //ERRO DUAS LINGUAS
  for (j = 0; j < array.length; j++) {
    if (alphaC.test(array[j])) {
      alert(`ERRO: DUAS LÍNGUAS NO MESMO ARQUIVO TXT`)
    }
  }

  //GERANDO A PARTIR DE PALAVRAS
  let indexes = [];
  for (i = 0; i < result.length; i++) {
    if (result[i] === "p") {
      indexes.push(i)
    }
  }

  function esperarCincoSegundos() {
    return new Promise(resolve => {
      setTimeout(resolve, 2000); // Espera 5 segundos (5000 milissegundos)
    });
  }

  async function meuLoop() {
    for (i = 0; i < indexes.length; i += 3) {
      let ID = (i == 0 ? result[0] : result[indexes[i] - 1])
      const cors_anywhere = "https://cors-anywhere.herokuapp.com/"
      let target = `https://sentencedict.com/${ID}.html`
      let url = (cors_anywhere + target);

      //faz uma solicitação para a url e retorna o response
      //pega a resposta e transforma em algum formato (.text) para trabalhar com o conteudo
      //o código passa esse texto para uma função chamada scraping() com o tipo de conteúdo "text/html".
      //.catch para caso dê algum erro na cadeira ele acione e diga qual é problema
      await fetch(url).then(response => response.text())
        .then(result => scraping(result, "text/html", j))
        .catch(error => console.error("ERRO: " + error));

      await esperarCincoSegundos();
    }
  }
  meuLoop();

  //function recebendo código HTML e o tipo do conteúdo
  //API domparser converte uma string contendo código HTML ou XML em um objeto (parar navegar e manipular).
  //depois pegamos todos os elementos divs dentro do id #all e passamos pra um objeto
  //depois passo objeto pra uma array e o .map percorre tudo e pega apenas o conteudo de cada div
  //(ser der algum problema abra o link do cors e clique no botão demo lá)
  function scraping(string_html, content_type) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(string_html, content_type);
    let divweb = doc.querySelectorAll("#all div")

    let sentence = Array.from(divweb).map(Element => Element.textContent);
    sentences.push(sentence);
    wpcounter++
    console.log("carregando...")
    if (wpcounter == (indexes.length / 3)) {
      console.log("pronto!")
     packer();
    }
  }

  function packer() {
      j = 0;
      for (i = 0; i < indexes.length; i += 3) {
        x = indexes[i]
        for (y = 0; y < 3; y++) {
          console.log(sentences[j][y])
          result[x + 1] = sentences[j][y]
          x += 5
        }
        j++
    }
   
    
  }
}


function russianGenerator(array) {
  j = 0
  //ERRO DUAS LINGUAS
  for (j = 0; j < array.length; j++) {
    if (alpha.test(array[j])) {
      alert(`ERRO: DUAS LÍNGUAS NO MESMO ARQUIVO TXT`)
    }
  }

  let arrayId = result.indexOf(array[1]);
  let ID = result[arrayId]
  const cors_anywhere = "https://cors-anywhere.herokuapp.com/"
  let target = `https://sinonim.org/p/${ID}#f`
  let url = (cors_anywhere + target);

  fetch(url).then(response => response.text())
    .then(result => scraping(result, "text/html"))
    .catch(error => console.error("ERRO: " + error));

  function scraping(string_html, content_type) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(string_html, content_type);
    let divweb = doc.querySelectorAll(".ulPred li")

    let sentences = Array.from(divweb).map(Element => Element.textContent);
    console.log(sentences)
  }

}