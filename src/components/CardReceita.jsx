import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowUpRightFromSquare,
  faClock,
  faHeartPulse,
  faUserGroup,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons'

// Card de uma receita vinda da API. Recebe o objeto "receita" via props.
function CardReceita({ receita }) {
  const [imagemFalhou, setImagemFalhou] = useState(false)

  // Monta a lista de selos a partir dos campos booleanos da API
  const selos = [
    receita.vegan && 'Vegano',
    receita.vegetarian && !receita.vegan && 'Vegetariano',
    receita.glutenFree && 'Sem glúten',
  ].filter(Boolean)

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-suave transition hover:-translate-y-1">
      <div className="relative aspect-4/3 overflow-hidden bg-areia">
        {imagemFalhou || !receita.image ? (
          <div className="grid h-full place-items-center text-4xl text-coral/40">
            <FontAwesomeIcon icon={faUtensils} />
          </div>
        ) : (
          <img
            src={receita.image}
            alt={receita.title}
            loading="lazy"
            onError={() => setImagemFalhou(true)}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        )}

        {receita.cuisines?.[0] && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-tinta backdrop-blur">
            {receita.cuisines[0]}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 font-bold leading-snug">{receita.title}</h3>

        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-cinza">
          <li>
            <FontAwesomeIcon icon={faClock} className="mr-1.5 text-coral" />
            {receita.readyInMinutes} min
          </li>
          <li>
            <FontAwesomeIcon icon={faUserGroup} className="mr-1.5 text-coral" />
            {receita.servings} {receita.servings === 1 ? 'porção' : 'porções'}
          </li>
          <li title="Índice de saúde calculado pela Spoonacular">
            <FontAwesomeIcon icon={faHeartPulse} className="mr-1.5 text-salvia" />
            {Math.round(receita.healthScore)}
          </li>
        </ul>

        {selos.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {selos.map((selo) => (
              <span key={selo} className="rounded-full bg-salvia-claro px-2.5 py-0.5 text-xs font-medium text-salvia">
                {selo}
              </span>
            ))}
          </div>
        )}

        <a
          href={receita.sourceUrl || receita.spoonacularSourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-coral hover:text-coral-escuro"
        >
          Ver receita
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs" />
        </a>
      </div>
    </article>
  )
}

export default CardReceita
