export function slowSync(timeInMs = 100) {
    const start = performance.now()
    while (performance.now() - start < timeInMs) {
        // keep it busy
    }
}