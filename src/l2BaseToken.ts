import { Bytes } from "@graphprotocol/graph-ts";
import {
  Mint as MintEvent,
  Transfer as TransferEvent,
  Withdrawal as WithdrawalEvent,
} from "../generated/contracts-preprocessed/L2BaseToken.sol:L2BaseToken/contracts_preprocessed_L2BaseToken_sol_L2BaseToken"
import {
  Mint,
  Transfer,
  Withdrawal,
} from "../generated/schema"

export function handleMint(event: MintEvent): void {
  let entity = new Mint(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.receiver = event.params.account.toHexString()
  entity.amount = event.params.amount.toString()

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from.toHexString()
  entity.to = event.params.to.toHexString()
  entity.value = event.params.value.toString()

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdrawal(event: WithdrawalEvent): void {
  let txHash = event.transaction.hash;
  let shortHash = Bytes.fromUint8Array(txHash.subarray(0, 8));

  let logIndexBytes = new Bytes(2);
  logIndexBytes[0] = (event.logIndex.toI32() >> 8) as u8;
  logIndexBytes[1] = event.logIndex.toI32() as u8;

  let id = shortHash.concat(logIndexBytes as Bytes);

  let entity = new Withdrawal(id)
  entity.sender = event.params._l2Sender.toHexString();
  entity.receiver = event.params._l1Receiver.toString();
  entity.amount = event.params._amount.toString()

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
