let btnCriar = document.getElementById('btnCriar');
let btnConsultar = document.getElementById('btnConsultar');
let respConsulta = document.getElementById('resposta');

let URL = 'https://6729435e6d5fa4901b6cab7b.mockapi.io/cardapio';

// Criar prato
btnCriar.addEventListener('click', evt => {
    let nomePrato = document.getElementById('nomePrato').value;
    let descricaoPrato = document.getElementById('descricaoPrato').value;
    let precoPrato = document.getElementById('precoPrato').value;

    if(nomePrato === "" || descricaoPrato === "" || precoPrato === "" ){
        alert("Digite as informações nos campos!")
    }else{
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nomePrato,
                descricao: descricaoPrato,
                preco: precoPrato
            })
        })
        .then(resp => resp.json())
        .then(obj => console.log("Prato criado:", obj))
        
        document.getElementById('nomePrato').value = "";
        document.getElementById('descricaoPrato').value = "";
        document.getElementById('precoPrato').value = "";
    }
});

// Consultar pratos
btnConsultar.addEventListener('click', consultarPrato);
function consultarPrato() {
    fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(obj => {
        respConsulta.innerHTML = '';
        obj.forEach(prato => {
            let div = document.createElement('div');
            div.className = "card-resposta";
            div.innerHTML = `
                <p><strong>Prato:</strong> ${prato.nome}</p>
                <p><strong>Descrição:</strong> ${prato.descricao}</p>
                <p><strong>Preço:</strong> ${prato.preco}</p>
                <p>
                    <button class="btnEditar" onclick="editarPrato('${prato.id}', '${prato.nome}', '${prato.descricao}', '${prato.preco}')">Editar</button>
                    <button class="btnExcluir" onclick="excluirPrato('${prato.id}')">Excluir</button>
                <p>`;
            respConsulta.appendChild(div);
        });
    })
}

// Editar prato
function editarPrato(id, nome, descricao, preco){
    let nomePrato = document.getElementById('nomePrato');
    let descricaoPrato = document.getElementById('descricaoPrato');
    let precoPrato = document.getElementById('precoPrato');
    let btnAtualizar = document.getElementById('btnAtualizar');

    nomePrato.value = nome;
    descricaoPrato.value = descricao;
    precoPrato.value = preco;

    btnAtualizar.style.display = "inline-block";
    respConsulta.innerHTML = '';

    btnAtualizar.addEventListener('click', evt => {
        fetch(URL + "/" + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                nome: nomePrato.value,
                descricao: descricaoPrato.value,
                preco: precoPrato.value
            })
        })
        .then(resp => resp.json())
        .then(obj => console.log('Prato atualizado:', obj))

        btnAtualizar.style.display = "none";
        nomePrato.value = "";
        descricaoPrato.value = "";
        precoPrato.value = "";
    });

}

// Excluir prato
function excluirPrato(id) {
    fetch(URL + "/" + id, {
        method: 'DELETE'
    })
    .then(() => {
        console.log("Prato excluído");
        consultarPrato();
    })
}
