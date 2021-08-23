import api from '@/api';
import { defineStore } from 'pinia';

import { useAppStore } from '@/stores';

export const useUserStore = defineStore({
	id: 'userStore',
	state: () => ({
		currentUser: null,
		loading: false,
		error: null,
	}),
	getters: {
		fullName() {
			if (this.currentUser === null) return null;
			return this.currentUser.name;
		},
		isAdmin() {
		  return true;

		  // TODO: handle this properly
			// return this.currentUser?.role.admin_access === true || false;
		},
	},
	actions: {
		async hydrate() {
		  const appSore = useAppStore();
			this.loading = true;

			try {
				const { data } = await api.get('users/me', {
					params: {
						fields: '*,avatar.*,role.*',
					},
				});

				this.currentUser = data.data;
				appSore.authenticated = true;
			} catch (error) {
				this.error = error;
        appSore.authenticated = false;
			} finally {
				this.loading = false;
			}
		},
		async dehydrate() {
			this.$reset();
		},
		async trackPage(page) {
		  // TODO: Handle last page
			/*const latencyStore = useLatencyStore();

			const start = performance.now();

			await axios.patch(`/users/me/track/page`, {
				last_page: page,
			});

			const end = performance.now();

			latencyStore.save({
				timestamp: new Date(),
				latency: end - start,
			});

			if (this.currentUser) {
				this.currentUser.last_page = page;
			}*/
		},
	},
});
