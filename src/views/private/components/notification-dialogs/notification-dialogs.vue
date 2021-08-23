<template>
	<div class="notification-dialogs">
		<v-dialog v-for="notification in notifications" :key="notification.id" :model-value="true" persist>
			<v-card :class="[notification.type]">
				<v-card-title>{{ notification.title }}</v-card-title>
				<v-card-text v-if="notification.text">
					{{ notification.text }}

					<v-error v-if="notification.error" :error="notification.error" />
				</v-card-text>
				<v-card-actions>
					<v-button @click="done(notification.id)">{{ t('dismiss') }}</v-button>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useNotificationsStore } from '@/stores';

export default defineComponent({
	setup() {
		const { t } = useI18n();

		const notificationStore = useNotificationsStore();

		const notifications = computed(() => notificationStore.dialogs);

		return { t, notifications, done };

		function done(id) {
      notificationStore.remove(id);
		}
	},
});
</script>

<style scoped>
.notification-dialogs {
	position: relative;
}

.v-error {
	margin-top: 12px;
}
</style>
