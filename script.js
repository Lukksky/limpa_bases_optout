function enviar() {
    const inputFileDisparo = document.getElementById('txtcsvdisparo').files[0];
    const inputFileOptOut = document.getElementById('txtcsvoptout').files[0];
    const retorno = document.getElementById('res');
    
    if (!inputFileDisparo || !inputFileOptOut) {
      alert('Por favor, selecione ambos os arquivos CSV!');
      return false;
    }
    
   
    const fileExtensionDisparo = inputFileDisparo.name.split('.').pop().toLowerCase();
    const fileExtensionOptOut = inputFileOptOut.name.split('.').pop().toLowerCase();
    if (fileExtensionDisparo !== 'csv' || fileExtensionOptOut !== 'csv') {
      alert('Por favor, selecione arquivos no formato CSV!');
      return false;
    }
  
    
    const readerDisparo = new FileReader();
    const readerOptOut = new FileReader();
  
    readerDisparo.onload = function(event) {
      const contentDisparo = event.target.result;
      
      readerOptOut.onload = function(event2) {
        const contentOptOut = event2.target.result;
        
       
        const cleanedCSV = cruzarDados(contentDisparo, contentOptOut);
        
        if (cleanedCSV === null) {
          
          retorno.innerHTML = 'Erro: As colunas "Ações" ou "Telefone" não foram encontradas.';
          return false;
        }
  
        
        const blob = new Blob([cleanedCSV], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'csv_limpo.csv';
        link.click();
  
        retorno.innerHTML = 'Arquivo CSV limpo gerado com sucesso!';
      };
  
      readerOptOut.onerror = function() {
        alert('Erro ao ler o arquivo de opt-out!');
      };
  
      readerOptOut.readAsText(inputFileOptOut);
    };
  
    readerDisparo.onerror = function() {
      alert('Erro ao ler o arquivo de disparo!');
    };
  
    readerDisparo.readAsText(inputFileDisparo);
  }
  
  
  function cruzarDados(contentDisparo, contentOptOut) {
    const linhasDisparo = contentDisparo.split('\n');
    const linhasOptOut = contentOptOut.split('\n');
    
 
    const cabecalhoDisparo = linhasDisparo[0].split(',');
    const cabecalhoOptOut = linhasOptOut[0].split(',');
  
   
    const normalizeHeader = (header) => header.trim().toLowerCase();
  
    const indiceAcoesDisparo = cabecalhoDisparo.findIndex(coluna => normalizeHeader(coluna) === 'ações');
    const indiceTelefoneDisparo = cabecalhoDisparo.findIndex(coluna => normalizeHeader(coluna) === 'telefone');
    const indiceAcoesOptOut = cabecalhoOptOut.findIndex(coluna => normalizeHeader(coluna) === 'ações');
    const indiceTelefoneOptOut = cabecalhoOptOut.findIndex(coluna => normalizeHeader(coluna) === 'telefone');
  
    if ((indiceAcoesDisparo === -1 && indiceTelefoneDisparo === -1) ||
        (indiceAcoesOptOut === -1 && indiceTelefoneOptOut === -1)) {
    
      return null;
    }
  
    
    const indiceAcoes = indiceAcoesDisparo !== -1 ? indiceAcoesDisparo : indiceTelefoneDisparo;
    const indiceOptOut = indiceAcoesOptOut !== -1 ? indiceAcoesOptOut : indiceTelefoneOptOut;
  
    
    const numerosOptOut = new Set();
    const dadosOptOut = [];
    for (let i = 1; i < linhasOptOut.length; i++) {
      const linha = linhasOptOut[i].split(',');
      const numero = linha[indiceOptOut]?.trim();
      if (numero) {
        numerosOptOut.add(numero.split('@')[0]); 
      }
      dadosOptOut.push(linha);
    }
  
    const dadosDisparo = [];
    for (let i = 1; i < linhasDisparo.length; i++) {
      const linha = linhasDisparo[i].split(',');
      const numero = linha[indiceAcoes]?.trim();
      if (numero && !numerosOptOut.has(numero.split('@')[0])) { 
        dadosDisparo.push(linha);
      }
    }
  
    
    const cabecalhoFinal = 'Telefone\n';
    const dadosFinal = dadosDisparo.map(linha => {
      const numeroTratado = linha[indiceAcoes]?.split('@')[0] || linha[indiceOptOut]?.split('@')[0]; 
      return numeroTratado;
    }).join('\n');
    
    return cabecalhoFinal + dadosFinal;
  }
  