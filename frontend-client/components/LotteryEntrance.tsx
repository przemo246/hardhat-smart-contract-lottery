import { FC, useEffect, useState } from "react"
import { abi, contractAddresses } from "../constants"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"

interface ContractAddresses {
    [key: string | number]: string[]
}

const LotteryEntrance: FC = () => {
    const { chainId, isWeb3Enabled } = useMoralis()
    const [entranceFee, setEntranceFee] = useState("0")
    const dispatch = useNotification()

    let raffleAddress: string | undefined
    const chainIdNum = chainId ? parseInt(chainId) : null
    const contractAddressesObj: ContractAddresses = contractAddresses

    if (chainIdNum) {
        raffleAddress =
            chainIdNum in contractAddresses ? contractAddressesObj[chainIdNum][0] : undefined
    }

    const handleEnterRaffle = async () => {
        await enterRaffle({
            onSuccess: handleSuccess,
            onError: (error) => console.log(error),
        })
    }

    const handleSuccess = async (tx: any) => {
        await tx.wait(1)
        handleNotification()
    }

    const handleNotification = () => {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Tx Notification",
            position: "topR",
        })
    }

    const { runContractFunction: enterRaffle } = useWeb3Contract({
        abi,
        contractAddress: raffleAddress,
        functionName: "enterRaffle",
        params: {},
        msgValue: entranceFee,
    })

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi,
        contractAddress: raffleAddress,
        functionName: "getEntranceFee",
        params: {},
    })

    useEffect(() => {
        if (isWeb3Enabled) {
            const handleGetEntranceFee = async () => {
                const entranceFeeFromCall = await getEntranceFee()
                setEntranceFee(entranceFeeFromCall as string)
            }
            handleGetEntranceFee()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isWeb3Enabled])

    return (
        <div>
            {raffleAddress ? (
                <div>
                    <button
                        className="bg-blue-500 rounded-lg px-4 py-2 text-white mb-4"
                        onClick={handleEnterRaffle}
                    >
                        Enter Raffle
                    </button>
                    <div>Entrance fee: {ethers.utils.formatUnits(entranceFee, "ether")} ETH</div>
                </div>
            ) : (
                <div>No Raffle Address Detected</div>
            )}
        </div>
    )
}

export default LotteryEntrance
