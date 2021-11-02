
//Tratar entradad de nome
nome.oninput = () => {
    if ('!@#$%ˆ&*()123456789'.indexOf(nome.value.charAt(nome.value.length - 1)) >= 0) {
      nome.value = nome.value.substr(0, nome.value.length - 1);
    }
}

email.onblur = () => {
    let mensagemEmail = document.getElementById("msgEmail");

    if (email.value.indexOf("@") < 0) {    
        mensagemEmail.style.color = "red";
        mensagemEmail.innerText = "O email deve conter @";
    }
    else{
        mensagemEmail.innerText = "";
    }
}

newsenha2.onblur = () => {
    let mensagemNewSenha2 = document.getElementById("msgNewSenha2");

    if(newsenha1.value !== newsenha2.value){
        mensagemNewSenha2.style.color = "red";
        mensagemNewSenha2.style.paddingBottom = "10px";
        mensagemNewSenha2.innerText = "As senhas devem ser as mesmas";
    }
    else{
        mensagemNewSenha2.innerText = "";
    }
}

function leDados () {
    let strDados = localStorage.getItem('db_cadastros');
    let objDados = {};

    if (strDados) {
        objDados = JSON.parse (strDados);
    }
    else {
        objDados = { cadastros: [
        ]}
    }

    return objDados;
}

function lerUser() {
    let strDados = localStorage.getItem('user');
    let objDados = {};

    if (strDados) {
        objDados = JSON.parse (strDados);
    }

    return objDados;
}

function tentarGravar(e) {

    objDados = leDados();

    let strEmail = email.value;
    let strNome = nome.value;
    let strSenha = senha.value;

    let cadatrar  = {email: strEmail, nome: strNome, senha: strSenha}
    let jaExiste = false;

    for(let i = 0; i < objDados.cadastros.length; i++){
        if(objDados.cadastros[i].email == cadatrar.email){
            jaExiste = true;
            alert("Email já cadatrado")
        }
    }

    if(strEmail != "" && strNome != "" && strNome != "" && !jaExiste){
        
        objDados.cadastros.push(cadatrar)
        salvaDados(objDados)
        alert('Cadastro efetuado com sucesso')
    }
}

function salvaDados (dados) {
    localStorage.setItem ('db_cadastros', JSON.stringify (dados));
}

function salvarAutentificacao (dados) {
    localStorage.setItem ('user', JSON.stringify (dados));
}

function validarEdicao(e){
    objDados = leDados();

    for(let i=0; i < objDados.cadastros.length; i++){
        
        if(email.value == objDados.cadastros[i].email && senha.value == objDados.cadastros[i].senha){
            window.location.href = "editaCadatro.html";
            salvarAutentificacao(objDados.cadastros[i])
            return;
        }
    }

    alert("Usuario e senha não conferem")
}

function prencherValores(){
    user = lerUser();

    nome.value = user.nome
    email.value = user.email
}

function regravar(e){
    objDados = leDados();
    user = lerUser();

    let senhaAntiga = "";
    
    console.log(msgNewSenha2.value)
    if(msgNewSenha2.value == "" || msgNewSenha2.value == undefined){
        
        for(let i=0; i < objDados.cadastros.length; i++){
        
            if(user.email == objDados.cadastros[i].email && user.senha == objDados.cadastros[i].senha){
                senhaAntiga = objDados.cadastros[i].senha;
                objDados.cadastros.splice(i,1);
                salvaDados(objDados);
            }
        }

        let strEmail = email.value;
        let strNome = nome.value;
        var strSenha;
        if(newsenha1.value == "" || newsenha1.value == undefined){
            strSenha = senhaAntiga;
        }else{
            strSenha = newsenha1.value;
        }
        

        let cadatrar  = {email: strEmail, nome: strNome, senha: strSenha}
        let jaExiste = false;

        for(let i = 0; i < objDados.cadastros.length; i++){
            if(objDados.cadastros[i].email == cadatrar.email){
                jaExiste = true;
                alert("Email já cadatrado")
            }
        }

        if(strEmail != "" && strNome != "" && strNome != "" && !jaExiste){
            console.log("Entrei aqui")
            objDados.cadastros.push(cadatrar)
            
        }
    
        salvaDados(objDados)

        alert("Dados Autalizados")

        
        window.location.href = "index.html";
    }

}

function excluir(e){
    objDados = leDados();
    user = lerUser();

    for(let i=0; i < objDados.cadastros.length; i++){
        
        if(user.email == objDados.cadastros[i].email && user.senha == objDados.cadastros[i].senha){
            objDados.cadastros.splice(i,1);
            salvaDados(objDados);
            alert("Usuario" + user.nome + " apagado com sucesso");
            window.location.href = "index.html";
        }
    }
}