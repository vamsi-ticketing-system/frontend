
import * as moment from 'moment'

export const defaultDateFormat = (date) =>{
    return moment(new Date(date)).format('MMM DD, YYYY');
}