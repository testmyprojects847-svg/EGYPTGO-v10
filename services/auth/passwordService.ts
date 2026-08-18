import { isEmail, isStrongPassword } from '@/lib/validation'
import type { Locale } from '@/types'

export const passwordService = {
  requestReset(email: string, locale: Locale = 'en'): { success: boolean; message: string } {
    if (!isEmail(email))
      return { success: false, message: locale === 'ar' ? 'أدخل بريداً إلكترونياً صحيحاً.' : 'Enter a valid email address.' }
    return {
      success: true,
      message: locale === 'ar' ? 'تم إرسال رابط التجربة.' : 'A simulated reset link has been sent.',
    }
  },
  resetPassword(password: string, locale: Locale = 'en'): { success: boolean; message: string } {
    if (!isStrongPassword(password))
      return { success: false, message: locale === 'ar' ? 'كلمة المرور قصيرة جداً.' : 'Password must be at least 8 characters.' }
    return { success: true, message: locale === 'ar' ? 'تم تحديث كلمة المرور.' : 'Password updated successfully.' }
  },
}
