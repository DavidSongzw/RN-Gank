/**
* 日期处理工具类
*/

    /**
     * 判断闰年
     * @param date Date日期对象
     * @return boolean true 或false
     */
   function isLeapYear (date) {
     return (date.getYear() % 4 === 0 && ((date.getYear() % 100 !== 0) || (date.getYear() % 400 === 0)))
   }

    /**
     * 日期对象转换为指定格式的字符串
     * @param f 日期格式,格式定义如下 yyyy-MM-dd HH:mm:ss
     * @param date Date日期对象, 如果缺省，则为当前时间
     *
     * YYYY/yyyy/YY/yy 表示年份
     * MM/M 月份
     * W/w 星期
     * dd/DD/d/D 日期
     * hh/HH/h/H 时间
     * mm/m 分钟
     * ss/SS/s/S 秒
     * @return string 指定格式的时间字符串
     */
   function dateToStr (formatStr, date) {
     formatStr = formatStr || 'yyyy-MM-dd HH:mm:ss'
     date = date || new Date()
     let str = formatStr
     let Week = ['日', '一', '二', '三', '四', '五', '六']
     str = str.replace(/yyyy|YYYY/, date.getFullYear())
     str = str.replace(/yy|YY/, (date.getYear() % 100) > 9 ? (date.getYear() % 100).toString() : '0' + (date.getYear() % 100))
     str = str.replace(/MM/, date.getMonth() > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1))
     str = str.replace(/M/g, date.getMonth())
     str = str.replace(/w|W/g, Week[date.getDay()])

     str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate())
     str = str.replace(/d|D/g, date.getDate())

     str = str.replace(/hh|HH/, date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours())
     str = str.replace(/h|H/g, date.getHours())
     str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes())
     str = str.replace(/m/g, date.getMinutes())

     str = str.replace(/ss|SS/, date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds())
     str = str.replace(/s|S/g, date.getSeconds())

     return str
   }

    /**
    * 日期计算
    * @param strInterval string  可选值 y 年 m月 d日 w星期 ww周 h时 n分 s秒
    * @param num int
    * @param date Date 日期对象
    * @return Date 返回日期对象
    */
   function dateAdd (strInterval, num, date) {
     date = date || new Date()
     switch (strInterval) {
       case 's' :return new Date(date.getTime() + (1000 * num))
       case 'n' :return new Date(date.getTime() + (60000 * num))
       case 'h' :return new Date(date.getTime() + (3600000 * num))
       case 'd' :return new Date(date.getTime() + (86400000 * num))
       case 'w' :return new Date(date.getTime() + ((86400000 * 7) * num))
       case 'm' :return new Date(date.getFullYear(), (date.getMonth()) + num, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds())
       case 'y' :return new Date((date.getFullYear() + num), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds())
     }
   }

    /**
    * 比较日期差 dtEnd 格式为日期型或者有效日期格式字符串
    * @param strInterval string  可选值 y 年 m月 d日 w星期 ww周 h时 n分 s秒
    * @param dtStart Date  可选值 y 年 m月 d日 w星期 ww周 h时 n分 s秒
    * @param dtEnd Date  可选值 y 年 m月 d日 w星期 ww周 h时 n分 s秒
    */
   function dateDiff (strInterval, dtStart, dtEnd) {
     switch (strInterval) {
       case 's' :return parseInt((dtEnd - dtStart) / 1000)
       case 'n' :return parseInt((dtEnd - dtStart) / 60000)
       case 'h' :return parseInt((dtEnd - dtStart) / 3600000)
       case 'd' :return parseInt((dtEnd - dtStart) / 86400000)
       case 'w' :return parseInt((dtEnd - dtStart) / (86400000 * 7))
       case 'm' :return parseInt((dtEnd.getMonth()) + ((dtEnd.getFullYear() - dtStart.getFullYear()) * 12) - (dtStart.getMonth()))
       case 'y' :return parseInt(dtEnd.getFullYear() - dtStart.getFullYear())
     }
   }
   /**
    * [dateDiffFormat description]把日期转换成 x分钟前这种
    * @param  {[type]} dtStart [description]
    * @param  {[type]} dtEnd   [description]
    * @return {[type]}         [description]
    */
   function dateDiffFormat (dtStart, dtEnd) {
     const str = ['y', 'm', 'w', 'd', 'h', 'n', 's']
     const strChar = ['年', '月', '周', '天', '小时', '分', '秒']
     let time
     for (let i = 0; i < str.length; i++) {
       time = dateDiff(str[i], dtStart, dtEnd)
       if (time >= 1) {
         time = `${time}${strChar[i]}前`
         break
       }
     }
     return time
   }

    /**
    * 把指定格式的字符串转换为日期对象yyyy-MM-dd HH:mm:ss
    *
    */
   function strFormatToDate (formatStr, dateStr) {
     let year = 0
     let start = -1
     let len = dateStr.length
     if ((start = formatStr.indexOf('yyyy')) > -1 && start < len) {
       year = dateStr.substr(start, 4)
     }
     let month = 0
     if ((start = formatStr.indexOf('MM')) > -1 && start < len) {
       month = parseInt(dateStr.substr(start, 2)) - 1
     }
     let day = 0
     if ((start = formatStr.indexOf('dd')) > -1 && start < len) {
       day = parseInt(dateStr.substr(start, 2))
     }
     let hour = 0
     if (((start = formatStr.indexOf('HH')) > -1 || (start = formatStr.indexOf('hh')) > 1) && start < len) {
       hour = parseInt(dateStr.substr(start, 2))
     }
     let minute = 0
     if ((start = formatStr.indexOf('mm')) > -1 && start < len) {
       minute = dateStr.substr(start, 2)
     }
     let second = 0
     if ((start = formatStr.indexOf('ss')) > -1 && start < len) {
       second = dateStr.substr(start, 2)
     }
     return new Date(year, month, day, hour, minute, second)
   }

    /**
    * 日期对象转换为毫秒数
    */
   function dateToLong (date) {
     return date.getTime()
   }

    /**
    * 毫秒转换为日期对象
    * @param dateVal number 日期的毫秒数
    */
   function longToDate (dateVal) {
     return new Date(dateVal)
   }

    /**
    * 把日期分割成数组 [年、月、日、时、分、秒]
    */
   function toArray (myDate) {
     myDate = myDate || new Date()
     let myArray = []
     myArray[0] = myDate.getFullYear()
     myArray[1] = myDate.getMonth()
     myArray[2] = myDate.getDate()
     myArray[3] = myDate.getHours()
     myArray[4] = myDate.getMinutes()
     myArray[5] = myDate.getSeconds()
     return myArray
   }

    /**
    * 取得日期数据信息
    * 参数 interval 表示数据类型
    * y 年 M月 d日 w星期 ww周 h时 n分 s秒
    */
   function datePart (interval, myDate) {
     myDate = myDate || new Date()
     let partStr = ''
     let Week = ['日', '一', '二', '三', '四', '五', '六']
     switch (interval) {
       case 'y' :partStr = myDate.getFullYear(); break
       case 'M' :partStr = myDate.getMonth() + 1; break
       case 'd' :partStr = myDate.getDate(); break
       case 'w' :partStr = Week[myDate.getDay()]; break
       case 'ww' :partStr = myDate.WeekNumOfYear(); break
       case 'h' :partStr = myDate.getHours(); break
       case 'm' :partStr = myDate.getMinutes(); break
       case 's' :partStr = myDate.getSeconds(); break
     }
     return partStr
   }

    /**
    * 取得当前日期所在月的最大天数
    */
   function maxDayOfDate (date) {
     date = date || new Date()
     date.setDate(1)
     date.setMonth(date.getMonth() + 1)
     let time = date.getTime() - 24 * 60 * 60 * 1000
     let newDate = new Date(time)
     return newDate.getDate()
   }
   export default {
     isLeapYear,
     maxDayOfDate,
     datePart,
     dateToStr,
     dateAdd,
     dateDiff,
     strFormatToDate,
     dateToLong,
     longToDate,
     toArray,
     dateDiffFormat
   }
