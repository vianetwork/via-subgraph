import { Deposit as DepositEvent, SyncFromL1 as SyncFromL1Event } from "../generated/Contract/Contract"
import { Deposit, SyncFromL1 } from "../generated/schema"

export function handleDeposit(event: DepositEvent): void {
    let entity = new Deposit(event.transaction.hash.concatI32(event.logIndex.toI32()).toHexString())
    entity.totalTVL = event.params.totalTVL
    entity.sender = event.params.sender
    entity.assets = event.params.assets
    entity.receiver = event.params.receiver
    entity.nonce = event.params.nonce
    entity.save()
}

export function handleSyncFromL1(event: SyncFromL1Event): void {
    let entity = new SyncFromL1(event.transaction.hash.concatI32(event.logIndex.toI32()).toHexString())
    entity.totalTvl = event.params.totalTvl
    entity.save()
}
