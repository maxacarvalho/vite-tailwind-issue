<template>
	<v-tabs v-model="internalCurrentTab" vertical>
		<v-tab v-for="tab in tabs" :key="tab.value" :value="tab.value" :disabled="tab.disabled">
			{{ tab.text }}
		</v-tab>
	</v-tabs>
</template>

<script>
import { defineComponent } from 'vue';
import useSync from '@/composables/use-sync';

export default defineComponent({
	props: {
		tabs: {
			type: Array,
			required: true,
		},
		current: {
			type: Array,
			default: () => ['schema'],
		},
		type: {
			type: String,
			default: 'standard',
		},
	},
	emits: ['update:current'],
	setup(props, { emit }) {
		const internalCurrentTab = useSync(props, 'current', emit);

		return { internalCurrentTab };
	},
});
</script>
