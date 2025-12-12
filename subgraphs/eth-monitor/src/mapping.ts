import { DepositMessageSent as DepositMessageSentEvent, MessageWithdrawalExecuted as MessageWithdrawalExecutedEvent, MessageSent as MessageSentEvent } from "../generated/EthBridge/EthBridge"
import { WithdrawalStateUpdated as WithdrawalStateUpdatedEvent } from "../generated/WithdrawalStateMonitor/WithdrawalStateMonitor"
import { DepositMessageSent, MessageWithdrawalExecuted, MessageSent, WithdrawalStateUpdated } from "../generated/schema"

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
    const id = event.transaction.hash.concatI32(event.logIndex.toI32()).toHexString()

    let entity = MessageSent.load(id)
    if (entity) {
        return
    }

    entity = new MessageSent(id)
    entity.payload = event.params.payload
    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash
    entity.save()
}

export function handleWithdrawalStateUpdated(event: WithdrawalStateUpdatedEvent): void {
    const id = event.transaction.hash.concatI32(event.logIndex.toI32()).toHexString()

    let entity = WithdrawalStateUpdated.load(id)
    if (entity) {
        return
    }

    entity = new WithdrawalStateUpdated(id)
    entity.l1Batch = event.params.l1Batch
    entity.exchangeRate = event.params.exchangeRate
    entity.messageCount = event.params.messageCount
    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash
    entity.save()
}
