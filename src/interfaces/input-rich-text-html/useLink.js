import { i18n } from '@/lang';
import { ref } from 'vue';

export default function useLink(editor) {
  const linkDrawerOpen = ref(false);
  const linkSelection = ref({
    url: null,
    displayText: null,
    title: null,
    newTab: true,
  });

  const linkButton = {
    icon: 'link',
    tooltip: i18n.global.t('wysiwyg_options.link'),
    onAction: (buttonApi) => {
      linkDrawerOpen.value = true;

      if (buttonApi.isActive()) {
        const node = editor.value.selection.getNode();
        editor.value.selection.select(node);

        const url = node.getAttribute('href');
        const title = node.getAttribute('title');
        const displayText = node.innerText;
        const target = node.getAttribute('target');

        if (url === null || displayText === null) {
          return;
        }

        linkSelection.value = {
          url,
          displayText,
          title: title || null,
          newTab: target === '_blank',
        };
      } else {
        defaultLinkSelection();
      }
    },
    onSetup: (buttonApi) => {
      const onImageNodeSelect = (eventApi) => {
        buttonApi.setActive(eventApi.element.tagName === 'A');
      };

      editor.value.on('NodeChange', onImageNodeSelect);

      return function () {
        editor.value.off('NodeChange', onImageNodeSelect);
      };
    },
  };

  return { linkDrawerOpen, linkSelection, closeLinkDrawer, saveLink, linkButton };

  function defaultLinkSelection() {
    linkSelection.value = {
      url: null,
      displayText: null,
      title: null,
      newTab: true,
    };
  }

  function closeLinkDrawer() {
    defaultLinkSelection();
    linkDrawerOpen.value = false;
  }

  function saveLink() {
    const link = linkSelection.value;
    if (link.url === null) return;
    const linkHtml = `<a href="${link.url}" title="${link.title || ''}" target="${link.newTab ? '_blank' : '_self'}" >${
      link.displayText || link.url
    }</a>`;

    editor.value.selection.setContent(linkHtml);
    closeLinkDrawer();
  }
}
