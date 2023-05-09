import { ConnectButton } from "web3uikit";
import classes from "../styles/Header.module.css";

export default function Header() {
  return (
    <div className={classes.box}>
      <h1 className={classes.heading}> Decentralized Lottery</h1>
      <div className={classes.button}>
        <ConnectButton moralisAuth={false} />
      </div>
    </div>
  );
}
