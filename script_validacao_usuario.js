function alternar_visibilidade(id) {
    const elemento = document.getElementById(id)
    if (elemento.classList.contains("hidden")) {
        elemento.classList.remove("hidden")
    } else {
        elemento.classList.add("hidden")
    }
}

document.getElementById("login-btn").onclick = async () => {
    const cod_user = document.getElementById("cod-user").value

    if (cod_user) {
        try {
            const response = await fetch(`/api/getUser?cod_user=${cod_user}`)
            const data = await response.json()

            if (response.ok) {
                document.getElementById("display-nome-user").innerHTML = data.nome

                alternar_visibilidade("tela-login")
                alternar_visibilidade("tela-principal")
            } else {
                alert(data.error || "Erro ao buscar usuário")
            }

        } catch (err) {
            console.error(err)
            alert("Erro de conexão")
        }
    }
}