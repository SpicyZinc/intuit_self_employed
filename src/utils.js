import moment from 'moment';

export const getTime = (ts) => {
	return moment.unix(ts / 1000).format("MM/DD/YYYY HH:mm");
};

export const getMilliSeconds = (str) => {
	const momentObj = moment(str, 'YYYY-MM-DD HH:mm');
	return momentObj.valueOf();
};

export const desc = (a, b, orderBy) => b[orderBy] - a[orderBy];

export const stableSort = (array, cmp) => {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = cmp(a[0], b[0]);
		if (order !== 0) {
			return order;
		} else {
			return a[1] - b[1];
		}
	});
	
	return stabilizedThis.map(el => el[0]);
};

export const getSorting = (order, orderBy) => {
	return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
};