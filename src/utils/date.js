export function extractTimeFromISO(isoString) {
    if (!isoString || typeof isoString !== 'string') return '00:00';
    return isoString.substring(11, 16);
}
