import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'

// Logo reaproveitado no menu e no rodapé
function Logo({ claro = false }) {
  return (
    <a href="#inicio" className="flex items-center gap-2.5" aria-label="GourmetOn, voltar ao início">
      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-coral text-white shadow-flutuante">
        <FontAwesomeIcon icon={faUtensils} />
      </span>
      <span className={`text-xl font-extrabold tracking-tight ${claro ? 'text-white' : 'text-tinta'}`}>
        Gourmet<span className="text-coral">On</span>
      </span>
    </a>
  )
}

export default Logo
