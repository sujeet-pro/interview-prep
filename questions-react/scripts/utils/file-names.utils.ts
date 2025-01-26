export function isKebabCase(appName: string): boolean {
  const snakeCasePattern = /^[a-z-]+$/
  return snakeCasePattern.test(appName)
}

export function ensureValidAppName(appName: string): void {
  if (!appName) {
    console.error('App name cannot be empty.')
    process.exit(1)
  }
  if (!isKebabCase(appName)) {
    console.error(
      'App name must be in Kebab case and contain only lowercase alphabets and hyphens.',
    )
    process.exit(1)
  }
}

export function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(/[_-\s]/) // Split by underscores, dash or spaces
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
