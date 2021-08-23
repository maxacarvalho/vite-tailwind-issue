export default function importCalendarLocale(locale) {
	switch (locale) {
		case 'es-us':
			return import('@fullcalendar/core/locales/es-us.js');
		case 'pt-br':
			return import('@fullcalendar/core/locales/pt-br.js');
		default:
			return Promise.resolve();
	}
}
