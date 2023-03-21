import { BigInt } from "@graphprotocol/graph-ts";

import { Transfer } from "../generated/ERC20/ERC20";
import {
  TokenBalance,
} from "../generated/schema";

const zeroAddress = '0x0000000000000000000000000000000000000000';

export function handleTransfer(event: Transfer): void {
  let from = event.params.from.toHex();
  let to = event.params.to.toHex();
  let value = event.params.value;

  let tokenId = event.address.toHex();
  let tokenAddress = event.address;

  if (from != zeroAddress) {
    let fromTokenBalanceId = tokenId + "-" + from;
    let fromTokenBalance = TokenBalance.load(fromTokenBalanceId);
    if (fromTokenBalance == null) {
      fromTokenBalance = new TokenBalance(fromTokenBalanceId);
      fromTokenBalance.tokenAddress = tokenAddress;
      fromTokenBalance.account = event.params.from;
      fromTokenBalance.value = BigInt.fromString("0");
    }
    fromTokenBalance.value = fromTokenBalance.value.minus(value);
    fromTokenBalance.save();
  }

  if (to != zeroAddress) {
    let toTokenBalanceId = tokenId + "-" + to;
    let toTokenBalance = TokenBalance.load(toTokenBalanceId);
    if (toTokenBalance == null) {
      toTokenBalance = new TokenBalance(toTokenBalanceId);
      toTokenBalance.tokenAddress = tokenAddress;
      toTokenBalance.account = event.params.to;
      toTokenBalance.value = BigInt.fromString("0");
    }
    toTokenBalance.value = toTokenBalance.value.plus(value);
    toTokenBalance.save();
  }
}
