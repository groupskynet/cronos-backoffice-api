import * as crypto from 'crypto'

export class EncryptAES256  {
    private static readonly algorithm: string = 'aes-256-cbc'

    static encrypt(text: string): string {
        const keyEnv = process.env.ENCRYPTION_KEY
        const ivEnv = process.env.ENCRYPTION_IV
        if (!keyEnv || !ivEnv) {
            throw new Error('Encryption key or IV not found')
        }

        const key = crypto.createHash('sha256').update(String(keyEnv)).digest('base64').substring(0, 32)
        const iv = crypto.createHash('md5').update(String(ivEnv)).digest('base64').substring(0, 16)

        const keyBuffer = Buffer.from(key, 'utf-8')
        const ivBuffer = Buffer.from(iv, 'utf-8')

        const cipher = crypto.createCipheriv(this.algorithm, keyBuffer, ivBuffer)
        let encrypted = cipher.update(text, 'utf-8', 'hex')
        encrypted += cipher.final('hex')
        return encrypted
    }

    static decrypt(encryptedText: string): string {
        const keyEnv = process.env.ENCRYPTION_KEY
        const ivEnv = process.env.ENCRYPTION_IV
        if (!keyEnv || !ivEnv) {
            throw new Error('Encryption key or IV not found')
        }

        const key = crypto.createHash('sha256').update(String(keyEnv)).digest('base64').substring(0, 32)
        const iv = crypto.createHash('md5').update(String(ivEnv)).digest('base64').substring(0, 16)

        const keyBuffer = Buffer.from(key, 'utf-8')
        const ivBuffer = Buffer.from(iv, 'utf-8')

        const decipher = crypto.createDecipheriv(this.algorithm, keyBuffer, ivBuffer)
        let decrypted = decipher.update(encryptedText, 'hex', 'utf-8')
        decrypted += decipher.final('utf-8')
        return decrypted
    }
}