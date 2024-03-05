
export const timeFormatter = (ms, formatter) => {
    if (!ms || new Date(ms) == 'Invalid Date') {
        return null
    }
    const pat = /{year}|{month}|{day}|{hour}|{minute}|{second}/g
    const $date = getDateObj(ms)
    let timeStr = ''
    if ($date) {
        timeStr = formatter.replace(pat, (word) => {
            const key = word.replace(/{|}/g, '')
            return $date[key]
        })
    }
    return timeStr
}
function prefixZero(num) {
    return num >= 10 ? num : `0${num}`
}
function getDateObj(ms) {
    if (!ms) {
        return null
    }
    const $date = new Date(ms)
    const year = prefixZero($date.getFullYear())
    const month = prefixZero($date.getMonth() + 1)
    const day = prefixZero($date.getDate())
    const hour = prefixZero($date.getHours())
    const minute = prefixZero($date.getMinutes())
    const second = prefixZero($date.getSeconds())
    return {
        year,
        month,
        day,
        hour,
        minute,
        second,
    }
}