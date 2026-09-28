import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import Logo from './Logo'

// Os links apontam para o id de cada seção. O scroll suave vem da classe
// "scroll-smooth" colocada na tag <html> (index.html).
const links = [
  { href: '#beneficios', texto: 'Benefícios' },
  { href: '#funcionalidades', texto: 'Funcionalidades' },
  { href: '#cardapio', texto: 'Cardápio' },
  { href: '#depoimentos', texto: 'Depoimentos' },
  { href: '#contato', texto: 'Contato' },
]

function Navbar() {
  const [rolou, setRolou] = useState(false) // a página já saiu do topo?
  const [menuAberto, setMenuAberto] = useState(false) // menu mobile

  useEffect(() => {
    // Sempre que a página rolar, verificamos a posição vertical
    const aoRolar = () => setRolou(window.scrollY > 30)
    aoRolar()
    window.addEventListener('scroll', aoRolar)

    // Limpeza: remove o listener quando o componente é desmontado
    return () => window.removeEventListener('scroll', aoRolar)
  }, [])

  const fecharMenu = () => setMenuAberto(false)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        rolou || menuAberto
          ? 'bg-white/85 shadow-suave backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-18 max-w-6xl items-center justify-between px-5">
        <Logo />

        {/* Links para telas médias e grandes */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-cinza transition-colors hover:text-coral"
              >
                {link.texto}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#baixar"
          className="hidden rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-white shadow-flutuante transition hover:-translate-y-0.5 hover:bg-coral-escuro md:inline-block"
        >
          Baixar app
        </a>

        {/* Botão do menu mobile */}
        <button
          type="button"
          onClick={() => setMenuAberto(!menuAberto)}
          className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-tinta shadow-suave md:hidden"
          aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuAberto}
        >
          <FontAwesomeIcon icon={menuAberto ? faXmark : faBars} />
        </button>
      </nav>

      {/* Menu mobile: só aparece quando menuAberto é true */}
      {menuAberto && (
        <ul className="mx-5 mb-4 flex flex-col gap-1 rounded-3xl bg-white p-3 shadow-suave md:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={fecharMenu}
                className="block rounded-2xl px-4 py-3 font-medium text-tinta hover:bg-coral-claro"
              >
                {link.texto}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#baixar"
              onClick={fecharMenu}
              className="mt-1 block rounded-2xl bg-coral px-4 py-3 text-center font-semibold text-white"
            >
              Baixar app
            </a>
          </li>
        </ul>
      )}
    </header>
  )
}

export default Navbar
