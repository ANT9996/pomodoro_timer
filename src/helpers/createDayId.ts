const createDayId = () => {
  const now = new Date()
  const month = now.getMonth() + 1
  const day = now.getDate()
  const year = now.getFullYear()
  return `${year}-${month > 9 ? month : `0${month}`}-${day > 9 ? day : `0${day}`}`
}

export default createDayId