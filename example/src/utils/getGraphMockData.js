// Data generation
const getRandomArray = numItems => {
  // Create random array of objects
  let names = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let data = []
  for (var i = 0; i < numItems; i++) {
    data.push({
      label: names[i],
      value: Math.round(20 + 80 * Math.random())
    })
  }
  return data
}

const getRandomDateArray = numItems => {
  // Create random array of objects (with date)
  let data = []
  let baseTime = new Date('2018-05-01T00:00:00').getTime()
  let dayMs = 24 * 60 * 60 * 1000
  for (var i = 0; i < numItems; i++) {
    data.push({
      time: new Date(baseTime + i * dayMs),
      value: Math.round(20 + 80 * Math.random())
    })
  }
  return data
}

export default () => {
  let data = []

  data.push({
    title: 'Visits',
    data: getRandomDateArray(150)
  })

  data.push({
    title: 'Categories',
    data: getRandomArray(20)
  })

  data.push({
    title: 'Categories',
    data: getRandomArray(10)
  })

  data.push({
    title: 'Data 4',
    data: getRandomArray(6)
  })

  return data
}