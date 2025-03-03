import { SplGovernance } from "governance-idl-sdk";
import { Connection } from "@solana/web3.js";

const connection = new Connection("RPC_ENDPOINT");
const splGovernance = new SplGovernance(
  connection,
  optionalProgramId // if custom governance program is used
);