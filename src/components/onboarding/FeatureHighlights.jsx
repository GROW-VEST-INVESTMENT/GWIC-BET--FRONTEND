import { CircleDot, Gamepad2, Gift, Spade } from 'lucide-react'

const features = [
  {
    title: 'Sports Betting',
    description: 'Football, Tennis,\nBasketball & more',
    Icon: CircleDot,
  },
  {
    title: 'Live Betting',
    description: 'Real-time action,\nbigger wins',
    Icon: Gamepad2,
  },
  {
    title: 'Casino Games',
    description: 'Slots, Blackjack,\nRoulette & more',
    Icon: Spade,
  },
  {
    title: 'Bonuses & Rewards',
    description: 'More play,\nmore wins',
    Icon: Gift,
  },
]

function FeatureHighlights() {
  return (
    <ul className="grid grid-cols-4">
      {features.map(({ title, description, Icon }, index) => (
        <li
          className={`flex min-w-0 flex-col items-center px-1 text-center ${
            index > 0 ? 'border-l border-white/15' : ''
          }`}
          key={title}
        >
          <span className="mb-[2vw] flex size-[11.9vw] items-center justify-center rounded-full border border-[#aaff38]/80 text-white shadow-[0_0_16px_rgba(171,255,54,0.12)]">
            <Icon aria-hidden="true" className="size-[5.5vw]" strokeWidth={1.8} />
          </span>
          <h2 className="text-[2.15vw] font-extrabold leading-tight text-white">
            {title}
          </h2>
          <p className="mt-[1.35vw] whitespace-pre-line text-[2vw] font-semibold leading-[1.45] text-[#c8cbd7]">
            {description}
          </p>
        </li>
      ))}
    </ul>
  )
}

export default FeatureHighlights
