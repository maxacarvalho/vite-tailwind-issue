const Focus = {
  mounted(el, binding) {
    if (binding.value) {
      el.focus();
    } else {
      el.blur();
    }
  },
};

export default Focus;
