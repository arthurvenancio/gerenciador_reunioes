import { createClient } from '@supabase/supabase-js'

console.log("SUPABASE_URL:", process.env.SUPABASE_URL)

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

export default async function handler(req, res) {
  const { cod_user } = req.query

  if (!cod_user) {
    return res.status(400).json({ error: 'Código não informado' })
  }

  const { data, error } = await supabase
    .from('usuarios')
    .select('nome_usuario')
    .eq('codigo_usuario', cod_user)
    .single()

  if (error) {
    return res.status(404).json({ error: 'Usuário não encontrado' })
  }

  return res.status(200).json({ nome: data.nome_usuario })
}