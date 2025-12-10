import { DepositMessageSent as DepositMessageSentEvent, MessageWithdrawalExecuted as MessageWithdrawalExecutedEvent, MessageSent as MessageSentEvent } from "../generated/EthBridge/EthBridge"
import { DepositMessageSent, MessageWithdrawalExecuted, MessageSent } from "../generated/schema"

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
    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash
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
    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash
    entity.save()
}

export function handleMessageSent(event: MessageSentEvent): void {
    let entity = new MessageSent(
        event.transaction.hash.concatI32(event.logIndex.toI32()).toHexString()
    )
    entity.payload = event.params.payload
    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash
    entity.save()
}
