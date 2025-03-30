import { RedeemedGiftResult, TruewalletGiftErrorCode } from "./types"

export class TruewalletGiftError extends Error {
    code: TruewalletGiftErrorCode

    constructor(message: string, code: TruewalletGiftErrorCode) {
        super(message)
        this.name = this.constructor.name
        this.code = code
    }
}

const truewalletGift = {
    async redeem(receiverPhone: string, giftCodeOrURL: string) {
        if (!receiverPhone) throw new TruewalletGiftError("กรุณากรอกเบอร์โทรศัพท์ที่จะรับตัง", "MISSING_RECEIVER_PHONE_NUMBER")
        if (!giftCodeOrURL) throw new TruewalletGiftError("กรุณากรอกลิงก์หรือโค้ดซองอังเปา", "MISSING_GIFT_CODE_OR_URL")

        const thaiPhoneFormat = /^(0)([2-9]\d{7}|[89]\d{8})$/
        if (!thaiPhoneFormat.test(receiverPhone)) throw new TruewalletGiftError("รูปแบบเบอร์โทรศัพท์ที่จะรับตังไม่ถูกต้อง", "INVALID_RECEIVER_PHONE_NUMBER_FORMAT")

        let voucherHash: string = ""
        if (giftCodeOrURL.startsWith("https://")) {
            const giftURLFormat = /^https:\/\/gift\.truemoney\.com\/campaign\/\?v=[a-zA-Z0-9]+$/
            if (!giftURLFormat.test(giftCodeOrURL)) throw new TruewalletGiftError("รูปแบบลิงก์ซองอังเปาไม่ถูกต้อง", "INVALID_GIFT_CODE_OR_URL_FORMAT")
            const code = new URL(giftCodeOrURL).searchParams.get("v")
            if (!code) throw new TruewalletGiftError("รูปแบบลิงก์ซองอังเปาไม่ถูกต้อง", "INVALID_GIFT_CODE_OR_URL_FORMAT")
            voucherHash = code
        } else {
            if (giftCodeOrURL.length !== 35) throw new TruewalletGiftError("รูปแบบโค้ดซองอังเปาไม่ถูกต้อง", "INVALID_GIFT_CODE_OR_URL_FORMAT")
            voucherHash = giftCodeOrURL
        }

        const redeemVoucherResponse = await fetch(
            `https://gift.truemoney.com/campaign/vouchers/${voucherHash}/redeem`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    mobile: receiverPhone,
                    voucher_hash: voucherHash
                })
            }
        )
        const redeemVoucherJSON = await redeemVoucherResponse.json()
        if (!redeemVoucherResponse.ok) {
            if (redeemVoucherJSON.status.code === "VOUCHER_NOT_FOUND") throw new TruewalletGiftError("ซองอังเปาไม่ถูกค้อง", "VOUCHER_NOT_FOUND")
            if (redeemVoucherJSON.status.code === "VOUCHER_EXPIRED") throw new TruewalletGiftError("ซองอังเปาหมดอายุแล้ว", "VOUCHER_EXPIRED")
            if (redeemVoucherJSON.status.code === "VOUCHER_OUT_OF_STOCK") throw new TruewalletGiftError("ซองอังเปาถูกใช้จนหมดแล้ว", "VOUCHER_OUT_OF_STOCK")
            throw new TruewalletGiftError("เกิดข้อผิดพลาดในการรับซองอังเปา", "UNEXPECTED_ERROR")
        }

        return redeemVoucherJSON.data as RedeemedGiftResult
    }
}
export default truewalletGift