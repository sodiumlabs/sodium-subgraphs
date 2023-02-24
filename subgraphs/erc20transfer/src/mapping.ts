import { Transfer } from "../generated/ERC20/ERC20";
import {
  TokenTransfer
} from "../generated/schema";

export function handleTransfer(event: Transfer): void {
  let from = event.params.from;
  let to = event.params.to;
  let tokenAddress = event.address;

  // save transfer
  let transfer = new TokenTransfer(event.transaction.hash.toHex() + event.logIndex.toString());
  transfer.blockNumber = event.block.number;
  transfer.blockHash = event.block.hash;
  transfer.blockTimestamp = event.block.timestamp.toI32();
  transfer.txnHash = event.transaction.hash;
  transfer.logIndex = event.logIndex.toI32();
  transfer.amount = event.params.value;
  transfer.from = from;
  transfer.to = to;
  transfer.tokenAddress = tokenAddress;
  transfer.save();
}
