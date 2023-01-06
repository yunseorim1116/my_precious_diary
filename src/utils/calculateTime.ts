export const calculateTime = ()=>{
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const dateYearMonthStr = year+"-"+month
    const allDateStr = year + "-" + month + "-" + day;

    const dateInfo = {
        date,
        year,
        month,
        day,
        dateYearMonthStr,
        allDateStr
    }

    return dateInfo
}