import getDateFNSLocale from '@/utils/get-date-fns-locale';
import formatOriginal from 'date-fns/format';

export const localizedFormat = async (date, format, options) => {
	return formatOriginal(date, format, {
		...options,
		locale: await getDateFNSLocale(),
	});
};
