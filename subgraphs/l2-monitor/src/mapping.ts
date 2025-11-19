import { Withdraw as WithdrawEvent } from "../generated/Contract/Contract"
import { Withdraw } from "../generated/schema"

export function handleWithdraw(event: WithdrawEvent): void {
    let entity = new Withdraw(event.transaction.hash.concatI32(event.logIndex.toI32()).toHexString())
    entity.shares = event.params.shares
    entity.exchangeRate = event.params.exchangeRate
    entity.receiver = event.params.receiver
    entity.nonce = event.params.nonce
    entity.save()
}
