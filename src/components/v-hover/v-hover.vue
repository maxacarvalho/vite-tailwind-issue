<template>
	<component :is="tag" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
		<slot v-bind="{ hover }" />
	</component>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
	props: {
		closeDelay: {
			type: Number,
			default: 0,
		},
		openDelay: {
			type: Number,
			default: 0,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		tag: {
			type: String,
			default: 'div',
		},
	},
	setup(props) {
		const hover = ref(false);

		return { hover, onMouseEnter, onMouseLeave };

		function onMouseEnter() {
			if (props.disabled === true) return;

			setTimeout(() => {
				hover.value = true;
			}, props.openDelay);
		}

		function onMouseLeave() {
			if (props.disabled === true) return;

			setTimeout(() => {
				hover.value = false;
			}, props.closeDelay);
		}
	},
});
</script>
