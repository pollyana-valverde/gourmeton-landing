import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleInfo,
  faMagnifyingGlass,
  faRotateLeft,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import TituloSecao from './TituloSecao'
import CardReceita from './CardReceita'
import { buscarReceitas, buscarReceitasExemplo } from '../services/spoonacular'

// Rótulo em português e valor que a Spoonacular espera (em inglês)
const COZINHAS = [
  { rotulo: 'Todas', valor: '' },
  { rotulo: 'Italiana', valor: 'Italian' },
  { rotulo: 'Mexicana', valor: 'Mexican' },
  { rotulo: 'Japonesa', valor: 'Japanese' },
  { rotulo: 'Chinesa', valor: 'Chinese' },
  { rotulo: 'Indiana', valor: 'Indian' },
  { rotulo: 'Tailandesa', valor: 'Thai' },
  { rotulo: 'Francesa', valor: 'French' },
  { rotulo: 'Mediterrânea', valor: 'Mediterranean' },
  { rotulo: 'Americana', valor: 'American' },
]

const TIPOS = [
  { rotulo: 'Qualquer refeição', valor: '' },
  { rotulo: 'Prato principal', valor: 'main course' },
  { rotulo: 'Café da manhã', valor: 'breakfast' },
  { rotulo: 'Salada', valor: 'salad' },
  { rotulo: 'Sopa', valor: 'soup' },
  { rotulo: 'Sobremesa', valor: 'dessert' },
  { rotulo: 'Bebida', valor: 'drink' },
]

const DIETAS = [
  { rotulo: 'Sem restrição', valor: '' },
  { rotulo: 'Vegetariana', valor: 'vegetarian' },
  { rotulo: 'Vegana', valor: 'vegan' },
  { rotulo: 'Sem glúten', valor: 'gluten free' },
]

const SUGESTOES = ['pasta', 'burger', 'sushi', 'curry', 'salad']

function Cardapio() {
  // Texto que o usuário está digitando (muda a cada tecla)
  const [texto, setTexto] = useState('')
  // Filtros realmente aplicados (disparam a requisição)
  const [busca, setBusca] = useState('')
  const [cozinha, setCozinha] = useState('')
  const [tipo, setTipo] = useState('')
  const [dieta, setDieta] = useState('')

  // Estados da requisição
  const [receitas, setReceitas] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [modoExemplo, setModoExemplo] = useState(false)

  // Toda vez que busca, cozinha, tipo ou dieta mudarem, o efeito roda de novo
  useEffect(() => {
    // AbortController cancela a requisição anterior se o usuário trocar o filtro rápido
    const controlador = new AbortController()
    const filtros = { busca, cozinha, tipo, dieta }

    const carregar = async () => {
      setCarregando(true)
      setErro('')

      try {
        const resultado = await buscarReceitas(filtros, controlador.signal)
        setReceitas(resultado)
        setModoExemplo(false)
      } catch (e) {
        if (e.name === 'AbortError') return // requisição cancelada de propósito

        // 401: sem chave ou chave inválida | 402: limite diário da API esgotado
        if (e.status === 401 || e.status === 402) {
          const exemplo = await buscarReceitasExemplo(filtros)
          setReceitas(exemplo)
          setModoExemplo(true)
        } else {
          setErro('Não conseguimos carregar os pratos agora. Verifique sua conexão e tente novamente.')
          setReceitas([])
        }
      } finally {
        if (!controlador.signal.aborted) setCarregando(false)
      }
    }

    carregar()
    return () => controlador.abort()
  }, [busca, cozinha, tipo, dieta])

  const enviarBusca = (evento) => {
    evento.preventDefault() // impede o recarregamento da página
    setBusca(texto.trim())
  }

  const usarSugestao = (sugestao) => {
    setTexto(sugestao)
    setBusca(sugestao)
  }

  const limparFiltros = () => {
    setTexto('')
    setBusca('')
    setCozinha('')
    setTipo('')
    setDieta('')
  }

  const temFiltro = busca || cozinha || tipo || dieta

  return (
    <section id="cardapio" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-5">
        <TituloSecao
          etiqueta="Cardápio ao vivo"
          titulo="Descubra o que pedir hoje"
          descricao="Pratos buscados em tempo real na API da Spoonacular. Pesquise pelo nome em inglês e combine os filtros."
        />

        {/* Barra de busca */}
        <form onSubmit={enviarBusca} className="mx-auto mt-12 flex max-w-2xl gap-2 rounded-full bg-creme p-2 shadow-suave">
          <label htmlFor="busca" className="sr-only">Buscar prato</label>
          <div className="flex flex-1 items-center gap-3 pl-4">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-cinza" />
            <input
              id="busca"
              type="search"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Ex.: pasta, burger, sushi..."
              className="w-full bg-transparent py-2 outline-none placeholder:text-cinza/70"
            />
          </div>
          <button
            type="submit"
            className="rounded-full bg-coral px-6 py-3 text-sm font-semibold text-white transition hover:bg-coral-escuro"
          >
            Buscar
          </button>
        </form>

        <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm">
          <span className="text-cinza">Sugestões:</span>
          {SUGESTOES.map((sugestao) => (
            <button
              key={sugestao}
              type="button"
              onClick={() => usarSugestao(sugestao)}
              className="rounded-full px-2 text-coral-escuro underline-offset-4 hover:underline"
            >
              {sugestao}
            </button>
          ))}
        </div>

        {/* Filtro por culinária (chips) */}
        <div className="mt-10 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center">
          {COZINHAS.map((opcao) => (
            <button
              key={opcao.rotulo}
              type="button"
              onClick={() => setCozinha(opcao.valor)}
              aria-pressed={cozinha === opcao.valor}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                cozinha === opcao.valor
                  ? 'bg-coral text-white shadow-flutuante'
                  : 'bg-creme text-cinza hover:bg-coral-claro hover:text-coral-escuro'
              }`}
            >
              {opcao.rotulo}
            </button>
          ))}
        </div>

        {/* Filtros de tipo de refeição e dieta */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            aria-label="Tipo de refeição"
            className="rounded-full border border-areia bg-white px-4 py-2 text-sm text-tinta outline-none focus:border-coral"
          >
            {TIPOS.map((opcao) => (
              <option key={opcao.rotulo} value={opcao.valor}>{opcao.rotulo}</option>
            ))}
          </select>

          <select
            value={dieta}
            onChange={(e) => setDieta(e.target.value)}
            aria-label="Restrição alimentar"
            className="rounded-full border border-areia bg-white px-4 py-2 text-sm text-tinta outline-none focus:border-coral"
          >
            {DIETAS.map((opcao) => (
              <option key={opcao.rotulo} value={opcao.valor}>{opcao.rotulo}</option>
            ))}
          </select>

          {temFiltro && (
            <button
              type="button"
              onClick={limparFiltros}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-cinza hover:text-coral"
            >
              <FontAwesomeIcon icon={faXmark} />
              Limpar filtros
            </button>
          )}
        </div>

        {/* Aviso quando estamos usando os pratos de exemplo */}
        {modoExemplo && (
          <p className="mx-auto mt-8 flex max-w-2xl items-start gap-3 rounded-2xl bg-mel-claro px-5 py-3 text-sm text-tinta">
            <FontAwesomeIcon icon={faCircleInfo} className="mt-0.5 text-mel" />
            Modo demonstração: a chave da Spoonacular não foi configurada ou o limite diário
            da API acabou. Os filtros continuam funcionando com pratos de exemplo.
          </p>
        )}

        {/* Resultado: carregando, erro, vazio ou lista de cards */}
        <div className="mt-10">
          {carregando ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-80 animate-pulse rounded-3xl bg-creme" />
              ))}
            </div>
          ) : erro ? (
            <p className="rounded-3xl bg-coral-claro p-8 text-center text-coral-escuro">{erro}</p>
          ) : receitas.length === 0 ? (
            <div className="rounded-3xl bg-creme p-10 text-center">
              <p className="font-semibold">Nenhum prato encontrado com esses filtros.</p>
              <button
                type="button"
                onClick={limparFiltros}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-medium shadow-suave"
              >
                <FontAwesomeIcon icon={faRotateLeft} />
                Ver todos os pratos
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {receitas.map((receita) => (
                <CardReceita key={receita.id} receita={receita} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Cardapio
