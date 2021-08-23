import { defineStore } from 'pinia';
import api from '@/api';
import { i18n } from '@/lang';
import { notify } from '@/utils/notify';
import { unexpectedError } from '@/utils/unexpected-error';
import { notEmpty } from '@/utils/is-empty';
import formatTitle from '@/utils/format-title';

export const useCollectionsStore = defineStore({
  id: 'collectionsStore',
  state: () => ({
    collections: [],
  }),
  getters: {
    visibleCollections() {
      return this.collections
        .filter(({ collection }) => collection.startsWith('system_') === false)
        .filter((collection) => collection.meta?.hidden !== true);
    },
    hiddenCollections() {
      return this.collections
        .filter(({ collection }) => collection.startsWith('system_') === false)
        .filter((collection) => collection.meta?.hidden !== false);
    },
  },
  actions: {
    async hydrate() {
      const response = await api.get('collections', { params: { limit: 999999 } });

      const collections = response.data.data;

      this.collections = collections.map((collection) => {
        if (collection.meta && notEmpty(collection.meta.translations)) {
          for (let i = 0; i < collection.meta.translations.length; i++) {
            const { language, translation, singular, plural } = collection.meta.translations[i];

            i18n.global.mergeLocaleMessage(language, {
              collection_names: {
                [collection.collection]: translation,
              },
              collection_names_singular: {
                [collection.collection]: singular,
              },
              collection_names_plural: {
                [collection.collection]: plural,
              },
            });
          }
        }

        return {
          ...collection
        };
      });

      this.translateCollections();
    },
    translateCollections() {
      this.collections = this.collections.map((collection) => {
        let name;

        if (i18n.global.te(`collection_names.${collection.collection}`)) {
          name = i18n.global.t(`collection_names.${collection.collection}`);
        } else {
          name = formatTitle(collection.collection);
        }

        return {
          ...collection,
          name,
        };
      });
    },
    async dehydrate() {
      this.$reset();
    },
    async updateCollection(collection, updates) {
      try {
        await api.patch(`/collections/${collection}`, updates);
        await this.hydrate();
        notify({
          type: 'success',
          title: i18n.global.t('update_collection_success'),
        });
      } catch (err) {
        unexpectedError(err);
      }
    },
    async deleteCollection(collection) {
      try {
        await api.delete(`/collections/${collection}`);
        await this.hydrate();
        notify({
          type: 'success',
          title: i18n.global.t('delete_collection_success'),
        });
      } catch (err) {
        unexpectedError(err);
      }
    },
    getCollection(collectionKey) {
      return this.collections.find((collection) => collection.collection === collectionKey) || null;
    },
  },
});
