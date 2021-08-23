<template>
	<v-list large>
		<v-list-item v-for="item in navItems" :key="item.to" :to="item.to">
			<v-list-item-icon><v-icon :name="item.icon" /></v-list-item-icon>
			<v-list-item-content>
				<v-text-overflow :text="item.name" />
			</v-list-item-content>
		</v-list-item>
	</v-list>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { defineComponent } from 'vue';

export default defineComponent({
	setup() {
		const { t } = useI18n();

		const navItems = [
			/*{
				icon: 'public',
				name: t('settings_project'),
				to: `/settings/project`,
			},*/
			{
				icon: 'list_alt',
				name: t('settings_data_model'),
				to: `/settings/data-model`,
			},
			/*{
				icon: 'admin_panel_settings',
				name: t('settings_permissions'),
				to: `/settings/roles`,
				outline: true,
			},
			{
				icon: 'bookmark_border',
				name: t('settings_presets'),
				to: `/settings/presets`,
			},
			{
				icon: 'anchor',
				name: t('settings_webhooks'),
				to: `/settings/webhooks`,
			},*/
		];

		return { navItems };
	},
});
</script>

<style scoped>
.version .v-icon {
	color: var(--foreground-subdued);
	transition: color var(--fast) var(--transition);
}

.version :deep(.v-text-overflow) {
	color: var(--foreground-subdued);
	transition: color var(--fast) var(--transition);
}

.version:hover .v-icon {
	color: var(--foreground-normal-alt);
}

.version:hover :deep(.v-text-overflow) {
	color: var(--foreground-normal-alt);
}
</style>
