// 快排
function quick_sort (arr) {
  if (arr.length < 2) return arr
  const pior = arr[Math.floor(arr.length/2)]
  let left = []
  let right = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pior) left.push(arr[i])
    if (arr[i] > pior) right.push(arr[i])
  }
  return [].concat(quick_sort(left), pior, quick_sort(right))
}

// 冒泡
function bubble_sort (arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] > arr[j+1]) {
        arr[j+1] = arr[j+1] ^ arr[j]
        arr[j] = arr[j+1] ^ arr[j]
        arr[j+1] = arr[j+1] ^ arr[j]
      }
    }
  }
  return arr
}

// 选择
function select_sort (arr) {
  for (let i = 0; i < arr.length; i ++) {
    for (let j = i; j < arr.length; j ++) {
      let min = i
      if (arr [j] < arr[min]) {
        arr[j] = arr[j] ^ arr[min]
        arr[min] = arr[j] ^ arr[min]
        arr[j] = arr[j] ^ arr[min]
      }
    }
  }
  return arr
}