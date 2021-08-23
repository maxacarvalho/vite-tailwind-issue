// import { addTokenToURL } from '@/api';
import { i18n } from '@/lang';
// import { getPublicURL } from '@/utils/get-root-path';
import { ref } from 'vue';

export default function useImage(editor, imageToken) {
  const imageDrawerOpen = ref(false);
  const imageSelection = ref(null);

  const imageButton = {
    icon: 'image',
    tooltip: i18n.global.t('wysiwyg_options.image'),
    onAction: (buttonApi) => {
      imageDrawerOpen.value = true;

      if (buttonApi.isActive()) {
        const node = editor.value.selection.getNode();
        const imageUrl = node.getAttribute('src');
        const alt = node.getAttribute('alt');

        if (imageUrl === null || alt === null) {
          return;
        }

        imageSelection.value = {
          imageUrl,
          alt,
          width: Number(node.getAttribute('width')) || undefined,
          height: Number(node.getAttribute('height')) || undefined,
        };
      } else {
        imageSelection.value = null;
      }
    },
    onSetup: (buttonApi) => {
      const onImageNodeSelect = (eventApi) => {
        buttonApi.setActive(eventApi.element.tagName === 'IMG');
      };

      editor.value.on('NodeChange', onImageNodeSelect);

      return function () {
        editor.value.off('NodeChange', onImageNodeSelect);
      };
    },
  };

  return { imageDrawerOpen, imageSelection, closeImageDrawer, onImageSelect, saveImage, imageButton };

  function closeImageDrawer() {
    imageSelection.value = null;
    imageDrawerOpen.value = false;
  }

  function onImageSelect(image) {
    // let imageUrl = getPublicURL() + 'assets/' + image.id;
    let imageUrl = '';

    if (imageToken.value) {
      // imageUrl = addTokenToURL(imageUrl, imageToken.value);
      imageUrl = '';
    }

    imageSelection.value = {
      imageUrl,
      alt: image.title,
      width: image.width,
      height: image.height,
    };
  }

  function saveImage() {
    const img = imageSelection.value;
    if (img === null) return;
    const imageHtml = `<img src="${img.imageUrl}" alt="${img.alt}" width="${img.width}" height="${img.height}" />`;
    editor.value.selection.setContent(imageHtml);
    closeImageDrawer();
  }
}
