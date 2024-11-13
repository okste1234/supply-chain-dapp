import { useEffect, useState } from "react";
import { readOnlyProvider } from "../constants/providers";
import { getSupplysContract } from "../constants/contracts";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

const useOnlyOwner = () => {
    const { address, isConnected } = useWeb3ModalAccount();
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        if (!address && !isConnected) return;

        const checkOwner = async () => {
            try {
                const contract = getSupplysContract(readOnlyProvider);
                const ownerAddress = await contract.owner();
                setIsOwner(address === ownerAddress);
            } catch (err) {
                console.error("Error fetching owner: ", err);
            }
        };

        checkOwner();
    }, [address, isConnected]);

    return isOwner;
};

export default useOnlyOwner;
