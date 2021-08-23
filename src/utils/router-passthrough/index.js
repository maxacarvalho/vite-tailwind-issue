import { h } from 'vue';
import { RouterView } from 'vue-router';

const component = () => h(RouterView);

component.displayName = 'router-passthrough';

export default component;
