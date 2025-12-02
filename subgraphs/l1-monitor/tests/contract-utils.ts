import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
    DepositMessageSent,
    MessageWithdrawalExecuted
} from "../generated/Contract/Contract"

export function createDepositMessageSentEvent(
    nonce: BigInt,
    l1Vault: Address,
    receiver: Address,
    shares: BigInt
): DepositMessageSent {
    let depositMessageSentEvent = changetype<DepositMessageSent>(newMockEvent())

    depositMessageSentEvent.parameters = new Array()

    depositMessageSentEvent.parameters.push(
        new ethereum.EventParam("nonce", ethereum.Value.fromUnsignedBigInt(nonce))
    )
    depositMessageSentEvent.parameters.push(
        new ethereum.EventParam("l1Vault", ethereum.Value.fromAddress(l1Vault))
    )
    depositMessageSentEvent.parameters.push(
        new ethereum.EventParam("receiver", ethereum.Value.fromAddress(receiver))
    )
    depositMessageSentEvent.parameters.push(
        new ethereum.EventParam("shares", ethereum.Value.fromUnsignedBigInt(shares))
    )

    return depositMessageSentEvent
}

export function createMessageWithdrawalExecutedEvent(
    nonce: BigInt,
    l1Vault: Address,
    receiver: Address,
    shares: BigInt
): MessageWithdrawalExecuted {
    let messageWithdrawalExecutedEvent = changetype<MessageWithdrawalExecuted>(
        newMockEvent()
    )

    messageWithdrawalExecutedEvent.parameters = new Array()

    messageWithdrawalExecutedEvent.parameters.push(
        new ethereum.EventParam("nonce", ethereum.Value.fromUnsignedBigInt(nonce))
    )
    messageWithdrawalExecutedEvent.parameters.push(
        new ethereum.EventParam("l1Vault", ethereum.Value.fromAddress(l1Vault))
    )
    messageWithdrawalExecutedEvent.parameters.push(
        new ethereum.EventParam("receiver", ethereum.Value.fromAddress(receiver))
    )
    messageWithdrawalExecutedEvent.parameters.push(
        new ethereum.EventParam("shares", ethereum.Value.fromUnsignedBigInt(shares))
    )

    return messageWithdrawalExecutedEvent
}
