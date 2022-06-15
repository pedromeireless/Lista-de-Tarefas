let inputTarefas = document.querySelector('input')
let botaoAdiciona = document.querySelector('.plus-button')
let tarefas = document.querySelector('.resultados')
let data = new Date()

mostraDia()

botaoAdiciona.addEventListener('click', function(){ 
    if (inputTarefas.value == '') {return alert('adicione uma tarefa')} 
    criaTarefa(inputTarefas.value)
    inputTarefas.value = ''
    salvarTarefa()
})

document.addEventListener('click', function(e){ // remove a tarefa ao clicar no X
    const el = e.target
    if (el.classList.contains('delete-button')) {
        el.parentElement.remove()
        salvarTarefa() 
    }
})

inputTarefas.addEventListener('keydown', function(e){ // adiciona tarefa ao clicar com enter
    let key = e.key
    if (key === 'Enter') {
        if (inputTarefas.value == '') {return alert('adicione uma tarefa')}
        criaTarefa(inputTarefas.value)
        inputTarefas.value = ''
        salvarTarefa()
    }
})
    
function criaLi(){
    const li = document.createElement('li')
    return li;
}

function criaTarefa(msg){
    const li = criaLi();
    const btn = criaBotao()
    li.classList.add('tarefa')
    li.innerHTML += msg;
    li.appendChild(btn)
    tarefas.appendChild(li)
}

function criaBotao(){
    const btn = document.createElement('button')
    btn.innerText = 'X'
    btn.classList.add('delete-button')
    return btn
}

function mostraDia(){
    let dia = document.querySelector('.dia')
    let dataNova = data.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    dia.innerHTML = dataNova
}

function salvarTarefa() {
    const todasAsTarefas = document.querySelectorAll('li')
    const listaDeTarefas = []

        for (let task of todasAsTarefas){
            let textoTarefas = task.innerText;
            textoTarefas = textoTarefas.replace('X', '').trim()
            listaDeTarefas.push(textoTarefas)
        }
    let listaJSON = JSON.stringify(listaDeTarefas)
    localStorage.setItem('tarefas', listaJSON)
}

function recuperaTarefas() {
    const tarefaSalva = localStorage.getItem('tarefas')
    const listaDeTarefas = JSON.parse(tarefaSalva)

    for (let tarefa of listaDeTarefas) {
        criaTarefa(tarefa)
    }
}

recuperaTarefas()