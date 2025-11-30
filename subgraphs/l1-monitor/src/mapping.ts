import { DepositMessageSent as DepositMessageSentEvent, MessageWithdrawalExecuted as MessageWithdrawalExecutedEvent } from "../generated/Contract/Contract"
import { DepositMessageSent, MessageWithdrawalExecuted } from "../generated/schema"

export function handleDepositMessageSent(event: DepositMessageSentEvent): void {
    let entity = new DepositMessageSent(event.transaction.hash.concatI32(event.logIndex.toI32()).toHexString())
    entity.nonce = event.params.nonce
    entity.l1Vault = event.params.l1Vault
    entity.receiver = event.params.receiver
    entity.shares = event.params.shares
    entity.save()
}

export function handleMessageWithdrawalExecuted(event: MessageWithdrawalExecutedEvent): void {
    let entity = new MessageWithdrawalExecuted(event.transaction.hash.concatI32(event.logIndex.toI32()).toHexString())
    entity.nonce = event.params.nonce
    entity.l1Vault = event.params.l1Vault
    entity.receiver = event.params.receiver
    entity.shares = event.params.shares
    entity.save()
}
