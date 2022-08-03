document.addEventListener('DOMContentLoaded', function () {

  //Função auxiliar
  async function abaAtiva() {
    let queryOptions = {
      active: true,
      currentWindow: true
    };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }

  // ------ Colorir fundo --------
  function colorirFundo() {

    // --------- Colorindo somente links ---------
    let links = document.getElementsByTagName('a');
    for (let link of links) {
      link.setAttribute('style', 'color: #001BFF !important;');
      // Se o <a> tiver filhos
      if (link.hasChildNodes()) {
        var filhos = link.childNodes;
        for (let filho of filhos) {
          // Se o filho de <a> for uma tag colorir ela também
          if(filho.nodeType === Node.ELEMENT_NODE) {
            filho.setAttribute('style', 'color: #001BFF !important;');
          }
        }
      }
    }

    
    let tagNames = ['body', 'main', 'div', 'main', 'article','p']
    for (let tagName of tagNames) {
      let tags = document.getElementsByTagName(tagName)
      for (let tag of tags) {
        tag.setAttribute('style', 'background-color: #FFFA30 !important; color: #010400 !important;');
      }
    }

  }

  document.querySelector('#btnColorir').addEventListener('click', async function () {
    const tab = await abaAtiva();
    console.log(tab)
    chrome.scripting.executeScript({
      target: {
        tabId: tab.id,
        allFrames: true
      },
      function: colorirFundo
    });

  });

  const config = {
    tamanhoFonte: 16
  }

   function mexerFonte(tamanhoFonte) {
    //Criando a lista de tags que terão fonte aumentada
    console.log(tamanhoFonte)
    let opcoes = ['p', 'span', 'a', 'h1','h2','h3'];
    for (const opcao of opcoes) {
      let tags = document.querySelector(opcao);
      for (const tag of tags) {
        tag.styles = window.getComputedStyle(tag);
        console.log(styles.fontSize)
      }
    }
  }

  /*let mexerFonte 
  const tamanhoFonte = document.querySelector('tamanhoFonte')
  const styles = window.getComputedStyle(tamanhoFonte)
  console.log(styles.fontSize)
/*/
  function AumentarTamanhoDeFonteAtual() {

    return mexerFonte++
  }

  function diminuirTamanhoDeFonteAtual() {
    return mexerFonte--
  }

  //const div = document.querySelector('div')
  //const styles = window.getComputedStyle(div)
  //console.log(styles.fontSize)

    document.querySelector('#btnAumentarFonte').addEventListener('click', async function () {
    const tab = await abaAtiva();
    console.log(tab)
    let tamanhoFonte = AumentarTamanhoDeFonteAtual()
    chrome.scripting.executeScript({
      target: {
        tabId: tab.id,
        allFrames: true
      },
      function: mexerFonte,
      args: [tamanhoFonte]
    });
  });

  document.querySelector('#btnDiminuirFonte').addEventListener('click', async function () {
    const tab = await abaAtiva();
    console.log(tab)
    let tamanhoFonte = diminuirTamanhoDeFonteAtual()
    chrome.scripting.executeScript({
      target: {
        tabId: tab.id,
        allFrames: true
      },
      function: mexerFonte,
      args: [tamanhoFonte]
    });
  });


})