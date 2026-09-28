import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft, faStar } from '@fortawesome/free-solid-svg-icons'
import TituloSecao from './TituloSecao'
import { useJson } from '../hooks/useJson'

const CORES_AVATAR = ['bg-coral-claro text-coral-escuro', 'bg-salvia-claro text-salvia', 'bg-mel-claro text-mel']

// Pega as iniciais do nome: "Mariana Costa" vira "MC"
const iniciais = (nome) =>
  nome
    .split(' ')
    .map((parte) => parte[0])
    .slice(0, 2)
    .join('')

function Depoimentos() {
  const { dados: depoimentos } = useJson('/data/depoimentos.json')

  return (
    <section id="depoimentos" className="py-24">
      <div className="mx-auto max-w-6xl px-5">
        <TituloSecao
          etiqueta="Depoimentos"
          titulo="Quem pede, recomenda"
          descricao="O que nossos clientes dizem sobre a experiência com o GourmetOn."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {depoimentos.map((item, indice) => (
            <figure key={item.nome} className="flex flex-col rounded-3xl bg-white p-7 shadow-suave">
              <FontAwesomeIcon icon={faQuoteLeft} className="text-2xl text-coral/30" />

              {/* Estrelas: cria um array de 5 posições e pinta conforme a nota */}
              <div className="mt-4 flex gap-1 text-sm" aria-label={`Nota ${item.nota} de 5`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} className={i < item.nota ? 'text-mel' : 'text-areia'} />
                ))}
              </div>

              <blockquote className="mt-4 flex-1 leading-relaxed text-cinza">"{item.texto}"</blockquote>

              <figcaption className="mt-6 flex items-center gap-3">
                <span
                  className={`grid h-11 w-11 place-items-center rounded-2xl text-sm font-bold ${
                    CORES_AVATAR[indice % CORES_AVATAR.length]
                  }`}
                >
                  {iniciais(item.nome)}
                </span>
                <span>
                  <span className="block font-semibold">{item.nome}</span>
                  <span className="block text-sm text-cinza">{item.cidade}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Depoimentos
