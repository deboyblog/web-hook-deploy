/**
 * Created by hy on 2017/2/12.
 */
const fs = require('fs')
const path = require('path')

const projectName = 'shop-mobile'

let filePath = path.resolve('./configs/', projectName + '.json')
console.log(filePath)

fs.writeFile(filePath, JSON.stringify([1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), (err) => {
  console.log(err)
})