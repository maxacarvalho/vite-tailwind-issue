<template>
	<div class="latency-indicator" v-tooltip.bottom.end="latencyTooltip">
		<v-icon :name="icon" />
	</div>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { defineComponent, computed, ref } from 'vue';

export default defineComponent({
	setup() {
		const { t } = useI18n();

		const connectionStrength = ref(true);
		const avgLatency = ref('20ms');

		const latencyTooltip = computed(() => {
		  if (connectionStrength.value === true) return `${t('connection_excellent')}\n(${avgLatency.value} ${t('latency')})`;

		  return `${t('connection_poor')}\n(${avgLatency.value} ${t('latency')})`;
		});

		const icon = computed(() => {
		  if (connectionStrength.value === true) return 'signal_wifi_4_bar';

		  return 'signal_wifi_no_internet';
		});

		return { icon, latencyTooltip };
	},
});
</script>

<style scoped>
.v-progress-circular {
	--v-progress-circular-size: 23px;
}
</style>
