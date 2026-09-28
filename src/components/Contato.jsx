import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faEnvelope, faPaperPlane } from '@fortawesome/free-solid-svg-icons'

const FORM_INICIAL = { nome: '', email: '' }

// Expressão regular simples para validar o formato do e-mail
const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Contato() {
  // Um único estado guarda todos os campos do formulário (componente controlado)
  const [form, setForm] = useState(FORM_INICIAL)
  const [erros, setErros] = useState({})
  const [enviado, setEnviado] = useState(false)

  // Atualiza o campo certo usando o atributo "name" do input
  const alterarCampo = (evento) => {
    const { name, value } = evento.target
    setForm({ ...form, [name]: value })
    setErros({ ...erros, [name]: '' })
  }

  const validar = () => {
    const novosErros = {}
    if (form.nome.trim().length < 2) novosErros.nome = 'Digite seu nome.'
    if (!EMAIL_VALIDO.test(form.email)) novosErros.email = 'Digite um e-mail válido.'
    return novosErros
  }

  const enviar = (evento) => {
    evento.preventDefault()
    const novosErros = validar()

    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros)
      return
    }

    // Formulário apenas visual: aqui entraria o envio para um back-end
    setEnviado(true)
    setForm(FORM_INICIAL)
  }

  return (
    <section id="contato" className="px-5 pb-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 overflow-hidden rounded-[2.5rem] bg-coral px-6 py-14 text-white sm:px-12 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1 text-sm font-semibold">
            <FontAwesomeIcon icon={faEnvelope} />
            Newsletter
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Ganhe frete grátis no primeiro pedido
          </h2>
          <p className="mt-4 max-w-md text-white/85">
            Cadastre seu e-mail para receber cupons, novidades e o aviso de lançamento do app
            na sua cidade.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 text-tinta shadow-suave sm:p-8">
          {enviado ? (
            <div className="py-6 text-center">
              <FontAwesomeIcon icon={faCircleCheck} className="text-5xl text-salvia" />
              <h3 className="mt-4 text-xl font-bold">Cadastro feito!</h3>
              <p className="mt-2 text-cinza">Em breve você recebe seu cupom de frete grátis.</p>
              <button
                type="button"
                onClick={() => setEnviado(false)}
                className="mt-6 rounded-full bg-creme px-5 py-2 text-sm font-medium hover:bg-coral-claro"
              >
                Cadastrar outro e-mail
              </button>
            </div>
          ) : (
            <form onSubmit={enviar} noValidate className="space-y-4">
              <div>
                <label htmlFor="nome" className="text-sm font-medium">Nome</label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  value={form.nome}
                  onChange={alterarCampo}
                  placeholder="Como podemos te chamar?"
                  className={`mt-1.5 w-full rounded-2xl border bg-creme px-4 py-3 outline-none transition focus:border-coral focus:bg-white ${
                    erros.nome ? 'border-coral' : 'border-transparent'
                  }`}
                />
                {erros.nome && <p className="mt-1 text-sm text-coral-escuro">{erros.nome}</p>}
              </div>

              <div>
                <label htmlFor="email" className="text-sm font-medium">E-mail</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={alterarCampo}
                  placeholder="seuemail@exemplo.com"
                  className={`mt-1.5 w-full rounded-2xl border bg-creme px-4 py-3 outline-none transition focus:border-coral focus:bg-white ${
                    erros.email ? 'border-coral' : 'border-transparent'
                  }`}
                />
                {erros.email && <p className="mt-1 text-sm text-coral-escuro">{erros.email}</p>}
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-tinta py-3.5 font-semibold text-white transition hover:bg-black"
              >
                <FontAwesomeIcon icon={faPaperPlane} />
                Quero meu cupom
              </button>
              <p className="text-center text-xs text-cinza">Sem spam. Você pode sair da lista quando quiser.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default Contato
