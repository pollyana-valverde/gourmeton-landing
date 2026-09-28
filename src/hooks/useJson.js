import { useEffect, useState } from 'react'

/*
  Hook personalizado para carregar arquivos JSON locais (pasta public/data).
  Ele guarda três estados: os dados, se está carregando e se deu erro.
  Assim, qualquer componente pode reaproveitar essa lógica com uma linha só.
*/
export function useJson(caminho) {
  const [dados, setDados] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    let ativo = true // evita atualizar o estado se o componente sair da tela

    const carregar = async () => {
      try {
        const resposta = await fetch(caminho)
        if (!resposta.ok) throw new Error(`Não foi possível carregar ${caminho}`)
        const json = await resposta.json()
        if (ativo) setDados(json)
      } catch (e) {
        if (ativo) setErro(e.message)
      } finally {
        if (ativo) setCarregando(false)
      }
    }

    carregar()

    // Função de limpeza: roda quando o componente é desmontado
    return () => {
      ativo = false
    }
  }, [caminho])

  return { dados, carregando, erro }
}
