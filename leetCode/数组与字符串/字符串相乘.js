//给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式。
//
//示例 1:
//
//输入: num1 = "2", num2 = "3"
//输出: "6"
//示例 2:
//
//输入: num1 = "123", num2 = "456"
//输出: "56088"
//
//注意
//因为js纯数字是有上限的，字符串要考虑数字上限情况

function multiply(sum1, sum2){
   /**将两个字符串拆为数组并反转，生成结果数组并初始化为0**/
    let s1 = sum1.split('').reverse()
    let s2 = sum2.split('').reverse()
    let r = new Array(s1.length + s2.length).fill(0)

    /**相乘**/
    s1.forEach((m, i) => {
        s2.forEach((n, j) => {
            let k = i + j
            let t = r[k] + m * n
            r[k] = t % 10
            r[k + 1] += Math.floor(t / 10)
        })
    })

    /**去掉结果数组最开始的0**/
    r = r.reverse()
    let k = 0
    while (r[k] === 0 && k <= r.length - 2) {
        k++
    }
    return r.join('').slice(k)
}
