const BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

export function toBase58(buffer: Uint8Array): string {
    if (buffer.length == 0) return "";

    let digits = new Array<i32>(1);
    digits[0] = 0;

    for (let i = 0; i < buffer.length; ++i) {
        let carry: i32 = buffer[i];

        for (let j = 0; j < digits.length; ++j) {
            let x: i32 = digits[j] * 256 + carry;
            digits[j] = x % 58;
            carry = x / 58; // stays i32
        }

        while (carry > 0) {
            digits.push(carry % 58);
            carry = carry / 58;
        }
    }

    // Deal with leading zeros
    let result = "";
    for (let i = 0; i < buffer.length && buffer[i] == 0; ++i) {
        result += "1";
    }

    for (let i = digits.length - 1; i >= 0; --i) {
        result += BASE58_ALPHABET.charAt(digits[i] as i32);
    }

    return result;
}
