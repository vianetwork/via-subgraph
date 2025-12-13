import { BigInt, Bytes, log } from "@graphprotocol/graph-ts";
import {
  Mint as MintEvent,
  Transfer as TransferEvent,
  Withdrawal as WithdrawalEvent,
} from "../generated/contracts-preprocessed/L2BaseToken.sol:L2BaseToken/contracts_preprocessed_L2BaseToken_sol_L2BaseToken"

import {
  Mint,
  Transfer,
  UserBalance,
  UserDailyBalance,
  Withdrawal,
} from "../generated/schema"

export function handleMint(event: MintEvent): void {
  const id = event.transaction.hash.concatI32(event.logIndex.toI32());

  let entity = Mint.load(id);
  if (entity) return;

  entity = new Mint(id)
  entity.receiver = event.params.account.toHexString()
  entity.amount = event.params.amount.toString()
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  let userBalance = UserBalance.load(entity.receiver);
  if (!userBalance) {
    userBalance = new UserBalance(entity.receiver);
    userBalance.balance = BigInt.zero();
  }

  userBalance.balance = userBalance.balance.plus(event.params.amount);
  userBalance.updatedAt = event.block.timestamp;

  snapshotUserDailyBalance(
    entity.receiver,
    userBalance.balance,
    event.block.timestamp
  )

  userBalance.save()
  entity.save()

  log.info("Mint inserted txhash: {}", [event.transaction.hash.toHexString()]);
}

export function handleTransfer(event: TransferEvent): void {
  const id = event.transaction.hash.concatI32(event.logIndex.toI32());

  let entity = Transfer.load(id);
  if (entity) return;

  entity = new Transfer(id);
  entity.from = event.params.from.toHexString();
  entity.to = event.params.to.toHexString();
  entity.value = event.params.value.toString();
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  let fromUser = UserBalance.load(entity.from);
  if (!fromUser) {
    fromUser = new UserBalance(entity.from);
    fromUser.balance = BigInt.zero();
  }

  let toUser = UserBalance.load(entity.to);
  if (!toUser) {
    toUser = new UserBalance(entity.to);
    toUser.balance = BigInt.zero();
  }

  let amount = event.params.value;

  fromUser.balance = fromUser.balance.minus(amount);
  toUser.balance = toUser.balance.plus(amount);

  fromUser.updatedAt = event.block.timestamp;
  toUser.updatedAt = event.block.timestamp;

  snapshotUserDailyBalance(entity.from, fromUser.balance, event.block.timestamp)
  snapshotUserDailyBalance(entity.to, toUser.balance, event.block.timestamp)

  fromUser.save();
  toUser.save();
  entity.save();

  log.info("Transfer inserted txhash: {}", [event.transaction.hash.toHexString()]);
}

export function handleWithdrawal(event: WithdrawalEvent): void {
  let txHash = event.transaction.hash;

  let shortHash = Bytes.fromUint8Array(txHash.subarray(0, 8));
  let logIndexBytes = new Bytes(2);
  logIndexBytes[0] = (event.logIndex.toI32() >> 8) as u8;
  logIndexBytes[1] = event.logIndex.toI32() as u8;
  let id = shortHash.concat(logIndexBytes as Bytes);

  let entity = Withdrawal.load(id);
  if (entity) return;

  entity = new Withdrawal(id)
  entity.sender = event.params._l2Sender.toHexString();
  entity.receiver = event.params._l1Receiver.toString();
  entity.amount = event.params._amount.toString()
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  let userBalance = UserBalance.load(entity.sender);
  if (!userBalance) {
    userBalance = new UserBalance(entity.sender);
    userBalance.balance = BigInt.zero();
  }

  userBalance.balance = userBalance.balance.minus(event.params._amount);
  userBalance.updatedAt = event.block.timestamp;

  snapshotUserDailyBalance(entity.sender, userBalance.balance, event.block.timestamp)

  userBalance.save()
  entity.save()

  log.info("Withdrawal inserted txhash: {}", [event.transaction.hash.toHexString()]);
}

export function snapshotUserDailyBalance(
  user: string,
  balance: BigInt,
  timestamp: BigInt
): void {
  let dayID = timestamp.toI32() / 86400;

  let id = user + "-" + dayID.toString();

  let snap = UserDailyBalance.load(id);

  if (snap == null) {
    snap = new UserDailyBalance(id);
    snap.user = user;
    snap.dayID = dayID;
  }

  snap.balance = balance;

  snap.timestamp = timestamp;

  snap.save();
}
