# AnkiCardsGenerator
Projeto para facilitar a criação de cartões de inglês e russo no Anki. Basta inserir as palavras desejadas em um arquivo de texto, e o sistema gera automaticamente um ARQUIVO CSV com três exemplos com palavras/expressões (no idioma escolhido (RU/EN) e traduzidas) e imagens de cada palavravra/expressão do arquvio txt. Depois, é só importar a planilha para o Anki e fazer alguns ajustes finais. Uma forma rápida e fácil de melhorar o estudo de idiomas!
[projeto finalizado]

---------------------------------------------------------------------------

REGRAS ENVIO ARQUIVO TXT:
-Arquivo txt tem que ter no minimo 2 palavras ou expressões.
-Cada palavra deve estar em uma linha para o sistema separa-las (sem virgulas, barras e etc...)
-Não se pode misturar duas linguas no mesmo arquivo txt.
-Não se pode misturar palavras com expressões (com espaços) no mesmo arquivo txt.
-Não pode conter espaços
-Não faça uma requisição muito grande de palavras/expressões em um mesmo arquivo, francione. 
(recomendado 40 palavras/expressões (pra mais ou pra menos) gerando 120 cards por requisição) . 
-os resultados das expressões não são 100% por motivos de interpretação, sistema leva muito ao pé da letra.

SISTEMA:
-Para tudo funcionar corretamente você deve ativar o acesso ao cors e indicar sua API KEY do pexel na tela inicial.
-Depois de muitas requisições feitas, o cors ou o gerador de imagens bloqueia o acesso... aguarde um tempo até retornarem. 
(TALVEZ APÓS A 10 SOLICITAÇÃO)
-Caso algo não funcione como desejado, gentileza verificar no actionsbox ou no console do navegador se há algum erro.
-Não edite nenhuma linha do resultado que não siga o padrão index de 5 em 5(0, 5, 10, 15...)
-Quando você abrir a planilha de resultados irá aparecer o botão de download, baixe csv e exporte pro anki :)

---------------------------------------------------------------------------
IMAGENS DO SISTEMA: 
![1](https://github.com/Erickhrs/AnkiCardsGenerator/assets/106276135/b2025706-f621-45d4-8739-beb048c550ea)
![2](https://github.com/Erickhrs/AnkiCardsGenerator/assets/106276135/74352446-c185-4896-ab7a-e0dc8d745e8e)
![3](https://github.com/Erickhrs/AnkiCardsGenerator/assets/106276135/be1bc8b5-c359-4fcc-b5ec-587b1e3e2378)
![4](https://github.com/Erickhrs/AnkiCardsGenerator/assets/106276135/d6a015f3-40c6-429c-aece-73a070bdb3cc)
![5](https://github.com/Erickhrs/AnkiCardsGenerator/assets/106276135/dfe6211e-9891-4977-b9a7-99589d71fbcc)

VIDEO EXPLICATIVO DO FUNCIONAMENTO DO SISTEMA:
[![Watch the video]()](https://www.youtube.com/watch?v=fJd17wqcg9A)https://www.youtube.com/watch?v=fJd17wqcg9A)




