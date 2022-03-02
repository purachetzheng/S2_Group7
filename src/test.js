// const mySet1 = new Set()
// mySet1.add([1,2])
// console.log(mySet1)

// const myArr = []
// // myArr.push(new Set([1]))
// myArr[0] = new Set([1])
// myArr[0].add(2)
// console.log(myArr)
// console.log('---'+ myArr[0].has(1))
// console.log('--'+ myArr[0][1])
// myArr[0].delete(1)
// myArr[0].delete(2)
// console.log(myArr)

// console.log("----")
// console.log(myArr[0])
// console.log(myArr[1])
// console.log(!myArr[0])
// console.log(!myArr[1])

const date1 = new Date()
const date2 = new Date().toLocaleDateString('th-TH')
const date3 = new Date().toLocaleString('th-TH')

console.log(date1.toLocaleString('th-TH'))
console.log(date2)
console.log(date3.match(/\d{2}:\d{2}:\d{2}/i))
console.log(date1.toLocaleTimeString('th-TH'))