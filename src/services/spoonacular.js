/*
  Serviço responsável por conversar com a API da Spoonacular.
*/

// A chave vem do arquivo .env (localmente) ou das Environment Variables da Vercel.
// No Vite, só variáveis que começam com VITE_ ficam disponíveis no navegador.
const API_KEY = import.meta.env.VITE_SPOONACULAR_KEY
const BASE_URL = 'https://api.spoonacular.com'

/**
 * Busca receitas no endpoint complexSearch aplicando texto e filtros.
 * @param {{ busca: string, cozinha: string, tipo: string, dieta: string }} filtros
 * @param {AbortSignal} signal permite cancelar a requisição se o usuário mudar o filtro
 * @returns {Promise<Array>} lista de receitas
 */
export async function buscarReceitas({ busca, cozinha, tipo, dieta }, signal) {
  if (!API_KEY) {
    const erro = new Error('Chave da API não configurada')
    erro.status = 401
    throw erro
  }

  // URLSearchParams monta a query string e já codifica espaços e acentos
  const params = new URLSearchParams({
    apiKey: API_KEY,
    number: '8',
    addRecipeInformation: 'true',
    sort: busca ? 'relevance' : 'popularity',
  })

  // Só envia o filtro se ele estiver preenchido
  if (busca) params.append('query', busca)
  if (cozinha) params.append('cuisine', cozinha)
  if (tipo) params.append('type', tipo)
  if (dieta) params.append('diet', dieta)

  const resposta = await fetch(`${BASE_URL}/recipes/complexSearch?${params}`, { signal })

  // fetch não lança erro para status 4xx/5xx, então verificamos manualmente
  if (!resposta.ok) {
    const erro = new Error(`Erro ${resposta.status} ao buscar receitas`)
    erro.status = resposta.status
    throw erro
  }

  // Converte o corpo da resposta (texto JSON) em objeto JavaScript
  const dados = await resposta.json()
  return dados.results
}

/**
 * Plano B: quando não há chave ou o limite diário da API acabou,
 * usamos um JSON local com pratos de exemplo e filtramos no próprio navegador.
 */
export async function buscarReceitasExemplo({ busca, cozinha, tipo, dieta }) {
  const resposta = await fetch('/data/pratos-exemplo.json')
  const pratos = await resposta.json()
  const termo = busca.trim().toLowerCase()

  return pratos.filter((prato) => {
    const combinaBusca = !termo || prato.title.toLowerCase().includes(termo)
    const combinaCozinha = !cozinha || prato.cuisines.includes(cozinha)
    const combinaTipo = !tipo || prato.dishTypes.includes(tipo)
    const combinaDieta =
      !dieta ||
      (dieta === 'vegetarian' && prato.vegetarian) ||
      (dieta === 'vegan' && prato.vegan) ||
      (dieta === 'gluten free' && prato.glutenFree)

    return combinaBusca && combinaCozinha && combinaTipo && combinaDieta
  })
}
