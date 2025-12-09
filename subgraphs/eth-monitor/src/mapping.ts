import { DepositMessageSent as DepositMessageSentEvent, MessageWithdrawalExecuted as MessageWithdrawalExecutedEvent } from "../generated/Contract/Contract"
import { DepositMessageSent, MessageWithdrawalExecuted } from "../generated/schema"

export function handleDepositMessageSent(event: DepositMessageSentEvent): void {
    const id = event.transaction.hash.concatI32(event.logIndex.toI32()).toHexString()

    let entity = DepositMessageSent.load(id)
    if (entity) {
        return
    }

    entity = new DepositMessageSent(id)
    entity.vaultNonce = event.params.vaultNonce
    entity.l1Vault = event.params.l1Vault
    entity.l2Vault = event.params.l2Vault
    entity.receiver = event.params.receiver
    entity.shares = event.params.shares
    entity.save()
}

export function handleMessageWithdrawalExecuted(event: MessageWithdrawalExecutedEvent): void {
    const id = event.transaction.hash.concatI32(event.logIndex.toI32()).toHexString()

    let entity = MessageWithdrawalExecuted.load(id)
    if (entity) {
        return
    }

    entity = new MessageWithdrawalExecuted(id)
    entity.vaultNonce = event.params.vaultNonce
    entity.l1Vault = event.params.l1Vault
    entity.receiver = event.params.receiver
    entity.shares = event.params.shares
    entity.save()
}
