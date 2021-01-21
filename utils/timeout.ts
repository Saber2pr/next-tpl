export const timeout = (delay = 1000) =>
  new Promise(resolve => setTimeout(resolve, delay))
