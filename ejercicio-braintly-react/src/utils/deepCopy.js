export function deepCopy(val) {
    return JSON.parse(JSON.stringify(val));
}

export default deepCopy; 