import api from '@/api';
import { parseFilter } from '@/utils/parse-filter';
import { defineStore } from 'pinia';
import { useUserStore } from '@/stores';

export const usePermissionsStore = defineStore({
  id: 'permissionsStore',
  state: () => ({
    permissions: [],
  }),
  actions: {
    async hydrate() {
      const userStore = useUserStore();

      const response = await api.get('permissions', {
        params: {
          limit: 999999,
          filter: {
            role: {
              _eq: userStore.currentUser.role.id,
            },
          },
        },
      });

      this.permissions = response.data.data.map((rawPermission) => {
        if (rawPermission.permissions) {
          rawPermission.permissions = parseFilter(rawPermission.permissions);
        }

        if (rawPermission.validation) {
          rawPermission.validation = parseFilter(rawPermission.validation);
        }

        if (rawPermission.presets) {
          rawPermission.presets = parseFilter(rawPermission.presets);
        }

        return rawPermission;
      });
    },
    dehydrate() {
      this.$reset();
    },
    getPermissionsForUser(collection, action) {
      const userStore = useUserStore();
      return (
        this.permissions.find(
          (permission) =>
            permission.action === action &&
            permission.collection === collection &&
            permission.role === userStore.currentUser?.role?.id,
        ) || null
      );
    },
  },
});
