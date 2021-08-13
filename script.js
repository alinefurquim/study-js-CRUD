const openModal = () => document.getElementById('modal').classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}

// const registerClient = {
//     nome: "Lucas",
//     email: "aline@study.com",
//     celular: "(22)9999.9999",
//     cidade: "Vancouver",
// }

const getLocalStorage = () => JSON.parse(localStorage.getItem('database')) ?? []
const setLocalStorage = (databaseClient) => localStorage.setItem('database', JSON.stringify(databaseClient))

const deleteClient = (index) => {
    const deleteDatabaseClient = readClient()
    deleteDatabaseClient.splice(index, 1)
    setLocalStorage(deleteDatabaseClient)
}

const updateClient = (index, client) => {
    const updatabaseClient = readClient()
    updatabaseClient[index] = client
    setLocalStorage(updatabaseClient)
}

const readClient = () => getLocalStorage()

const createClient = (client) => {
    const databaseClient = getLocalStorage()
    databaseClient.push(client)
    setLocalStorage(databaseClient)    
}

const isValidFields = () => {
   return document.getElementById('form').reportValidity()
}

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
    document.getElementById('nome').dataset.index = 'new'
}

const saveClient = () => {
    if (isValidFields()) {
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value,
        }
        const index = document.getElementById('nome').dataset.index
        if (index == 'new') {
            createClient(client)
            updateTable()
            closeModal()
        } else {
            updateClient(index, client)
            updateTable()
            closeModal()
        }   
    }
}        

const createRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td> 
        <td>${client.cidade}</td>
        <td>
            <button class="button green" type="button" id="edit-${index}">
                Editar
            </button >
            <button class="button red" type="button" id="delete-${index}">
                Excluir
            </button>
        </td>
    `
    document.querySelector('#tableClient>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const updateTableClient  = readClient()
    clearTable()
    updateTableClient.forEach(createRow)
}

const fillFields = (client) => {
    document.getElementById('nome').value = client.nome
    document.getElementById('email').value = client.email
    document.getElementById('celular').value = client.celular
    document.getElementById('cidade').value = client.cidade
    document.getElementById('nome').dataset.index = client.index
}

const editClient = (index) => {
    const client = readClient()[index]
    client.index = index
    fillFields(client)
    openModal()
}

const editDelete = (event) => {
    if (event.target.type == 'button') {
        
        const [action, index] = event.target.id.split('-')
        
        if(action == 'edit') {
            editClient(index)
        } else { 
            const client = readClient()[index]
            const response = confirm(`Deseja realmente excluir o cliente ${client.nome}?`)
            if (response) {
                deleteClient(index)
                updateTable()
            }            
        }            
    }    
}    

updateTable()

document.getElementById('buttonRegisterClient')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('save')
    .addEventListener('click', saveClient)

document.querySelector('#tableClient>tbody')
    .addEventListener('click', editDelete)

document.getElementById('cancel')
    .addEventListener('click', closeModal)