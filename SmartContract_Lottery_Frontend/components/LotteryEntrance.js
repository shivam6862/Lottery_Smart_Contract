import { contractAddresses, abi } from "../constants";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useEffect, useState } from "react";
import { useNotification } from "web3uikit";
import { ethers } from "ethers";

import classes from "../styles/LotteryEntrance.module.css";

export default function LotteryEntrance() {
  const { Moralis, isWeb3Enabled, chainId: chainIdHex } = useMoralis();
  const chainId = parseInt(chainIdHex);

  const raffleAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;

  const [entranceFee, setEntranceFee] = useState("0");
  const [numberOfPlayers, setNumberOfPlayers] = useState("0");
  const [recentWinner, setRecentWinner] = useState("0");

  const dispatch = useNotification();

  const {
    runContractFunction: enterRaffle,
    data: enterTxResponse,
    isLoading,
    isFetching,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "enterRaffle",
    msgValue: entranceFee,
    params: {},
  });

  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getEntranceFee",
    params: {},
  });

  const { runContractFunction: getPlayersNumber } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getNumberOfPlayers",
    params: {},
  });

  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getRecentWinner",
    params: {},
  });

  async function updateUIValues() {
    // const options = { abi, contractAddress: raffleAddress }
    // const fee = await Moralis.executeFunction({ functionName: "getEntranceFee", ...options, })
    const entranceFeeFromCall = (await getEntranceFee()).toString();
    const numPlayersFromCall = (await getPlayersNumber()).toString();
    const recentWinnerFromCall = await getRecentWinner();
    setEntranceFee(entranceFeeFromCall);
    setNumberOfPlayers(numPlayersFromCall);
    setRecentWinner(recentWinnerFromCall);
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUIValues();
    }
  }, [isWeb3Enabled]);

  // the name of the event, parnetheses containing the data type of each event, no spaces
  // const filter={address:raffleAddress,topics:[utils.id("RaffleEnter(address)"),],}

  const handleNewNotification = () => {
    dispatch({
      type: "info",
      message: "Transaction Complete!",
      title: "Transaction Notification",
      position: "topR",
      icon: "bell",
    });
  };

  const handleSuccess = async (tx) => {
    try {
      await tx.wait(1);
      updateUIValues();
      handleNewNotification(tx);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.box}>
      <h1 className={classes.lottery}>Lottery</h1>
      {raffleAddress ? (
        <>
          <button
            className={classes.button}
            onClick={async () =>
              await enterRaffle({
                // onComplete:
                onSuccess: handleSuccess,
                onError: (error) => console.log(error),
              })
            }
            disabled={isLoading || isFetching}
          >
            {isLoading || isFetching ? (
              <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
            ) : (
              "Enter Raffle"
            )}
          </button>
          <div className={classes.data}>
            Entrance Fee: {ethers.utils.formatUnits(entranceFee, "ether")} ETH
          </div>
          <div className={classes.data}>
            The current number of players is: {numberOfPlayers}
          </div>
          <div className={classes.data}>
            The most previous winner was: {recentWinner}
          </div>
        </>
      ) : (
        <div>Please connect to a supported chain </div>
      )}
    </div>
  );
}
