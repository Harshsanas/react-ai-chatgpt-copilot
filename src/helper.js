export function checkHeading(str) {
    return str && /^\*\*(.*)\*$/.test(str);
}

// Removes ** from start and * from end
export function replaceHeadingStarts(str) {
    return str.replace(/^\*\*|\*$/g, '');
}