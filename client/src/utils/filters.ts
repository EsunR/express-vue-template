import dayjs from 'dayjs';

/**
 * 将时间戳转化为格式化日期
 *
 * @param  {string} source  时间戳字符串，单位为ms
 * @param  {string} formatString  日期格式，如 yyyy-MM-dd hh:mm
 * @return {string} 格式化日期
 */
export default {
  formatTime(time: number | string, type = 'YYYY-MM-DD HH:mm') {
    if (!time) {
      return '';
    }

    if (typeof time === 'string') {
      return dayjs(time).format(type);
    }
    if (typeof time === 'number') {
      time = +time;

      if (time >= 1e9 && time < 1e10) {
        const timestamp = time * 1000;
        return dayjs(new Date(timestamp)).format(type);
      }
    }
    return dayjs(time).format(type);
  },
  
  formatRatio(num: number | string) {
    const formatNum = Number(num);

    if (isNaN(formatNum) || formatNum > 1) {
      console.warn('formatRate num 不合法');
      return '-';
    }

    return `${(formatNum * 100).toFixed(2)}%`;
  },

  formatScore(score: any) {
    const numberedScore = Number(score);
    if (isNaN(numberedScore)) {
      return '-';
    } else {
      return parseInt((numberedScore * 100).toString());
    }
  },
};
