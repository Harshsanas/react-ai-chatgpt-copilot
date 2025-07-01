// Enhanced helper functions for better markdown processing

export function checkHeading(str) {
    return str && /^\*\*(.*)\*$/.test(str);
}

export function replaceHeadingStarts(str) {
    return str.replace(/^\*\*|\*$/g, '');
}

export function isCodeBlock(str) {
    return str && (
        str.includes('```') ||
        str.match(/`[^`]+`/g) ||
        str.includes('    ') && str.split('\n').some(line => line.startsWith('    '))
    );
}

export function isMathExpression(str) {
    return str && (
        str.includes('$') ||
        str.includes('\\(') ||
        str.includes('\\[') ||
        str.includes('\\begin{') ||
        str.match(/\$\$[\s\S]*?\$\$/) ||
        str.match(/\$[^$\n]*\$/)
    );
}

export function hasMarkdownSyntax(str) {
    if (!str) return false;

    const markdownPatterns = [
        /^#{1,6}\s/m,           // Headers
        /\*\*[^*]+\*\*/,        // Bold
        /\*[^*]+\*/,            // Italic
        /`[^`]+`/,              // Inline code
        /```[\s\S]*?```/,       // Code blocks
        /^\s*[-*+]\s/m,         // Unordered lists
        /^\s*\d+\.\s/m,         // Ordered lists
        /^\s*>\s/m,             // Blockquotes
        /\[.*?\]\(.*?\)/,       // Links
        /!\[.*?\]\(.*?\)/,      // Images
        /\|.*\|/,               // Tables
        /^---+$/m,              // Horizontal rules
    ];

    return markdownPatterns.some(pattern => pattern.test(str));
}

export function cleanMarkdownText(str) {
    if (!str) return '';

    let cleaned = str;

    // Remove trailing asterisks
    if (cleaned.endsWith('*')) {
        cleaned = cleaned.slice(0, -1);
    }

    // Fix common formatting issues
    cleaned = cleaned.replace(/\*\*\*/g, '**'); // Triple asterisks to double
    cleaned = cleaned.replace(/\n{3,}/g, '\n\n'); // Multiple newlines to double
    cleaned = cleaned.trim();

    return cleaned;
}

export function formatApiResponse(response) {
    if (!response) return '';

    // Handle array responses
    if (Array.isArray(response)) {
        return response.join('\n\n');
    }

    // Handle string responses
    if (typeof response === 'string') {
        return cleanMarkdownText(response);
    }

    // Handle object responses
    return String(response);
}

export function detectContentType(str) {
    if (!str) return 'text';

    if (isCodeBlock(str)) return 'code';
    if (isMathExpression(str)) return 'math';
    if (hasMarkdownSyntax(str)) return 'markdown';
    if (checkHeading(str)) return 'heading';

    return 'text';
}

export function preprocessContent(content) {
    if (!content) return '';

    let processed = content;

    // Handle different content types
    const contentType = detectContentType(processed);

    switch (contentType) {
        case 'code':
            // Ensure code blocks are properly formatted
            if (!processed.startsWith('```') && processed.includes('\n')) {
                processed = '```\n' + processed + '\n```';
            }
            break;

        case 'math':
            // Ensure math expressions are properly wrapped
            if (processed.includes('$') && !processed.match(/\$\$[\s\S]*?\$\$/)) {
                processed = processed.replace(/\$([^$\n]+)\$/g, '$$$1$$');
            }
            break;

        case 'heading':
            // Convert custom heading format to markdown
            processed = replaceHeadingStarts(processed);
            if (!processed.startsWith('#')) {
                processed = '# ' + processed;
            }
            break;
    }

    return cleanMarkdownText(processed);
}