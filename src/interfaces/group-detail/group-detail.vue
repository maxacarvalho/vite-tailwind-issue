<template>
	<v-detail :start-open="start === 'open'" class="group-detail">
		<template #activator="{ toggle, active }">
			<v-divider
				:style="{
					'--v-divider-label-color': headerColor,
				}"
				:class="{ active }"
				:inline-title="false"
				large
				@click="toggle"
			>
				<template v-if="headerIcon" #icon><v-icon :name="headerIcon" class="header-icon" /></template>
				<template v-if="field.name">
					<span class="title">{{ field.name }}</span>
				</template>
				<v-icon class="expand-icon" name="expand_more" />
			</v-divider>
		</template>

		<v-form
			:initial-values="initialValues"
			:fields="fields"
			:model-value="values"
			:primary-key="primaryKey"
			:group="field.meta.id"
			:validation-errors="validationErrors"
			:loading="loading"
			:batch-mode="batchMode"
			@update:model-value="$emit('apply', $event)"
		/>
	</v-detail>
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

		start: {
			type: String,
			enum: ['open', 'closed'],
			default: 'open',
		},
		headerIcon: {
			type: String,
			default: null,
		},
		headerColor: {
			type: String,
			default: null,
		},
	},
	emits: ['apply'],
});
</script>

<style scoped>
.v-form {
	padding-top: calc(var(--form-vertical-gap) / 2);
}

.v-divider {
	cursor: pointer;
}

.v-divider .expand-icon {
	float: right;
	transform: rotate(90deg) !important;
	transition: transform var(--fast) var(--transition);
}

.v-divider.active .expand-icon {
	transform: rotate(0) !important;
}

.header-icon {
	margin-right: 12px !important;
}
</style>
