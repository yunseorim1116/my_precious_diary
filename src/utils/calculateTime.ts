import { NEXT,PREV } from'../common/string'

export const calculateTime = ()=>{
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const dateYearMonthStr= year+ "-" +month
    const allDateStr = year + "-" + month + "-" + day;

    const dateInfo = {
        date,
        year,
        month,
        day,
        dateYearMonthStr,
        allDateStr
    }
  return dateInfo;
}

 export const setMonth = (date:any, key:string) => {
    const currentYear = Number(date.onlyYearInfo);
    const currentMonth = Number(date.onlyMonthInfo);
    let resultMonth :any=''

    if(key===NEXT){
    const lastDayOfMonth = new Date(currentYear, currentMonth, 0);
      resultMonth =  new Date(
      lastDayOfMonth.setDate(lastDayOfMonth.getDate() + 1)
    );
    }

    if(key===PREV){
     const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1);
       resultMonth = new Date(
          firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 1)
        );
    }

    const prevMonth = resultMonth.getMonth() + 1;
    const prevMonthStr = prevMonth.toString().padStart(2, "0");
    const year = resultMonth.getFullYear().toString();
    const dateYearMonth = year + "-" + prevMonthStr;

    const dateInfo: any = {
      allDateInfo: dateYearMonth,
      onlyYearInfo: year,
      onlyMonthInfo: prevMonthStr,
    };

    return dateInfo
}

