import { FC } from "react"
import { useMoralis } from "react-moralis"
import { useEffect } from "react"

const ManualHeader: FC = () => {
    const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading } =
        useMoralis()

    const handleConnectWallet = async () => {
        await enableWeb3()
        if (typeof window !== "undefined") {
            window.localStorage.setItem("connected", "inject")
        }
    }

    useEffect(() => {
        if (isWeb3Enabled) return
        if (typeof window !== "undefined") {
            if (window.localStorage.getItem("connected")) {
                enableWeb3()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isWeb3Enabled])

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            if (!account) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <header className="flex justify-between w-full py-6 px-8 text-white">
            <div className="text-sm tracking-wide font-normal">SMARTCONTRACT LOTTERY</div>
            {account ? (
                <div>
                    {account.slice(0, 5)}...{account.slice(-4)}
                </div>
            ) : (
                <button
                    className="bg-neutral-100 text-neutral-900 px-6 py-2 rounded-xl shadow-md"
                    onClick={handleConnectWallet}
                    disabled={isWeb3EnableLoading}
                >
                    Connect
                </button>
            )}
        </header>
    )
}

export default ManualHeader
