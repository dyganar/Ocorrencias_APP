var contravida = ["homicidio", "suicídio", "infanticídio", "lesão corporal", "vias de fato", "ameaça", "violação de domicilio", "sequestro", "posse de arma"];
var transito = ["capotamento", "colisão", "abalroamento", "choque"];
var patrimonio = ["furto", "roubo", "abuso de incapaz", "receptação", "dano", "extorsão", "extelionato"];
var drogas = ["tráfico", "uso ou posse de entorpecente"];
var publico = ["perturbação do sossego público", "disparo de arma de fogo", "falta de habilitação", "direção perigosa"];
var mulher = ["assédio", "estupro", "tentativa de estupro"];
var ocorrencias = new Object();
var ocorrencias = {contravida:contravida, transito:transito, patrimonio:patrimonio, drogas:drogas, publico:publico, mulher:mulher};
var enviarOcorrencia;

var conteudo = document.getElementById('conteudo');
var apresentacao = document.getElementById('apresentacao');
var btnAp = document.getElementById('btnAp');
var cidade = document.getElementById("cidade");
var gu = document.getElementById("gu");
var data = document.getElementById("data");
var local = document.getElementById("local");
var quant = document.getElementById("display");
var env = document.querySelector("#env");
var relato = document.getElementById("relato");
var enviarOcorrencia;
var ocorrencia = document.getElementById("ocorrencia");
var dados = ["nome", "idade", "endereco", "telefone", "genero", "documento", "condicao - Vitima, autor, testemunha"];
var veiculo = ["veiculo", "placa", "cidade", "danos"];
var dadoMulher = ["parentesco"];
var idEnvolvidos = [];

function getOcorrencia(){
    
    switch(ocorrencia.selectedIndex){
        case 1:
            criarSelect(ocorrencias["contravida"]);
            break;
        case 2:
            criarSelect(ocorrencias["transito"]);
            break;
        case 3:
            criarSelect(ocorrencias["patrimonio"]);
            break;
        case 4:
            criarSelect(ocorrencias["publico"]);
            break;
        case 5:
            criarSelect(ocorrencias["drogas"]);
            break;
        case 6:
            criarSelect(ocorrencias["mulher"]);
            break;
    }
}

function criarSelect(ocorrencias){
    var select = document.getElementById("tipo");
    var cont = 0;

    do{
    				 select.remove(cont);
        if(select.length === 0){
            break;
        }
    }
    while(cont === 0);
    for (var i in ocorrencias) {
        var option = new Option(ocorrencias[i], ocorrencias[i]);
    				select.appendChild(option);
    }
    view(select); 
}

//Essa função é uma gambiarra que recebe um valor e automaticamente copia para a área de transferência. Caso seu navegador não suporte o tratamento de erro chama uma função secundária.

function copyTextToClipboard(text) { var textArea = document.createElement("textarea"); textArea.style.position = 'fixed'; textArea.style.top = 0; textArea.style.left = 0; textArea.style.width = '2em'; textArea.style.height = '2em'; textArea.style.padding = 0; textArea.style.border = 'none'; textArea.style.outline = 'none'; textArea.style.boxShadow = 'none'; textArea.style.background = 'transparent'; textArea.value = text; document.body.appendChild(textArea); textArea.select(); try { var successful = document.execCommand('copy'); var msg = successful ? 'successful' : 'unsuccessful'; console.log('Copying text command was ' + msg); } catch (err) { console.log('Oops, unable to copy'); window.prompt("Copie para área de transferência: Ctrl+C e tecle Enter", text); } document.body.removeChild(textArea); } // Teste var copyTest = document.querySelector('.copyTest'); copyTest.addEventListener('click', function(event) { copyTextToClipboard('Teste'); });

function addEnvolvidos(){
    var contador = 0;  
        
    	env.innerHTML = "";
    switch(ocorrencia.selectedIndex){
       case 2:
          dados = dados.concat(veiculo);  
          break;
       case 6:
          dados = dados.concat(dadoMulher);
          break;
    }
    for(var count = 1; count <= quant.value; count++){
       env.innerHTML += "PESSOA n° "+count+"\<br\>";  
       for(var cont = 0; cont < dados.length; cont++){
          var envolvido = document.createElement("input");
          var tipo = document.createAttribute("type");
          var id = document.createAttribute("id");
          var placeholder = document.createAttribute("placeholder"); 
          var required = document.createAttribute("required");
          tipo.value = "text";
          id.value = dados[cont]+"_"+count;
          placeholder.value = dados[cont];
          envolvido.setAttributeNode(id);
          envolvido.setAttributeNode(tipo);
          envolvido.setAttributeNode(placeholder);
          if(dados[cont] === "nome" || dados[cont] === "condicao - Vitima, autor, testemunha"){
              envolvido.setAttributeNode(required);
          }
          env.appendChild(envolvido);
          idEnvolvidos.push(id.value);
       }  
       env.innerHTML += "\<br\>";    
    }
}

function view(select){
    var form = document.querySelector('form');
    var dados = "";
    form.onsubmit = function (){
        for(var n = 0; n < idEnvolvidos.length; n++){
           if(document.getElementById(idEnvolvidos[n]).value != ""){
              dados += "*" + idEnvolvidos[n] + "*: \n";
              dados += document.getElementById(idEnvolvidos[n]).value + "\n";
           }
        }
        copyTextToClipboard("\*TIPO DE OCORRÊNCIA:\* \n"+select.options[select.selectedIndex].value + "\n\*CIDADE:\*\n" + cidade.value + "\n\*GU DE SERVIÇO:\*\n" + gu.value + "\n\*DATA DO OCORRIDO:\*\n" + data.value + "\n\*LOCAL:\*\n" + local.value + "\n\*ENVOLVIDOS:\*\n" + quant.value + "\n" + dados +"\n\*RELATO:\*\n"+ relato.value);
        alert("TIPO DE OCORRÊNCIA: \n"+select.options[select.selectedIndex].value + "\nCIDADE:\n" + cidade.value + "\nGU DE SERVIÇO:\n" + gu.value + "\nDATA DO OCORRIDO:\n" + data.value + "\nLOCAL:\n" + local.value + "\n ENVOLVIDOS: " + quant.value + "\n" + dados + "\n\*RELATO:\*\n"+ relato.value);
    };
}


btnAp.onclick = function (){
    apresentacao.classList.add('hidden');
    conteudo.classList.remove('hidden');
}

ocorrencia.addEventListener('change', getOcorrencia());