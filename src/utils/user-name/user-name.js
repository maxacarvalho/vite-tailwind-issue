import { i18n } from '@/lang';

export function userName(user) {
	if (user.name) {
		return user.name;
	}

	if (user.email) {
		return user.email;
	}

	return i18n.global.t('unknown_user');
}
