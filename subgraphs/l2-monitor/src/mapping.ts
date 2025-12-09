import { WithdrawalSent as WithdrawalSentEvent, DepositExecuted as DepositExecutedEvent } from "../generated/Contract/Contract"
import { WithdrawalSent, DepositExecuted } from "../generated/schema"

export function handleWithdrawalSent(event: WithdrawalSentEvent): void {
    const id = event.transaction.hash.concatI32(event.logIndex.toI32()).toHexString()

    let entity = WithdrawalSent.load(id)
    if (entity) {
        return
    }

    entity = new WithdrawalSent(id)
    entity.nonce = event.params.nonce
    entity.l1Vault = event.params.l1Vault
    entity.l2Vault = event.params.l2Vault
    entity.receiver = event.params.receiver
    entity.shares = event.params.shares
    entity.save()
}

export function handleDepositExecuted(event: DepositExecutedEvent): void {
    const id = event.transaction.hash.concatI32(event.logIndex.toI32()).toHexString()

    let entity = DepositExecuted.load(id)
    if (entity) {
        return
    }

    entity = new DepositExecuted(id)
    entity.nonce = event.params.nonce
    entity.vault = event.params.vault
    entity.user = event.params.user
    entity.shares = event.params.shares
    entity.save()
}
