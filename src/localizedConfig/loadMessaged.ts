type TranslationMessages = Record<string, any>

function flattenMessages(nestedMessages: TranslationMessages, prefix = ''): TranslationMessages {
    let flattenedMessages: TranslationMessages = {}

    Object.keys(nestedMessages).forEach((key) => {
        const value = nestedMessages[key]
        const prefixedKey = prefix ? `${prefix}.${key}` : key

        if (typeof value === 'string') {
            flattenedMessages[prefixedKey] = value
        } else {
            Object.assign(flattenedMessages, flattenMessages(value, prefixedKey));
        }
    })

    return flattenedMessages
}

export default async function loadMessages(locale: string): Promise<TranslationMessages> {
    let messages: TranslationMessages = {}

    try {
        const importedModule = await import(`../locales/${locale}.json`)
        const nestedMessages = importedModule.default || {}
        messages = flattenMessages(nestedMessages)
    } catch (error) {
        console.error(`Error loading messages for locale ${locale}:`, error)
        throw error
    }

    return messages;
}
