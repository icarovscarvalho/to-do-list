//1.
const form = document.querySelector('#todo-form')
const taskTitleInput = document.querySelector('#task-title-input')
const todoListUl = document.querySelector('#todo-list')
const list = document.getElementById('list')

//2. - Criar um Array para manter a llista de tarefas
let tasks = []

function renderTaskOnHTML(taskTitle, done = false){
    //2.5 - Adicionando a tarefa no código HTML
    //2.5.1 - Criando elementos 
    // li criado
    const li = document.createElement('li')

    // input criado
    const input = document.createElement('input')
    // valor atribuido ao input
    input.setAttribute('type', 'checkbox')
    //  Adicionando escutador ao button para remover checkbox value
    input.addEventListener('change', (event)=>{
        // Variável para modificação da li quando acionado o botão
        const liToToggle = event.target.parentElement

        // Variável de controle do título dentro do Array
        const spanToToggle = liToToggle.querySelector('span')

        // Variável para verificar se value done está marcado ou não
        const done = event.target.checked
        if (done) {
            spanToToggle.style.textDecoration = 'line-through'
        } else {
            spanToToggle.style.textDecoration = 'none'
        }

        // Mudança do done dentro do array caso checked
        tasks = tasks.map(t => {
            if (t.title === spanToToggle.textContent) {
                return{
                    title: t.title,
                    done: !t.done
                }
            }

            return t
        })

        //Enviando informação para o localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks))
    })
    //Verifica padrão do done dentro do Array
    input.checked = done

    // span criado
    const span = document.createElement('span')
    // Verifica o done o localStorage e muda o estilo
    span.textContent = taskTitle
    if (done) {
        span.style.textDecoration = 'line-through'
    }
    
    // button criado
    const button = document.createElement('button')
    //  Texto do button
    button.textContent = 'X'
    //  Adicionando escutador ao button para remover li
    button.addEventListener('click', (event)=>{
        // Variável para remoção da li quando acionado o botão
        const liToRemove = event.target.parentElement

        // Variável de controle do título dentro do Array
        const titleToRemove = liToRemove.querySelector('span').textContent

        //Novo valor atribuído ao Array depois de excluir o título
        tasks = tasks.filter(t => t.title !== titleToRemove)

        todoListUl.removeChild(liToRemove)

        //Enviando informação para o localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks))

    })

    //2.5.2 - Criando elementos dentro da tag li
    li.appendChild(input)
    li.appendChild(span)
    li.appendChild(button)

    //2.5.2 - Criando elemento dentro da tag ul
    todoListUl.appendChild(li)
}

//3. - Ao Carregar a página
window.onload = () => {
    const tasksOnLocalStorage = localStorage.getItem('tasks')
    if (!tasksOnLocalStorage) return
    
    tasks = JSON.parse(tasksOnLocalStorage)

    tasks.forEach(t => {
        renderTaskOnHTML(t.title, t.done)
    });

    //Verificador dos display para o Array se vazio
    if (tasks.length !== 0){
        list.style.display = 'flex'
    }else{
        list.style.display = 'none'
    }
}

//2. - Acionamento do botão submit
form.addEventListener('submit', (evento)=>{
    evento.preventDefault();//Evita a página de atualizar quando o button for acionado dentro do form

    //Abre lista de tarefas com acionamento do botão
    if (list.style.display === 'none'){
        list.style.display = 'flex'
    }

    //2.1 - Captura do valor do Input
    const taskTitle = taskTitleInput.value

    //2.2 - Criar mínimo de caracteres dentro do input
    if (taskTitle.length < 3) {
        alert('Sua task deve ter no mínimo 3 caracteres')
        return;
    }

    //2.4 - Enviando o valor do Input para dentro do Array task
    tasks.push({
        title: taskTitle,
        done:false
    })
    //Enviando informação para o localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks))

    //Chamar função de criação de tasks no HTML
    renderTaskOnHTML(taskTitle)

    //2.5.3 - Limpando o input após o submit
    taskTitleInput.value = ''
})
