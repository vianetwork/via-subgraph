import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
    WithdrawalSent,
    DepositExecuted
} from "../generated/Contract/Contract"

export function createWithdrawalSentEvent(
    nonce: BigInt,
    l1Vault: Address,
    l2Vault: Address,
    receiver: Address,
    shares: BigInt
): WithdrawalSent {
    let withdrawalSentEvent = changetype<WithdrawalSent>(newMockEvent())

    withdrawalSentEvent.parameters = new Array()

    withdrawalSentEvent.parameters.push(
        new ethereum.EventParam("nonce", ethereum.Value.fromUnsignedBigInt(nonce))
    )
    withdrawalSentEvent.parameters.push(
        new ethereum.EventParam("l1Vault", ethereum.Value.fromAddress(l1Vault))
    )
    withdrawalSentEvent.parameters.push(
        new ethereum.EventParam("l2Vault", ethereum.Value.fromAddress(l2Vault))
    )
    withdrawalSentEvent.parameters.push(
        new ethereum.EventParam("receiver", ethereum.Value.fromAddress(receiver))
    )
    withdrawalSentEvent.parameters.push(
        new ethereum.EventParam("shares", ethereum.Value.fromUnsignedBigInt(shares))
    )

    return withdrawalSentEvent
}

export function createDepositExecutedEvent(
    nonce: BigInt,
    vault: Address,
    user: Address,
    shares: BigInt
): DepositExecuted {
    let depositExecutedEvent = changetype<DepositExecuted>(newMockEvent())

    depositExecutedEvent.parameters = new Array()

    depositExecutedEvent.parameters.push(
        new ethereum.EventParam("nonce", ethereum.Value.fromUnsignedBigInt(nonce))
    )
    depositExecutedEvent.parameters.push(
        new ethereum.EventParam("vault", ethereum.Value.fromAddress(vault))
    )
    depositExecutedEvent.parameters.push(
        new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
    )
    depositExecutedEvent.parameters.push(
        new ethereum.EventParam("shares", ethereum.Value.fromUnsignedBigInt(shares))
    )

    return depositExecutedEvent
}
