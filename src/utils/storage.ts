export const getStorage = (key: string) => {
  if (!key) return
  return window.localStorage.getItem(key)
}

export const setStorage = (key: string, value: any) => {
  if (!value) return
  if (typeof value !== 'string') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

export const removeStorage = (key: string) => {
  if (!key) return
  window.localStorage.removeItem(key)
}

