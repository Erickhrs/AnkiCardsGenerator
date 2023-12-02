let input = document.getElementById("input");
const btkey = document.getElementById("btkey");
let content;
var i, j, y = 0;
var x;
var result = [];
const alphaC = /[\u0400-\u04FF]/;
const alpha = /[a-zA-Z]/;
var sentencesp = [];
var sentencesf = [];
var images = [];
var actionstatus = false;
var modestatus = false;
var modeview = false;
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
  }

});

btkey.addEventListener("click", function () {
  var inputkey = document.getElementById("inputkey");
  if (inputkey.value != "") {
    firststepsb()
    messagebox("system initialized")
    document.querySelector("#containerinfos").style.display = "flex";
  }
  else {
    window.alert("PLEASE, TAKE THE FIRST STEPS PROPERLY")
  }
});

function errosvalidator() {
  if (result[2] === undefined && result[7] === undefined) {
    messagebox("ERROR CORS SYSTEM(OPEN CONSOLE TO MORE INFOS)")
  }
}

function messagebox(x) {
  //var message = document.getElementById("message");
  //message.innerHTML = (message.textContent +"<br>" + x + "<br />");

  var newline = document.createElement("tr");
  var recentaction = document.createElement("td");
  recentaction.textContent = x;
  newline.appendChild(recentaction)
  const list = document.querySelector("#list");
  list.appendChild(newline);
}

function firststepsb() {
  const container1 = document.getElementById("activator_container");
  const container2 = document.getElementById("generator_container");

  container1.style.display = "none";
  container2.style.display = "block";
}
function generate() {
  actionsbox()
  if (input.files.length > 0) {
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
  else {
    alert("Nenhum arquivo selecionado.");
    messagebox("ERROR NO FILE")
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
  let indexesp = [];
  let indexesf = [];
  for (i = 0; i < result.length; i++) {
    if (result[i] === "p") {
      indexesp.push(i)
    }
    else if (result[i] === "f") {
      indexesf.push(i)
    }
    else { }
  }

  function esperarCincoSegundos() {
    return new Promise(resolve => {
      setTimeout(resolve, 2000); // Espera 2 segundos (5000 milissegundos)
    });
  }

  async function meuLoop() {
    for (i = 0; i < indexesp.length; i += 3) {
      let ID = (indexesp[i] == 0 ? result[0] : result[indexesp[i] - 1])
      const cors_anywhere = "https://cors-anywhere.herokuapp.com/"
      let target = `https://sentencedict.com/${ID}.html`
      let url = (cors_anywhere + target);

      //faz uma solicitação para a url e retorna o response
      //pega a resposta e transforma em algum formato (.text) para trabalhar com o conteudo
      //o código passa esse texto para uma função chamada scraping() com o tipo de conteúdo "text/html".
      //.catch para caso dê algum erro na cadeira ele acione e diga qual é problema
      await fetch(url).then(response => response.text())
        .then(result => scrapingp(result, "text/html", j))
        .catch(error => messagebox("ERRO: " + error));

      await esperarCincoSegundos();
    }

    for (i = 0; i < indexesf.length; i += 3) {
      ID = (indexesf[i] == 0 ? result[0] : result[indexesf[i] - 1])
      cors_anywhere = "https://cors-anywhere.herokuapp.com/"
      target = `https://context.reverso.net/translation/english-portuguese/${ID}`
      url = (cors_anywhere + target);

      await fetch(url).then(response => response.text())
        .then(result => scrapingf(result, "text/html", j))
        .catch(error => messagebox("ERRO: " + error));

      await esperarCincoSegundos();
    }
  }
  meuLoop();



  //function recebendo código HTML e o tipo do conteúdo
  //API domparser converte uma string contendo código HTML ou XML em um objeto (parar navegar e manipular).
  //depois pegamos todos os elementos divs dentro do id #all e passamos pra um objeto
  //depois passo objeto pra uma array e o .map percorre tudo e pega apenas o conteudo de cada div
  //(ser der algum problema abra o link do cors e clique no botão demo lá)
  function scrapingp(string_html, content_type) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(string_html, content_type);
    let divweb = doc.querySelectorAll("#all div")

    let sentence = Array.from(divweb).map(Element => Element.textContent);
    sentencesp.push(sentence);
    wpcounter++
    messagebox("loading...")
    if (wpcounter == (indexesp.length / 3)) {
      wpcounter = 0;
      messagebox("done!")
      packerp();
    }
  }


  function scrapingf(string_html, content_type) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(string_html, content_type);
    let divweb = doc.querySelectorAll("#examples-content .text")

    let sentence = Array.from(divweb).map(Element => Element.textContent);
    sentencesf.push(sentence);
    wpcounter++
    messagebox("loading...")
    if (wpcounter == (indexesf.length / 3)) {
      messagebox("done!")
      packerf();
    }
  }

  function packerp() {
    j = 0;
    for (i = 0; i < indexesp.length; i += 3) {
      x = indexesp[i]
      for (y = 0; y < 3; y++) {
        result[x + 1] = sentencesp[j][y]
        translator(result[x + 1], "en", x)
        x += 5
      }
      j++
    }
  }

  function packerf() {
    j = 0;
    for (i = 0; i < indexesf.length; i += 3) {
      x = indexesf[i]
      for (y = 0; y < 3; y++) {
        result[x + 1] = sentencesf[j][y].replace("\n          ", "")
        translator(result[x + 1], "en", x)
        x += 5
      }
      j++
    }
  }
}





async function imageGenerator(IDIMG) {
  //for (i = 0; i < result.length; i += 5) { images.push(result[i]) }
  var resultimg = await useApi(IDIMG);
  //console.log(resultimg.photos[Math.floor(Math.random(5)*10)].src.medium);
  return resultimg.photos[Math.floor(Math.random() * 3)].src.medium;
}


async function useApi(word) {
  try {
    const response = await fetch(`https://api.pexels.com/v1/search?query=${word}`, {
      method: 'GET',
      headers: { Authorization: 'j6lfufy3bU92SOgeJ8cxVUUg4K0eU96g7Nm4PFc3uvRZfEt6BeDExpMW' },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    messagebox('Error:', error);
    throw error;
  }
}

function russianGenerator(array) {
  let wpcounter = 0;
  j = 0
  //ERRO DUAS LINGUAS
  for (j = 0; j < array.length; j++) {
    if (alpha.test(array[j])) {
      alert(`ERRO: DUAS LÍNGUAS NO MESMO ARQUIVO TXT`)
    }
  }

  let indexesp = [];
  let indexesf = [];
  for (i = 0; i < result.length; i++) {
    if (result[i] === "p") {
      indexesp.push(i)
    }
    else if (result[i] === "f") {
      indexesf.push(i)
    }
    else { }
  }


  function esperarCincoSegundos() {
    return new Promise(resolve => {
      setTimeout(resolve, 2000); // Espera 5 segundos (5000 milissegundos)
    });
  }

  async function meuLoop() {
    for (i = 0; i < indexesp.length; i += 3) {
      let ID = (indexesp[i] == 0 ? result[0] : result[indexesp[i] - 1])
      const cors_anywhere = "https://cors-anywhere.herokuapp.com/"
      let target = `https://sinonim.org/p/${ID}#f`
      let url = (cors_anywhere + target);


      await fetch(url).then(response => response.text())
        .then(result => scrapingp(result, "text/html", j))
        .catch(error => messagebox("ERRO: " + error));

      await esperarCincoSegundos();

    }
    for (i = 0; i < indexesf.length; i += 3) {
      ID = (indexesf[i] == 0 ? result[0] : result[indexesf[i] - 1])
      cors_anywhere = "https://cors-anywhere.herokuapp.com/"
      target = `https://context.reverso.net/translation/russian-english/${ID}`
      url = (cors_anywhere + target);

      await fetch(url).then(response => response.text())
        .then(result => scrapingf(result, "text/html", j))
        .catch(error => messagebox("ERRO: " + error));
      await esperarCincoSegundos();
    }
  }
  meuLoop();
  let wpcounterp = 0
  let wpcounterf = 0
  function scrapingp(string_html, content_type) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(string_html, content_type);
    let divweb = doc.querySelectorAll(".ulPred li")

    let sentence = Array.from(divweb).map(Element => Element.textContent);
    sentencesp.push(sentence);
    wpcounterp++
    messagebox("loading...")
    if (wpcounterp == (indexesp.length / 3)) {
      messagebox("done!")
      packerp();
    }
  }
  function scrapingf(string_html, content_type) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(string_html, content_type);
    let divweb = doc.querySelectorAll("#examples-content .text")

    let sentence = Array.from(divweb).map(Element => Element.textContent);
    sentencesf.push(sentence);
    wpcounterf++
    messagebox("loading...")
    if (wpcounterf == (indexesf.length / 3)) {
      messagebox("done!")
      packerf();
    }
  }


  function packerp() {
    j = 0;

    for (i = 0; i < indexesp.length; i += 3) {
      x = indexesp[i]
      for (y = 0; y < 3; y++) {
        result[x + 1] = sentencesp[j][y]
        translator(result[x + 1], "ru", x)
        x += 5
      }
      j++
    }
  }

  function packerf() {
    j = 0;
    for (i = 0; i < indexesf.length; i += 3) {
      x = indexesf[i]
      for (y = 0; y < 3; y++) {
        result[x + 1] = sentencesf[j][y]
        result[x + 1] = sentencesf[j][y].replace("\n          ", "")
        translator(result[x + 1], "ru", x)
        x += 5
      }
      j++
    }
  }
}


async function translator(valor, lang, x) {
  try {
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${valor}!&langpair=${lang}|pt`);
    const data = await response.json();

    let trad = data.responseData.translatedText;
    result[x + 2] = trad;

    const imageResult = await imageGenerator(result[x - 1]);
    result[x + 3] = `<img src=${imageResult} alt="image"></img>`;

  } catch (error) {
    messagebox('Error:', error);
  }
  errosvalidator();
}


//botões infos
function actionsbox() {
  actionstatus = !actionstatus;
  const messageboxe = document.querySelector("#messagebox");
  if (actionstatus === false) {
    messageboxe.style.display = "none"
    messagebox("actionsbox disabled")
  }
  else if (actionstatus === true) {
    messageboxe.style.display = "block"

    messagebox("actionsbox activated")
  }
}

function mode() {
  modestatus = !modestatus;
  const background = document.body;
  const infos = document.querySelector("#infos");
  const containerinfos = document.querySelector("#containerinfos")
  const container = document.querySelector(".container")
  if (modestatus === false) {
    background.style.backgroundColor = "rgb(32, 32, 32)";
    infos.style.backgroundColor = "rgb(49, 48, 48)";
    containerinfos.style.backgroundColor = "rgb(41, 41, 41)";
    container.style.boxShadow = "0px 0px 20px 0px rgb(201, 201, 201)";
    messagebox("DARK MODE ACTIVATED")
  }
  else if (modestatus === true) {
    background.style.backgroundColor = "rgb(242, 233, 233)";
    infos.style.backgroundColor = "rgb(193, 192, 192)";
    containerinfos.style.backgroundColor = "rgb(216, 215, 215)";
    container.style.boxShadow = "0px 0px 20px 0px rgb(29, 28, 28)";
    messagebox("LIGHT MODE ACTIVATED")
  }
}

function view() {
  modeview = !modeview;
  if (modeview === false) {
    //document.querySelector("#containerinfos").style.display = "flex"
    document.querySelector("#generator_container").style.display = "flex"
    document.querySelector("#activator_container").style.display = "none"
    document.querySelector("#resultcontainer").style.display = "none"
    //apagando tabela
    var resuttable = document.querySelector("#resuttable")
    var resultcontainer = resuttable.parentNode;
    resultcontainer.removeChild(resuttable)
  }
  else if (modeview === true) {
    //document.querySelector("#containerinfos").style.display = "none"
    document.querySelector("#generator_container").style.display = "none"
    document.querySelector("#activator_container").style.display = "none"
    document.querySelector("#resultcontainer").style.display = "block"
    resultScreen()
  }
}

function resultScreen() {

  if (result <= 2) { 
    document.querySelector("#titleresult").innerHTML = "<p>there are no results</p"
  } else {
    document.querySelector("#titleresult").innerHTML = "&#127803;results&#127803;"
    var novatabela = document.createElement("table");
    var novalinhaHeader = document.createElement("tr");
    var th1 = document.createElement("th");
    var th2 = document.createElement("th");
    var th3 = document.createElement("th");
    var th4 = document.createElement("th");
    var th5 = document.createElement("th");
    var th6 = document.createElement("th");

    th1.textContent = "INDEX";
    th2.textContent = "VALUE";
    th3.textContent = "TYPE";
    th4.textContent = "FRONT";
    th5.textContent = "BACK";
    th6.textContent = "IMAGE";

    novalinhaHeader.appendChild(th1);
    novalinhaHeader.appendChild(th2);
    novalinhaHeader.appendChild(th3);
    novalinhaHeader.appendChild(th4);
    novalinhaHeader.appendChild(th5);
    novalinhaHeader.appendChild(th6);
    novatabela.appendChild(novalinhaHeader)
    novatabela.id = "resuttable";

    const resultcontainer = document.querySelector("#resultcontainer");
    resultcontainer.appendChild(novatabela)


    for (i = 0; i < result.length; i += 5) {
      var z = i;
      //criando os elementos pro html
      var novalinha = document.createElement("tr");
      var index = document.createElement("td");
      var value = document.createElement("td");
      var type = document.createElement("td");
      var front = document.createElement("td");
      var back = document.createElement("td");
      var image = document.createElement("td");

      //atribuindo valores

      index.textContent = z;
      value.textContent = result[z];
      type.textContent = result[z + 1];
      front.textContent = result[z + 2];
      back.textContent = result[z + 3];
      image.innerHTML = result[z + 4];

      //passando pro tr

      novalinha.appendChild(index);
      novalinha.appendChild(value);
      novalinha.appendChild(type);
      novalinha.appendChild(front);
      novalinha.appendChild(back);
      novalinha.appendChild(image);

      //mandando pro html
      tabela = document.querySelector("#resuttable");
      tabela.appendChild(novalinha)
    }
  }

}

function editResult() {
  const index = document.querySelector("#indexinp").value;
  const value = document.querySelector("#valueinp").value;
  const type = document.querySelector("#typeinp").value;
  const front = document.querySelector("#frontinp").value;
  const back = document.querySelector("#backinp").value;
  const image = document.querySelector("#imageinp").value;

  if (index !== "") {
    if (value !== "") {
      result[parseInt(index)] = value;
      messagebox("VALUE CHANGED")
    }

    if (type !== "") {
      result[parseInt(index) + 1] = type;
      messagebox("TYPE CHANGED")
    }

    if (front !== "") {
      result[parseInt(index) + 2] = front;
      messagebox("FRONT CHANGED")
    }

    if (back !== "") {
      result[parseInt(index) + 3] = back;
      messagebox("BACK CHANGED")
    }

    if (image !== "") {
      result[parseInt(index) + 4] = `<img src=${image} alt="image"></img>`
      messagebox("IMAGE CHANGED")
    }

    var resuttable = document.querySelector("#resuttable")
    var resultcontainer = resuttable.parentNode;
    resultcontainer.removeChild(resuttable)

    resultScreen();
  }
  else {
    alert("CHOOSE THE ROW TO EDIT (INDEX)")
    messagebox("ERRO - EMPTY INDEX")
  }

}