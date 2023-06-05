let input = document.getElementById("input");
let content;



//chamado quando um evento específico acontece.
input.addEventListener("input", (event) => {
    //o arquivo que foi selecionado pelo usuário (0 pq é só o primeiro arquivo)
    // criando um leitor de arquivos (objeto)
    const file = event.target.files[0];
    const reader = new FileReader();

    //lendo como texto o arquivo selecionado
    reader.readAsText(file);

    //quando a leitura terminar vai pegar o resultado e passar pra content
    reader.onload = function(e) {
      content = e.target.result;
      console.log(content)
    }
   
  });
