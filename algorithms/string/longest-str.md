### 无重复字符中的最长子串

#### 题目描述

  给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

  示例 1:

  输入: "abcabcbb"
  输出: 3 
  解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
  示例 2:

  输入: "bbbbb"
  输出: 1
  解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
  示例 3:

  输入: "pwwkew"
  输出: 3
  解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
      请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

#### 解答思路
解答这道题时，我的想法是将字符串中的每个字符都与下一个字符暴力取一遍，然后把这一次暴力取得过程中的最长字符串给保存下来，每次对比取最长的字符长度。
如 pwwkew 第一次最长是pw 然后删除p 第二次最长是w

but，这样做的时间复杂度为 O(n^2)，十分的高，苦于没有系统的解答过这类问题，于是本着先做出来的原则，开始答题

```javascript
  function longestStr (str) {
    let longest = ''
    str = str.split('')
    let l = str.length
    let p = 0

    console.log(str)
    let f = function () {
      let temp = '';

      let flag = str.some(s => {
        if (~temp.indexOf(s)) {
          if (temp.length > longest.length) {
            longest = temp
          }
          p++
          str.shift()
          return true
        }
        temp += s
      })

      if (flag && (l !== p) ) return f()

      if (temp.length > longest.length) {
        longest = temp
      }
    }
    f()
    return longest.length
  }
```
上面代码为移动窗口的方式，比如字符串 'abscsvf'

1. 为了方便使用some方法，将字符串转为了数组
2. 在遍历abscsvf时， 我们在第五个字符s遇到了第一个重复的字符s，此时我们已经保存了absc
3. 重复第二个步骤，将abscsvf出列第一个元素后，bscsvf继续遍历，遍历到第四个字符发现s重复，此时保存最长为bsc 与上一次最长的absc比较，保留absc
4. 用这样类似窗口的方式一步步右遍历，最终我们获得了最长字符串
5. 总结： 从不重复区间[i, j)一步步变为[i+1, j+1)不断比较各区间最长

升级版解答思路
优化的移动窗口法 如 
1. 在上一步我们遍历到第五个字符s时，其实我们无须再回到第二个字符b去开始bscsvf的遍历，因为在abscsvf这个区间中我们已知最长的为absc，找出第五个字符s在absc中的位置为3，然后从3开始遍历即可，即遍历csvf
2. 所以，优化的移动窗口是你从[i,j)的区间获取到最长长度时，然后找出重复的位置j‘ 你可以直接从j’ 开始遍历，这样获得到最长的字符和上个区间的比较
3. 最终我们的复杂度为O(n)，只需一次遍历

实现:
```javascript
function longestStr (str) {
  let longest = ''
  let p = 0
  let temp = ''
  for (let i = 0; i < str.length; i++) {
    let index = temp.indexOf(str[i]) // 找出j'
    if (~index) {
      temp = temp.substring(index+1, i)
    }
    temp += str[i]
    if (temp.length > longest.length) {
      longest = temp
    }
  }
  console.log('longest:', longest)
  return longest.length
}


```

经过测试 第一种方法耗时800ms 第二种仅耗时100ms

```javascript
var longestStr = function(s) {
  let substr = '', maxLength = 0;
  // find the next substring that longeer than previous to replace previous substring
  for (var i = 0; i < s.length; i++) {
      let findIndex = substr.indexOf(s[i]);
      if (~findIndex) {
          substr = substr.substring(findIndex + 1);
      }
      substr += s[i];
      if (substr.length > maxLength) {
          maxLength = substr.length;
      }
  }
  return maxLength;
};
```