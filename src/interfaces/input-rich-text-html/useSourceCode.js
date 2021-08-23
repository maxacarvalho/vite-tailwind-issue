import { i18n } from '@/lang';
import { ref } from 'vue';

export default function useSourceCode(editor) {
  const codeDrawerOpen = ref(false);
  const code = ref();

  const sourceCodeButton = {
    icon: 'sourcecode',
    tooltip: i18n.global.t('wysiwyg_options.source_code'),
    onAction: () => {
      codeDrawerOpen.value = true;
      code.value = editor.value.getContent();
    },
  };

  return { codeDrawerOpen, code, closeCodeDrawer, saveCode, sourceCodeButton };

  function closeCodeDrawer() {
    codeDrawerOpen.value = false;
  }

  function saveCode() {
    editor.value.setContent(code.value);
    closeCodeDrawer();
  }
}
