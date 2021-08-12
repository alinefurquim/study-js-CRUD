const registerClient = {
    nome: "Aline Marial",
    email: "aline@study.com",
    celular: "(22)9999.9999",
    cidade: "Vancouver",
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('database')) ?? []
const setLocalStorage = (databaseClient) => localStorage.setItem('database', JSON.stringify(databaseClient))

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