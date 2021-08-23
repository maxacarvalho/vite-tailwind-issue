export default function importDateLocale(locale) {
	switch (locale) {
		case 'en-US':
			return import('date-fns/locale/en-US/index.js');
		case 'pt-BR':
			return import('date-fns/locale/pt-BR/index.js');
		default:
			return Promise.resolve();
	}
}
