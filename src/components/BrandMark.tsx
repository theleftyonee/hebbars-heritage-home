type Variant = 'horiz' | 'horizCream' | 'stackCream' | 'seal' | 'sealCream' | 'mark'

const src: Record<Variant, string> = {
  horiz: '/images/logo-horiz.png',
  horizCream: '/images/logo-horiz-cream.png',
  stackCream: '/images/logo-stack-cream.png',
  seal: '/images/logo-seal.png',
  sealCream: '/images/logo-seal-cream.png',
  mark: '/images/logo-mark.png',
}

type Props = {
  variant: Variant
  className?: string
  decorative?: boolean
}

export default function BrandMark({ variant, className, decorative = false }: Props) {
  return (
    <img
      className={className}
      src={src[variant]}
      alt={decorative ? '' : 'Hebbar’s Heritage Home'}
      draggable={false}
    />
  )
}
