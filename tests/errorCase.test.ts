import { describe, expect, test } from "vitest"
import truewalletGift, { TruewalletGiftError } from "../src/index"

describe("Just a simple Unit Test LOL", () => {
    test("MISSING_RECEIVER_PHONE_NUMBER", async () => {
        try {
            await truewalletGift.redeem("", "skibidi")
        } catch (error) {
            expect(error).toBeInstanceOf(TruewalletGiftError)
            expect(error.code).toBe("MISSING_RECEIVER_PHONE_NUMBER")
        }
    })

    test("MISSING_GIFT_CODE_OR_URL", async () => {
        try {
            await truewalletGift.redeem("brabra", "")
        } catch (error) {
            expect(error).toBeInstanceOf(TruewalletGiftError)
            expect(error.code).toBe("MISSING_GIFT_CODE_OR_URL")
        }
    })

    test("INVALID_RECEIVER_PHONE_NUMBER_FORMAT", async () => {
        try {
            await truewalletGift.redeem("1234", "brabra")
        } catch (error) {
            expect(error).toBeInstanceOf(TruewalletGiftError)
            expect(error.code).toBe("INVALID_RECEIVER_PHONE_NUMBER_FORMAT")
        }
    })

    test("INVALID_GIFT_URL_FORMAT", async () => {
        try {
            await truewalletGift.redeem("0812345678", "https://abc.com")
        } catch (error) {
            expect(error).toBeInstanceOf(TruewalletGiftError)
            expect(error.code).toBe("INVALID_GIFT_CODE_OR_URL_FORMAT")
        }
    })

    test("INVALID_GIFT_CODE_FORMAT", async () => {
        try {
            await truewalletGift.redeem("0812345678", "abcdef_skibidi")
        } catch (error) {
            expect(error).toBeInstanceOf(TruewalletGiftError)
            expect(error.code).toBe("INVALID_GIFT_CODE_OR_URL_FORMAT")
        }
    })

    test("VOUCHER_NOT_FOUND", async () => {
        try {
            await truewalletGift.redeem("0812345678", "https://gift.truemoney.com/campaign/?v=9994e0d2380a7ccaaae008d974544aaaaaa")
        } catch (error) {
            expect(error).toBeInstanceOf(TruewalletGiftError)
            expect(error.code).toBe("VOUCHER_NOT_FOUND")
        }
    })

    test("VOUCHER_EXPIRED", async () => {
        try {
            await truewalletGift.redeem("0812345678", "https://gift.truemoney.com/campaign/?v=0194e0d2380a7cc0ade008d97454430649q")
        } catch (error) {
            expect(error).toBeInstanceOf(TruewalletGiftError)
            expect(error.code).toBe("VOUCHER_EXPIRED")
        }
    })

    test("VOUCHER_OUT_OF_STOCK", async () => {
        try {
            await truewalletGift.redeem("0812345678", "https://gift.truemoney.com/campaign/?v=0195e80f48747183b59a80971caed7f5325")
        } catch (error) {
            expect(error).toBeInstanceOf(TruewalletGiftError)
            expect(error.code).toBe("VOUCHER_OUT_OF_STOCK")
        }
    })
})