export default function (num) {
    const n = Number(num);
    return `$ ${n.toFixed(0).replace(/./g, (c, i, a) => {
        // 看是要幾個位數一個 ,  這裡是 3 個
        const currency = (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c);
        return currency;
    })}`;
}