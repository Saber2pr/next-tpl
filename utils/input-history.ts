export const InputHistory = {
  max: 5,
  getList(key: string): string[] {
    const list = localStorage.getItem(key)
    if (list) {
      return JSON.parse(list)
    } else {
      return []
    }
  },
  pushItem(key: string, value: any): void {
    const list = InputHistory.getList(key) || []
    list.unshift(value)
    localStorage.setItem(
      key,
      JSON.stringify([...new Set(list)].slice(0, InputHistory.max))
    )
  },
}
