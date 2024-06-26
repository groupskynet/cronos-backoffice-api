import * as crypto from 'crypto'

export class EncryptAES256  {
    private static readonly algorithm: string = 'aes-256-cbc'
    private static readonly  key = crypto.randomBytes(32)
    private static readonly  iv = crypto.randomBytes(16)

    static encrypt(text: string): string {
        const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv)
        let encrypted = cipher.update(text, 'utf-8', 'hex')
        encrypted += cipher.final('hex')
        return encrypted
    }

    static decrypt(encryptedText: string): string {
        const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv)
        let decrypted = decipher.update(encryptedText, 'hex', 'utf-8')
        decrypted += decipher.final('utf-8')
        return decrypted
    }
}