import { Approval } from "../generated/ERC20/ERC20";
import {
  TokenApproval,
} from "../generated/schema";

const zeroAddress = '0x0000000000000000000000000000000000000000';

export function handleApproval(event: Approval): void {
  let tokenAddress = event.address;
  let tokenId = event.address.toHex();
  let owner = event.params.owner.toHex();
  let spender = event.params.spender.toHex();
  let value = event.params.value;

  if (spender == zeroAddress || owner == zeroAddress) {
    return;
  }

  let tokenApprovalId = tokenId + "-" + owner + "-" + spender;
  let tokenApproval = TokenApproval.load(tokenApprovalId);
  if (tokenApproval == null) {
    tokenApproval = new TokenApproval(tokenApprovalId);
    tokenApproval.tokenAddress = tokenAddress;
    tokenApproval.ownerAccount = event.params.owner;
    tokenApproval.spenderAccount = event.params.spender;
  }
  tokenApproval.value = value;
  tokenApproval.txnHash = event.transaction.hash;
  tokenApproval.blockHash = event.block.hash;
  tokenApproval.blockNumber = event.block.number;
  tokenApproval.blockTimestamp = event.block.timestamp.toI32();
  tokenApproval.logIndex = event.logIndex.toI32();
  tokenApproval.save();
}
