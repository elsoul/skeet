import pako from 'pako'
import CryptoJS from 'crypto-js'
export function compressAndEncrypt(
  data: object,
  secretKey: string,
): string | null {
  try {
    // JSONを文字列に変換して圧縮
    const compressedData = pako.gzip(JSON.stringify(data))

    // Uint8ArrayをBase64に変換
    const base64Data = Buffer.from(compressedData).toString('base64')

    // 圧縮データを暗号化
    const encryptedData = CryptoJS.AES.encrypt(base64Data, secretKey).toString()

    return encryptedData
  } catch (error) {
    console.error('Failed to compress and encrypt:', error)
    return null
  }
}

export function decryptAndDecompress(
  data: string,
  secretKey: string,
): object | null {
  try {
    // データの復号化
    const decryptedBase64 = CryptoJS.AES.decrypt(data, secretKey).toString(
      CryptoJS.enc.Utf8,
    )

    // Base64をUint8Arrayに変換
    const decryptedData = Buffer.from(decryptedBase64, 'base64')

    // データの解凍
    const decompressedData = pako.ungzip(decryptedData, { to: 'string' })

    return JSON.parse(decompressedData)
  } catch (error) {
    console.error('Failed to decrypt and decompress:', error)
    return null
  }
}
