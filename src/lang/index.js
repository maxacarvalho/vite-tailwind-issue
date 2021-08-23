import { createI18n } from 'vue-i18n';
import dateFormats from './date-formats.yaml';
import ptBRBase from './translations/pt-BR.yaml';

export const i18n = createI18n({
  legacy: false,
  locale: 'pt-BR',
  fallbackLocale: 'en-US',
  messages: {
    'pt-BR': ptBRBase,
  },
  dateTimeFormats: dateFormats,
  silentTranslationWarn: true,
});

export const loadedLanguages = ['pt-BR'];

export function translateAPIError(error) {
  const defaultMsg = i18n.global.t('unexpected_error');

  let code = error;

  if (typeof error === 'object') {
    code = error?.response?.data?.errors?.[0]?.extensions?.code;
  }

  if (! error) return defaultMsg;
  if (! code === undefined) return defaultMsg;
  const key = `errors.${code}`;

  const exists = i18n.global.te(key);
  if (exists === false) return defaultMsg;
  return i18n.global.t(key);
}
