import formatTitle from '@/utils/format-title';

export default function (expandedParentClass = '', xAxis = false) {
	const sizeProperty = xAxis ? 'width' : 'height';
	const offsetProperty = `offset${formatTitle(sizeProperty)}`;

	return {
		beforeEnter(el) {
			el._parent = el.parentNode | null;
			el._initialStyle = {
				transition: el.style.transition,
				visibility: el.style.visibility,
				overflow: el.style.overflow,
				[sizeProperty]: el.style[sizeProperty],
			};
		},

		enter(el) {
			const initialStyle = el._initialStyle;
			if (!initialStyle) return;
			const offset = `${el[offsetProperty]}px`;

			el.style.setProperty('transition', 'none', 'important');
			el.style.visibility = 'hidden';
			el.style.visibility = initialStyle.visibility;
			el.style.overflow = 'hidden';
			el.style[sizeProperty] = '0';

			void el.offsetHeight; // force reflow

			el.style.transition =
				initialStyle.transition !== '' ? initialStyle.transition : `${sizeProperty} var(--medium) var(--transition)`;

			if (expandedParentClass && el._parent) {
				el._parent.classList.add(expandedParentClass);
			}

			requestAnimationFrame(() => {
				el.style[sizeProperty] = offset;
			});
		},

		afterEnter: resetStyles,
		enterCancelled: resetStyles,

		leave(el) {
			el._initialStyle = {
				transition: '',
				visibility: '',
				overflow: el.style.overflow,
				[sizeProperty]: el.style[sizeProperty],
			};

			el.style.overflow = 'hidden';
			el.style[sizeProperty] = `${el[offsetProperty]}px`;
			void el.offsetHeight; // force reflow

			requestAnimationFrame(() => (el.style[sizeProperty] = '0'));
		},

		afterLeave,
		leaveCancelled: afterLeave,
	};

	function afterLeave(el) {
		if (expandedParentClass && el._parent) {
			el._parent.classList.remove(expandedParentClass);
		}
		resetStyles(el);
	}

	function resetStyles(el) {
		if (!el._initialStyle) return;
		const size = el._initialStyle[sizeProperty];
		el.style.overflow = el._initialStyle.overflow;
		if (size != null) el.style[sizeProperty] = size;
		delete el._initialStyle;
	}
}
