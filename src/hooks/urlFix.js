export const urlFix = (string) => {
    const string1 = string.replace(/\s+/g, '')
    const string2 = string1.replace(/,+/g, "-")

    return string2.toLowerCase()
}

