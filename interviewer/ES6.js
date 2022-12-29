console.log([1, 2, 3, 4, 5, 6].copyWithin(0, 3))

console.log(
  [2, 3, 4].flatMap(x => [x, x * 2])
) // [[2, 4], [3, 6], [4, 8]].flat()

const arr = [
  'peach',
  'straw',
  'apple',
  'spork'
]
const stableSorting = (s1, s2) => {
  if (s1[0] < s2[0]) return -1
  return 1
}
arr.sort(stableSorting)

function* interEntries(obj) {
  let keys = Object.keys(obj)
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i]
    yield [key, obj[key]]
  }
}
const myObj = { foo: 2, bar: 3 }
for (let [key, value] of interEntries(myObj)) {
  console.log(key, value)
}

