import moment from 'moment';

export const getDateFormated = (d?: string): string => {
    return moment(d).format("DD/MM/YYYY"); 
};
