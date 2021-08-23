<template>
	<div class="actions">
		<v-button
			v-if="!isExisting && currentTabIndex < tabs.length - 1"
			v-tooltip.bottom="t('next')"
			:disabled="nextDisabled"
			icon
			rounded
			@click="nextTab"
		>
			<v-icon name="arrow_forward" />
		</v-button>

		<v-button v-else v-tooltip.bottom="t('save')" :loading="saving" icon rounded @click="$emit('save')">
			<v-icon name="check" />
		</v-button>
	</div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import useSync from '@/composables/use-sync';

export default defineComponent({
	props: {
		collection: {
			type: String,
			required: true,
		},
		current: {
			type: Array,
			required: true,
		},
		tabs: {
			type: Array,
			required: true,
		},
		saving: {
			type: Boolean,
			default: false,
		},
		isExisting: {
			type: Boolean,
			default: false,
		},
	},
	emits: ['save', 'update:current'],
	setup(props, { emit }) {
		const { t } = useI18n();

		const internalCurrentTab = useSync(props, 'current', emit);

		const currentTabIndex = computed(() => props.tabs.findIndex((tab) => tab.value === props.current[0]));

		const previousDisabled = computed(() => {
			return currentTabIndex.value === 0;
		});

		const nextDisabled = computed(() => {
			const nextTab = props.tabs[currentTabIndex.value + 1];

			if (nextTab) {
				return nextTab.disabled;
			}

			return true;
		});

		return { t, internalCurrentTab, previousDisabled, previousTab, nextDisabled, nextTab, currentTabIndex };

		function previousTab() {
			const previousTab = props.tabs[currentTabIndex.value - 1];

			if (previousTab) {
				internalCurrentTab.value = [previousTab.value];
			}
		}

		function nextTab() {
			const nextTab = props.tabs[currentTabIndex.value + 1];

			if (nextTab) {
				internalCurrentTab.value = [nextTab.value];
			}
		}
	},
});
</script>

<style lang="scss" scoped>
.actions {
	display: contents;
}

.spacer {
	flex-grow: 1;
}

.v-button:not(:last-child) {
	margin-right: 8px;
}
</style>
