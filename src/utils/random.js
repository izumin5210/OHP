// @flow

function hexChar (): string {
  return Math.floor(Math.random() * 16).toString(16)
}

export function hex (n: number): string {
  const buffer = []
  for (let i = 0; i < n; i++) {
    buffer[i] = hexChar()
  }
  return buffer.join('')
}
