import arthurPhoto from '../assets/images/members/arthur.jpg'
import lucasPhoto from '../assets/images/members/lucas.png'
import pedroPhoto from '../assets/images/members/pedro.webp'
import rickPhoto from '../assets/images/members/rick.jpg'
import type { Member } from '../types'

/** Turma responsável pelo projeto. */
export const CLASS_NAME = '1TDSPW'

/**
 * Integrantes do projeto.
 *
 * Dados migrados de `paginas/integrantes.html` e `paginas/contato.html`
 * da Sprint 2. As duas páginas usavam a mesma lista, por isso ela é
 * centralizada aqui (03-architecture.md §27).
 */
export const MEMBERS: Member[] = [
  {
    id: 'arthur',
    name: 'Arthur de Souza Lopes',
    rm: '573023',
    photo: arthurPhoto,
    github: 'https://github.com/arthurlopes2007',
    linkedin: 'https://www.linkedin.com/in/arthur-souza-lopes-037112346/',
    email: 'arthurdesouzalopes635@gmail.com',
    phone: '(11) 96303-3515',
  },
  {
    id: 'lucas',
    name: 'Lucas Bossi Cruz',
    rm: '572876',
    photo: lucasPhoto,
    github: 'https://github.com/bsscrz',
    linkedin: 'https://www.linkedin.com/in/lucas-bossi-1a54443a3/',
    email: 'lucabossicruz@gmail.com',
    phone: '(11) 96094-2792',
  },
  {
    id: 'pedro',
    name: 'Pedro Daniel Melo de Moraes',
    rm: '569786',
    photo: pedroPhoto,
    github: 'https://github.com/PedroDaniel7',
    linkedin: 'https://www.linkedin.com/in/pedrodanielmoraes/',
    email: 'pedrodaniel.mmoraes@gmail.com',
    phone: '(11) 94928-3544',
  },
  {
    id: 'rick',
    name: 'Rick Nascimento da Costa',
    rm: '571828',
    photo: rickPhoto,
    github: 'https://github.com/rcostaa-dev',
    linkedin: 'https://www.linkedin.com/in/rick-nascimento-b063733b6/',
    email: 'rickgodinhotk7@gmail.com',
    phone: '(11) 97131-2313',
  },
]
