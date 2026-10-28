import brandLogo from '../../assets/gwic-bet-logo.png'

function BrandLogo() {
  return (
    <img
      alt="GWIC BET"
      className="h-auto w-[clamp(150px,41.1vw,243px)] shrink-0"
      src={brandLogo}
    />
  )
}

export default BrandLogo
