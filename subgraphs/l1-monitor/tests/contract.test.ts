import {
    assert,
    describe,
    test,
    clearStore,
    beforeAll,
    afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { DepositMessageSent as DepositMessageSentEvent } from "../generated/Contract/Contract"
import { handleDepositMessageSent, handleMessageWithdrawalExecuted } from "../src/mapping"
import { createDepositMessageSentEvent, createMessageWithdrawalExecutedEvent } from "./contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
    beforeAll(() => {
        let nonce = BigInt.fromI32(1)
        let l1Vault = Address.fromString("0x0000000000000000000000000000000000000001")
        let receiver = Address.fromString("0x0000000000000000000000000000000000000002")
        let shares = BigInt.fromI32(100)
        let newDepositMessageSentEvent = createDepositMessageSentEvent(
            nonce,
            l1Vault,
            receiver,
            shares
        )
        handleDepositMessageSent(newDepositMessageSentEvent)
    })

    afterAll(() => {
        clearStore()
    })

    test("DepositMessageSent created and stored", () => {
        assert.entityCount("DepositMessageSent", 1)

        // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
        let defaultHash = Bytes.fromHexString("0xa16081f360e3847006db660bae1c6d1b2e17ec2a")
        let logIndex = 1
        let id = defaultHash.concatI32(logIndex).toHexString()

        assert.fieldEquals(
            "DepositMessageSent",
            id,
            "nonce",
            "1"
        )
        assert.fieldEquals(
            "DepositMessageSent",
            id,
            "l1Vault",
            "0x0000000000000000000000000000000000000001"
        )
        assert.fieldEquals(
            "DepositMessageSent",
            id,
            "receiver",
            "0x0000000000000000000000000000000000000002"
        )
        assert.fieldEquals(
            "DepositMessageSent",
            id,
            "shares",
            "100"
        )
    })
})
