export function slowSync(timeInMs = 1000) {
    const start = performance.now()
    while (performance.now() - start < timeInMs) {
        // keep it busy
    }
}