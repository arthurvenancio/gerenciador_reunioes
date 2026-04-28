function alternar_visibilidade(id){
            const elemento = document.getElementById(id)
            if(elemento.classList.contains("hidden")){
                elemento.classList.remove("hidden")
            }else{
                elemento.classList.add("hidden")
            }
        }

        document.getElementById("login-btn").onclick = ()=>{
            const cod_user = document.getElementById("cod-user").value

            if(cod_user){
                document.getElementById("display-nome-user").innerHTML="Ítalo"
                alternar_visibilidade("tela-login")
                alternar_visibilidade("tela-principal")
            }
        }