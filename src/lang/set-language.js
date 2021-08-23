import { getDisplays } from '@/displays';
import { getInterfaces } from '@/interfaces';
import { getLayouts } from '@/layouts';
import { getModules } from '@/modules';
import { useCollectionsStore, useFieldsStore } from '@/stores';
import { translate } from '@/utils/translate-object-values';
import availableLanguages from './available-languages.yaml';
import { i18n, loadedLanguages } from '@/lang/index';

const { modules, modulesRaw } = getModules();
const { layouts, layoutsRaw } = getLayouts();
const { interfaces, interfacesRaw } = getInterfaces();
const { displays, displaysRaw } = getDisplays();

export async function setLanguage(lang) {

  const collectionsStore = useCollectionsStore();
  const fieldsStore = useFieldsStore();

  if (Object.keys(availableLanguages).includes(lang) === false) {
    return false;
  }

  i18n.global.locale.value = lang;

  document.querySelector('html').setAttribute('lang', lang);

  modules.value = translate(modulesRaw.value);
  layouts.value = translate(layoutsRaw.value);
  interfaces.value = translate(interfacesRaw.value);
  displays.value = translate(displaysRaw.value);

  // collectionsStore.translateCollections();
  // fieldsStore.translateFields();

  return true;
}
