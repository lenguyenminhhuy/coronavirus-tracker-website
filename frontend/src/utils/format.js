import moment from "moment";

function formatXAxis(tickItem) {
    return moment(tickItem).format('DD/MM/YYYY')
}

const format = {
    formatXAxis: formatXAxis,
}
export default format;