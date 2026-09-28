import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faApple, faGooglePlay } from '@fortawesome/free-brands-svg-icons'

// Links fictícios das lojas
const lojas = [
  { icone: faApple, linha1: 'Baixar na', linha2: 'App Store', href: '#' },
  { icone: faGooglePlay, linha1: 'Disponível no', linha2: 'Google Play', href: '#' },
]

function BotoesDownload({ claro = false }) {
  return (
    <div className="flex flex-wrap gap-3">
      {lojas.map((loja) => (
        <a
          key={loja.linha2}
          href={loja.href}
          className={`flex items-center gap-3 rounded-2xl px-5 py-3 transition hover:-translate-y-0.5 ${
            claro
              ? 'bg-white text-tinta shadow-suave hover:shadow-lg'
              : 'bg-tinta text-white shadow-suave hover:bg-black'
          }`}
        >
          <FontAwesomeIcon icon={loja.icone} className="text-2xl" />
          <span className="text-left leading-tight">
            <span className="block text-[11px] opacity-70">{loja.linha1}</span>
            <span className="block font-semibold">{loja.linha2}</span>
          </span>
        </a>
      ))}
    </div>
  )
}

export default BotoesDownload
