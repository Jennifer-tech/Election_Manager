import { useEffect } from 'react'

type Props = {
  isOpen: boolean
  close: (x: boolean) => void
  animate: 'LEFT' | 'RIGHT' | 'UP' | 'DOWN'
  className?: string
  children: React.ReactNode
}

const ModalOverlay = ({
  isOpen,
  close,
  className = 'fixed top-0 bottom-0 left-0 right-0',
  animate,
  children,
}: Props) => {
  useEffect(() => {
    document.addEventListener(
      'keydown',
      e => e.key === 'Escape' && close(false),
    )

    return () => {
      document.removeEventListener('keydown', e => e.key === 'Escape')
    }
  }, [])

  return (
    <div
      className={`z-50 flex ${
        isOpen
          ? ''
          : animate === 'DOWN'
          ? 'translate-y-[200%]'
          : animate === 'UP'
          ? '-translate-y-[200%]'
          : animate === 'LEFT'
          ? '-translate-x-[200%]'
          : 'translate-x-[200%]'
      } overflow-auto ${className} transition-ease w-full`}
    >
      <span
        onClick={() => close(false)}
        className={`${className} transition-ease bg-black/60 w-full`}
      />
      {children}
    </div>
  )
}

export default ModalOverlay
