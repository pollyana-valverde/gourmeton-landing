import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHeart,
  faLocationDot,
  faMagnifyingGlass,
  faSliders,
  faStar,
  faTicket,
} from '@fortawesome/free-solid-svg-icons'
import TituloSecao from './TituloSecao'
import { useJson } from '../hooks/useJson'

const icones = {
  busca: faMagnifyingGlass,
  filtros: faSliders,
  rastreio: faLocationDot,
  favoritos: faHeart,
  cupons: faTicket,
  avaliacoes: faStar,
}

function Funcionalidades() {
  const { dados: funcionalidades } = useJson('/data/funcionalidades.json')

  return (
    <section id="funcionalidades" className="py-24">
      <div className="mx-auto max-w-6xl px-5">
        <TituloSecao
          etiqueta="Funcionalidades"
          titulo="Tudo o que você precisa em um app só"
          descricao="Recursos pensados para quem quer praticidade sem abrir mão de comer bem."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {funcionalidades.map((item) => (
            <article
              key={item.titulo}
              className="flex gap-4 rounded-3xl bg-white p-6 shadow-suave transition hover:-translate-y-1"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-coral-claro text-coral-escuro">
                <FontAwesomeIcon icon={icones[item.icone]} />
              </span>
              <div>
                <h3 className="font-bold">{item.titulo}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-cinza">{item.descricao}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#cardapio"
            className="inline-flex items-center gap-2 rounded-full bg-tinta px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            Testar a busca agora
          </a>
        </div>
      </div>
    </section>
  )
}

export default Funcionalidades
