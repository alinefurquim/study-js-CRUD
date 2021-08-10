const registerClient = {
    nome: "Aline",
    email: "aline@study.com",
    celular: "(22)9999.9999",
    cidade: "Vancouver",
}

const createClient = (client) => {
    const databaseClient = []
    databaseClient.push(client)
    localStorage.setItem('database', JSON.stringify(client))
}