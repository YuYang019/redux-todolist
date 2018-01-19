export const addTodoApi = (text) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const temp = Math.random()
      if (temp < 0.7) {
        resolve(true)
      } else {
        reject(new Error('error'))
      }
    }, 2000)
  })
}