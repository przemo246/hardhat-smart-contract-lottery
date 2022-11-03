import { FC } from "react"
import { ConnectButton } from "web3uikit"

const Header: FC = () => {
    return (
        <header className="flex justify-between w-full py-6 px-8 text-white">
            <div className="text-sm tracking-wide font-normal">SMARTCONTRACT LOTTERY</div>
            <ConnectButton moralisAuth={false} />
        </header>
    )
}

export default Header
