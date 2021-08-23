<template>
	<sidebar-detail icon="save_alt" :title="t('export_data')">
		<div class="fields">
			<div class="field full">
				<p class="type-label">{{ t('format') }}</p>
				<v-select
					v-model="format"
					:items="[
						{
							text: t('csv'),
							value: 'csv',
						},
						{
							text: t('json'),
							value: 'json',
						},
						{
							text: t('xml'),
							value: 'xml',
						},
					]"
				/>
				<v-checkbox v-model="useFilters" :label="t('use_current_filters_settings')" />
			</div>

			<div class="field full">
				<v-button full-width @click="exportData">
					{{ t('export_collection', { collection }) }}
				</v-button>
			</div>
		</div>
	</sidebar-detail>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { defineComponent, ref } from 'vue';
import api from '@/api';
import filtersToQuery from '@/utils/filters-to-query';

export default defineComponent({
	props: {
		layoutQuery: {
			type: Object,
			default: () => ({}),
		},
		filters: {
			type: Array,
			default: () => [],
		},
		searchQuery: {
			type: String,
			default: null,
		},
		collection: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		const { t } = useI18n();

		const format = ref('csv');
		const useFilters = ref(true);

		return { t, format, useFilters, exportData };

		function exportData() {
			// const url = getRootPath() + `items/${props.collection}`;
      //
			// let params = {
			// 	access_token: api.defaults.headers.Authorization.substring(7),
			// 	export: format.value || 'json',
			// };
      //
			// if (useFilters.value === true) {
			// 	if (props.layoutQuery?.sort) params.sort = props.layoutQuery.sort;
			// 	if (props.layoutQuery?.fields) params.fields = props.layoutQuery.fields;
			// 	if (props.layoutQuery?.limit) params.limit = props.layoutQuery.limit;
      //
			// 	if (props.searchQuery) params.search = props.searchQuery;
      //
			// 	if (props.filters?.length) {
			// 		params = {
			// 			...params,
			// 			...filtersToQuery(props.filters),
			// 		};
			// 	}
      //
			// 	if (props.searchQuery) {
			// 		params.search = props.searchQuery;
			// 	}
			// }
      //
			// const exportUrl = api.getUri({
			// 	url,
			// 	params,
			// });
      //
			// window.open(exportUrl);
		}
	},
});
</script>

<style lang="scss" scoped>
@import '@/styles/mixins/form-grid';

.fields {
	--form-vertical-gap: 24px;

	@include form-grid;

	.type-label {
		font-size: 1rem;
	}
}

.v-checkbox {
	width: 100%;
	margin-top: 8px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
</style>
