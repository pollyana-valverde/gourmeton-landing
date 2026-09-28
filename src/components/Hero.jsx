import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faStar, faStore } from '@fortawesome/free-solid-svg-icons'
import BotoesDownload from './BotoesDownload'

const IMAGEM_FUNDO =
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1800&q=75'

const destaques = [
  { icone: faStore, valor: '+500', texto: 'restaurantes' },
  { icone: faClock, valor: '30 min', texto: 'entrega média' },
  { icone: faStar, valor: '4,8', texto: 'nas lojas' },
]

function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      {/* Imagem de fundo com comida */}
      <div
        className="absolute inset-0 bg-areia bg-cover bg-center"
        style={{ backgroundImage: `url(${IMAGEM_FUNDO})` }}
        aria-hidden="true"
      />
      {/* Degradê suave por cima da foto para deixar o texto legível */}
      <div
        className="absolute inset-0 bg-linear-to-b from-creme via-creme/90 to-creme/60 md:bg-linear-to-r md:from-creme md:via-creme/85 md:to-creme/10"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid min-h-[92vh] max-w-6xl items-center px-5 pb-16 pt-32">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-sm font-medium text-coral-escuro shadow-suave backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-salvia" />
            Novo app de delivery
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Comida boa, <span className="text-coral">quentinha</span> e na sua porta.
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-cinza">
            O GourmetOn reúne os melhores restaurantes da sua cidade em um app leve e
            simples. Escolha, pague em segundos e acompanhe o pedido até chegar.
          </p>

          <div id="baixar" className="mt-8">
            <BotoesDownload />
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-3">
            {destaques.map((item) => (
              <div key={item.texto} className="rounded-3xl bg-white/80 p-4 shadow-suave backdrop-blur">
                <FontAwesomeIcon icon={item.icone} className="text-coral" />
                <dt className="sr-only">{item.texto}</dt>
                <dd className="mt-2 text-xl font-bold">{item.valor}</dd>
                <dd className="text-xs text-cinza">{item.texto}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

export default Hero
