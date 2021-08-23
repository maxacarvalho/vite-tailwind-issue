<template>
	<div class="group-raw">
		<v-form
			:initial-values="initialValues"
			:fields="fields"
			:model-value="values"
			:primary-key="primaryKey"
			:group="field.meta.id"
			:validation-errors="validationErrors"
			:loading="loading"
			@update:model-value="$emit('apply', $event)"
		/>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'InterfaceGroupRaw',
	props: {
		field: {
			type: Object,
			required: true,
		},
		fields: {
			type: Array,
			required: true,
		},
		values: {
			type: Object,
			required: true,
		},
		initialValues: {
			type: Object,
			required: true,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		batchMode: {
			type: Boolean,
			default: false,
		},
		batchActiveFields: {
			type: Array,
			default: () => [],
		},
		primaryKey: {
			type: [Number, String],
			required: true,
		},
		loading: {
			type: Boolean,
			default: false,
		},
		validationErrors: {
			type: Array,
			default: () => [],
		},
	},
	emits: ['apply'],
});
</script>
