import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faInstagram, faTiktok, faWhatsapp, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import Logo from './Logo'
import BotoesDownload from './BotoesDownload'

const redes = [
  { icone: faInstagram, nome: 'Instagram' },
  { icone: faFacebookF, nome: 'Facebook' },
  { icone: faXTwitter, nome: 'X' },
  { icone: faTiktok, nome: 'TikTok' },
  { icone: faWhatsapp, nome: 'WhatsApp' },
]

const legais = ['Termos de uso', 'Política de privacidade', 'Seja um restaurante parceiro', 'Trabalhe como entregador']

function Footer() {
  const ano = new Date().getFullYear()

  return (
    <footer className="bg-tinta text-white/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Logo claro />
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Comida boa, entrega rápida e pagamento fácil. Tudo em um só app.
          </p>
          <div className="mt-5 flex gap-2">
            {redes.map((rede) => (
              <a
                key={rede.nome}
                href="#"
                aria-label={rede.nome}
                className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10 transition hover:bg-coral hover:text-white"
              >
                <FontAwesomeIcon icon={rede.icone} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-white">Contato</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li><FontAwesomeIcon icon={faEnvelope} className="mr-2 text-coral" />contato@gourmeton.com.br</li>
            <li><FontAwesomeIcon icon={faPhone} className="mr-2 text-coral" />(11) 4000-1234</li>
            <li><FontAwesomeIcon icon={faLocationDot} className="mr-2 text-coral" />Av. Paulista, 1106, São Paulo, SP</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white">Institucional</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {legais.map((item) => (
              <li key={item}>
                <a href="#" className="transition hover:text-coral">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white">Baixe o app</h3>
          <div className="mt-4">
            <BotoesDownload claro />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-white/50 sm:flex-row sm:justify-between">
          <p>© {ano} GourmetOn. Projeto acadêmico, FIAP Engenharia de Software.</p>
          <p>Dados de receitas fornecidos pela Spoonacular API.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
