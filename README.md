```
npm i twgift
```

## Typescript
```typescript
import truewalletGift, { TruewalletGiftError } from "twgift"
void (async () => {
    try {
        const result = await truewalletGift.redeem("0812345678", "https://gift.truemoney.com/campaign/?v=xxxxxx")
        console.log(`รับเงินจาก ${result.owner_profile.full_name} จำนวน ${result.voucher.redeemed_amount_baht} บาท`)
    } catch (error) {
        if (error instanceof TruewalletGiftError) console.log(error.code, error.message)
    }
})()
```

## Javascript
```javascript
const { default: truewalletGift, TruewalletGiftError } = require("twgift")
void (async () => {
    try {
        const result = await truewalletGift.redeem("0812345678", "https://gift.truemoney.com/campaign/?v=xxxxxx")
        console.log(`รับเงินจาก ${result.owner_profile.full_name} จำนวน ${result.voucher.redeemed_amount_baht} บาท`)
    } catch (error) {
        if (error instanceof TruewalletGiftError) console.log(error.code, error.message)
    }
})()
```

### Response Data
Data (จริงๆมีมากกว่านี้ลองไปเล่นดูได้จ้า) : 
```typescript
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
```

### Error Handling
Error Code & Message :

`MISSING_RECEIVER_PHONE_NUMBER` - `กรุณากรอกเบอร์โทรศัพท์ที่จะรับตัง`

`MISSING_GIFT_CODE_OR_URL` - `กรุณากรอกลิงก์หรือโค้ดซองอังเปา`

`INVALID_RECEIVER_PHONE_NUMBER_FORMAT` - `รูปแบบเบอร์โทรศัพท์ที่จะรับตังไม่ถูกต้อง` 

`INVALID_GIFT_CODE_OR_URL_FORMAT` - `รูปแบบลิงก์ซองอังเปาไม่ถูกต้อง` 

`VOUCHER_NOT_FOUND` - `ซองอังเปาไม่ถูกค้อง` 

`VOUCHER_OUT_OF_STOCK` - `ซองอังเปาถูกใช้จนหมดแล้ว` 

`VOUCHER_EXPIRED` - `ซองอังเปาหมดอายุแล้ว` 

`UNEXPECTED_ERROR` - `เกิดข้อผิดพลาดในการรับซองอังเปา`

Custom Error Message (เผื่อ default error message ดูงั่งไป) :
```typescript
void (async () => {
    try {
        const result = await truewalletGift.redeem("0812345678", "https://gift.truemoney.com/campaign/?v=0195e80f48747183b59a80971caed7f5325")
        console.log(`รับเงินจาก ${result.owner_profile.full_name} จำนวน ${result.voucher.redeemed_amount_baht} บาท`)
    } catch (error) {
        if (error instanceof TruewalletGiftError) {
            if (error.code === "VOUCHER_NOT_FOUND") console.log("ซองอังเปาไม่ถูกต้องค้าบบบบ ❌")
        }
    }
})()
```


### Inspiration
Library นี้ได้รับแรงบันดาลใจมาจาก tw-voucher (https://github.com/Fortune-Inc/tw-voucher) ✨
