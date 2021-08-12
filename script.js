const openModal = () => document.getElementById('modal').classList.add('active')

const closeModal = () => {
    document.getElementById('modal').classList.remove('active')
    clearFields()
}

const registerClient = {
    nome: "Lucas",
    email: "aline@study.com",
    celular: "(22)9999.9999",
    cidade: "Vancouver",
}

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
}

const saveClient = () => {
    if (isValidFields()) {
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value,
        }
        createClient(client)
        clearFields()
    }
}

document.getElementById('buttonRegisterClient')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('save')
    .addEventListener('click', saveClient)
