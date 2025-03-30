export type TruewalletGiftErrorCode =
    "MISSING_RECEIVER_PHONE_NUMBER" |
    "MISSING_GIFT_CODE_OR_URL" |
    "INVALID_RECEIVER_PHONE_NUMBER_FORMAT" |
    "INVALID_GIFT_CODE_OR_URL_FORMAT" |
    "VOUCHER_NOT_FOUND" |
    "VOUCHER_OUT_OF_STOCK" |
    "VOUCHER_EXPIRED" |
    "UNEXPECTED_ERROR"

export type RedeemedGiftResult = {
    voucher: {
        voucher_id: string,
        amount_baht: string,
        redeemed_amount_baht: string,
        member: number,
        status: string,
        link: string,
        detail: string,
        expire_date: number,
        type: string,
        redeemed: number,
        available: number,
    },
    owner_profile: {
        full_name: string,
    },
    redeemer_profile: {
        mobile_number: string,
    },
}