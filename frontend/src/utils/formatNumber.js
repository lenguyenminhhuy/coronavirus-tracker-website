function formatNumber(number) {
    let result = '';
    // let leftOver = number % 1000;
    // let newNum = number / 1000;
    // while (leftOver > 1) {
    //     console.log(leftOver);
    //     newNum = newNum / 1000;
    //     rs+= "," + leftOver;
    //     leftOver = newNum % 1000;
    // }
    let strNumber = String(number);
    if (strNumber > 3) {
        let count = 1;
        for (let i = strNumber.length - 1; i > 0; i--) {
            if (count  % 3 === 0) {
                result = ',' + strNumber[i] + result;
            } else {
                result = strNumber[i] + result;
            }
            count += 1;
        }
        result = strNumber[0] + result;
        return result;
    } else {
        return strNumber;
    }

    return result;

}

export default formatNumber;