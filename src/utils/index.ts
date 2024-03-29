import manba from 'manba'

const Utils = {
  formatDate(d: number) {
    const today = manba()
    const date = manba(d)
    if (today.distance(date, manba.DAY) === 0)
      return `今天 ${manba(d).format('HH:mm')}`
    else if (today.distance(date, manba.YEAR) === 0)
      return date.format('MM-DD HH:mm')
    else return date.format('YYYYY-MM-DD HH:mm')
  },
}
export default Utils
