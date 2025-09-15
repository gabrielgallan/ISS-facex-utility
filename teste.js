function NowDateISO() {
    const _time = new Date().toISOString().slice(0, -1)

    const [date, time] = _time.split('T')
    const [h, m, s] = time.split(':')
    const correctHour = String(Number(h) - 3)

    return `${date}T${[correctHour, m, s].join(':')}`
}

const day = new Date()

console.log(day)