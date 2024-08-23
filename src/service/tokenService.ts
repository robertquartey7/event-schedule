import crypto from 'crypto'

export class TokenService {
    
    
    static async resetPasswordToken(userId: string) {
        try {
            const token = crypto.randomBytes(64).toString('hex');
            // const saveToken = await Password

         } catch (err) {
            
        }
    }
}