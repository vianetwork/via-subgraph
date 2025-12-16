import {
    assert,
    describe,
    test,
    clearStore,
    beforeAll,
    afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { Mint as MintEvent } from "../generated/L2BaseToken/L2BaseToken"
import { handleMint } from "../src/l2BaseToken"
import { createMintEvent } from "./l2-base-token-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("L2BaseToken entity assertions", () => {
    beforeAll(() => {
        let account = Address.fromString(
            "0x0000000000000000000000000000000000000001"
        )
        let amount = BigInt.fromI32(234)
        let newMintEvent = createMintEvent(account, amount)
        handleMint(newMintEvent)
    })

    afterAll(() => {
        clearStore()
    })

    // For more test scenarios, see:
    // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

    test("Mint created and stored", () => {
        assert.entityCount("Mint", 1)

        // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
        let defaultHash = Bytes.fromHexString("0xa16081f360e3847006db660bae1c6d1b2e17ec2a")
        let logIndex = 1
        let id = defaultHash.concatI32(logIndex).toHexString()

        assert.fieldEquals(
            "Mint",
            id,
            "receiver",
            "0x0000000000000000000000000000000000000001"
        )
        assert.fieldEquals(
            "Mint",
            id,
            "amount",
            "234"
        )

        // More assert options:
        // https://thegraph.com/docs/en/developer/matchstick/#asserts
    })
})
