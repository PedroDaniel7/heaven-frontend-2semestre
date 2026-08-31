import logoHeaven from '../../assets/images/logo-heaven.png'

/**
 * Proporções do conteúdo visível dentro de `logo-heaven.png`.
 *
 * O arquivo é 500x500 e a marca ocupa a área x 96..399, y 139..308.
 * Os valores abaixo recortam a moldura transparente sem alterar o
 * asset, para que a marca preencha exatamente a largura definida.
 */
const CONTENT_ASPECT_RATIO = '304 / 170'
const MARK_WIDTH = '164.47%'
const MARK_LEFT = '-31.58%'
const MARK_TOP = '-81.75%'

type LogoProps = {
  /** Largura da marca; a altura acompanha a proporção do asset. */
  className?: string
}

/**
 * Marca Heaven — asset oficial `logo-heaven.png`
 * (02-design-system.md §6).
 *
 * O símbolo nunca é redesenhado: a forma e a transparência vêm
 * integralmente do arquivo aprovado, aplicado como máscara.
 *
 * ATENÇÃO — o asset entregue é a variante clara (todos os pixels
 * opacos têm luminância 205–255), pensada para fundo escuro. Sobre o
 * `--color-canvas` das telas de autenticação o contraste seria de
 * 1,05:1, ou seja, invisível. Por isso a marca é pintada com
 * `currentColor`, herdando a cor do contexto: escura sobre o painel
 * claro, como na referência visual aprovada.
 *
 * Assim que a variante escura do logo for disponibilizada, este
 * componente pode voltar a ser um `<img>` simples.
 */
export function Logo({ className }: LogoProps) {
  return (
    <div
      className={`relative overflow-hidden ${className ?? ''}`}
      style={{ aspectRatio: CONTENT_ASPECT_RATIO }}
    >
      <span
        role="img"
        aria-label="Heaven"
        className="absolute bg-current"
        style={{
          width: MARK_WIDTH,
          left: MARK_LEFT,
          top: MARK_TOP,
          aspectRatio: '1 / 1',
          WebkitMaskImage: `url(${logoHeaven})`,
          maskImage: `url(${logoHeaven})`,
          WebkitMaskSize: '100% 100%',
          maskSize: '100% 100%',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
        }}
      />
    </div>
  )
}
