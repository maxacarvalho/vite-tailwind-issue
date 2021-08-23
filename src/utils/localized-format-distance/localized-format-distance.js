import getDateFNSLocale from '@/utils/get-date-fns-locale';
import formatDistanceOriginal from 'date-fns/formatDistance';

export const localizedFormatDistance = async (date, baseDate, options) => {
	return formatDistanceOriginal(date, baseDate, {
		...options,
		locale: await getDateFNSLocale(),
	});
};
