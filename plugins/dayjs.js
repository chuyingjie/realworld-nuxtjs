import Vue from 'vue'
import dayjs from 'dayjs'

Vue.filter('date', (value, formater = 'YYYY-MM-DD') => {
    return dayjs(value).format(formater)
})