export const isValidEmail = (email: string): boolean => {
    return RegexPatterns.Email.test(email);
}

export function extractNumberFromText(text: string) {
    const matches = text.match(RegexPatterns.NumberMatching)
    return matches ? parseInt(matches[0], 10) : null
}

export const RegexPatterns = {
    Email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    Password: /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/,
    ChannelName: /^[a-zA-Z0-9. _]+$/,
    UserName: /^[a-zA-Z0-9. _\u4e00-\u9fa5]+$/,
    Rounding: /^[0-4]$/,
    OddSettingLimit: /^[0-9]+$/,
    NumberMatching: /\d+/g,
    PhoneNumber: /^\d{0,15}$/,
    RoundingIncrement: /^(?!0(?:\.0+)?$)(?:\d+|\d*\.\d+)$/
}