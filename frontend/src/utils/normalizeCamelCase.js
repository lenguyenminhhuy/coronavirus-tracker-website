function normalizeCamelCase(text) {
    let rs = text[0].toUpperCase();
    for (let i = 1; i < text.length; i++) {
        if (text.charAt(i) == text.charAt(i).toUpperCase()) {
            rs += ' ' + text.charAt(i);
        }
        else {
            rs += text.charAt(i);
        }
    }
    return rs;
}

export default normalizeCamelCase;