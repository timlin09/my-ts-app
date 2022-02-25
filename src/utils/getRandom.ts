/**
 * 獲得 1 ~  x 的隨機數
 *
 * @param x {int} 隨機數的最大值
 * @return {int}
 */
const getRandomInt = (x:number = 100) => Math.floor(Math.random() * Math.max(x, 10)) + 1;

export default getRandomInt;
