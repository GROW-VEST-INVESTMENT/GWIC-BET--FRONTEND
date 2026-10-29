import { onboardingFeatures } from '../../data/onboardingFeatures'

function DesktopFeatureHighlights() {
  return (
    <ul className="grid grid-cols-4 gap-3">
      {onboardingFeatures.map(({ title, description, Icon }) => (
        <li
          className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-4"
          key={title}
        >
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#b5ff36]/10 text-[#b5ff36]">
            <Icon aria-hidden="true" size={21} strokeWidth={1.8} />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-bold text-white">
              {title}
            </span>
            <span className="mt-1 block text-xs leading-relaxed text-[#aeb9c8]">
              {description.replace('\n', ' ')}
            </span>
          </span>
        </li>
      ))}
    </ul>
  )
}

export default DesktopFeatureHighlights
