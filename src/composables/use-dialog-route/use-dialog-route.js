import { ref, provide, inject, onMounted } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';

const dialogRouteSymbol = Symbol();

export function useDialogRoute() {
  const isOpen = ref(false);

  let resolveGuard;
  const leaveGuard = new Promise((resolve) => {
    resolveGuard = resolve;
  });

  onMounted(() => {
    isOpen.value = true;
  });

  onBeforeRouteLeave(() => {
    isOpen.value = false;

    return leaveGuard;
  });

  provide(dialogRouteSymbol, leave);

  return isOpen;

  function leave() {
    resolveGuard();
  }
}

export function useDialogRouteLeave() {
  const leave = inject(dialogRouteSymbol, undefined);

  return leave;
}
