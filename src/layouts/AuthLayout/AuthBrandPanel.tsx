import cadastroComposition from '../../assets/images/cadastro-heaven.png'

/**
 * Composição de marca das telas de autenticação.
 *
 * É a coluna direita do layout `form | brand composition`
 * (06-responsive.md §21). Utiliza o asset oficial aprovado, que já
 * contém o arco, a frase e o divisor.
 *
 * Puramente decorativa: não contém interação nem informação necessária
 * para concluir o formulário, e por isso é ocultada no mobile e no
 * tablet.
 */
export function AuthBrandPanel() {
  return (
    <aside
      aria-hidden="true"
      className="relative hidden overflow-hidden bg-forest lg:block lg:w-[52%]"
    >
      <img
        src={cadastroComposition}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
    </aside>
  )
}
