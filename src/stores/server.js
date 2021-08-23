import api from '@/api';
import { defineStore } from 'pinia';

export const useServerStore = defineStore({
	id: 'serverStore',
	state: () => ({
		info: {
      project: {
        project_name: 'Nick Saúde',
        project_logo: null,
        project_color: null,
        public_foreground: null,
        public_background: null,
        public_note: null,
        custom_css: null,
      },
    },
	}),
	actions: {
		async hydrate() {
			// const response = await api.get(`/server/info`, { params: { limit: 999999 } });
			// this.info = response.data.data;
		},
		dehydrate() {
			this.$reset();
		},
	},
});
