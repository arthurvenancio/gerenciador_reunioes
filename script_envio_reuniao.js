const campo_nome = document.getElementById("display-nome-user")
const campo_tipo_reuniao = document.getElementById("meeting-type")
const campo_participants = document.getElementById("participants-input")
const campo_duracao = document.getElementById("total-timer")
const campo_pautas = document.getElementById("topics-list")
const campo_anotacoes = document.getElementById("notes-area")

const botao_finalizar_reuniao = document.getElementById("finish-btn")


botao_finalizar_reuniao.onclick = () => {
            const nome = campo_nome.textContent
            const duracao = campo_duracao.textContent
            const anotacoes = campo_anotacoes.textContent
            const tipo_reuniao = campo_tipo_reuniao.value

            const valor_participants = campo_participants.textContent


            const arquivo_de_envio = {
                nome,duracao,anotacoes,tipo_reuniao
            }
            console.log(arquivo_de_envio)
        };