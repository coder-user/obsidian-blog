export function pluralize(count, s) {
    if (count === 1) {
        return `1 ${s}`;
    }
    else {
        return `${count} ${s}s`;
    }
}
export function capitalize(s) {
    return s.substring(0, 1).toUpperCase() + s.substring(1);
}
