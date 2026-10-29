import brandLogo from '../../assets/gwic-bet-logo.png'

function BrandLogo({ desktop = false }) {
  return (
    <img
      alt="GWIC BET"
      className={`h-auto shrink-0 ${
        desktop
          ? 'w-[clamp(190px,16vw,230px)]'
          : 'w-[clamp(150px,41.1vw,243px)]'
      }`}
      src={brandLogo}
    />
  )
}

export default BrandLogo
