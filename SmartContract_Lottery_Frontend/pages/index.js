import Head from "next/head";
// import ManualHeader from "../components/ManualHeader";
import Header from "../components/Header";
import LotteryEntrance from "../components/LotteryEntrance";
import classes from "../styles/Header.module.css";
import { useMoralis } from "react-moralis";

const supportedChains = ["31337", "11155111"];

export default function Home() {
  const { isWeb3Enabled, chainId } = useMoralis();

  return (
    <div>
      <Head>
        <title>Smart Contract Lottery</title>
        <meta name="description" content="Our Smart Contract Lottery" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />
      {isWeb3Enabled ? (
        <div>
          {supportedChains.includes(parseInt(chainId).toString()) ? (
            <div className={classes.box}>
              <LotteryEntrance />
            </div>
          ) : (
            <div
              className={classes.connect}
            >{`Please switch to a supported chainId. The supported Chain Ids are: ${supportedChains}`}</div>
          )}
        </div>
      ) : (
        <div className={classes.connect}>Please connect to a Wallet</div>
      )}
    </div>
  );
}

// 18 : 15 : 14
