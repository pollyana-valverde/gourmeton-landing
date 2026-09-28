// Cabeçalho padrão usado em todas as seções (evita repetir o mesmo JSX)
function TituloSecao({ etiqueta, titulo, descricao }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="inline-block rounded-full bg-coral-claro px-4 py-1 text-sm font-semibold text-coral-escuro">
        {etiqueta}
      </span>
      <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">{titulo}</h2>
      {descricao && <p className="mt-4 text-cinza">{descricao}</p>}
    </div>
  )
}

export default TituloSecao
