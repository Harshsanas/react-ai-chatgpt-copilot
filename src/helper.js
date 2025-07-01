export function checkHeading(str) {
    return str && /^\*\*(.*)\*$/.test(str);
}

export function replaceHeadingStarts(str) {
    return str.replace(/^\*\*|\*$/g, '');
}