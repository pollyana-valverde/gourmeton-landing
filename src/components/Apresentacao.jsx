import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard, faMotorcycle, faStore } from '@fortawesome/free-solid-svg-icons'
import TituloSecao from './TituloSecao'
import { useJson } from '../hooks/useJson'

// O JSON guarda só o "nome" do ícone; aqui traduzimos para o ícone real
const icones = {
  entrega: faMotorcycle,
  restaurantes: faStore,
  pagamento: faCreditCard,
}

// Classes completas escritas por extenso para o Tailwind conseguir encontrá-las
const cores = {
  coral: 'bg-coral-claro text-coral-escuro',
  salvia: 'bg-salvia-claro text-salvia',
  mel: 'bg-mel-claro text-mel',
}

function Apresentacao() {
  const { dados: beneficios, carregando } = useJson('/data/beneficios.json')

  return (
    <section id="beneficios" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-5">
        <TituloSecao
          etiqueta="Por que o GourmetOn"
          titulo="Pedir comida ficou mais simples"
          descricao="Pensamos em cada etapa do pedido para você gastar menos tempo no celular e mais tempo aproveitando a refeição."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {carregando && <p className="text-center text-cinza md:col-span-3">Carregando benefícios...</p>}

          {beneficios.map((item) => (
            <article
              key={item.titulo}
              className="rounded-3xl bg-creme p-8 transition hover:-translate-y-1 hover:shadow-suave"
            >
              <span className={`grid h-14 w-14 place-items-center rounded-2xl text-xl ${cores[item.cor]}`}>
                <FontAwesomeIcon icon={icones[item.icone]} />
              </span>
              <h3 className="mt-6 text-xl font-bold">{item.titulo}</h3>
              <p className="mt-3 leading-relaxed text-cinza">{item.descricao}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Apresentacao
