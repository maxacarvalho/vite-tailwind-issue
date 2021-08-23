import api from '@/api';
import { ref } from 'vue';

let loading = null;
let folders = null;
let nestedFolders = null;
let openFolders = null;

let error = null;

export default function useFolders() {
  if (loading === null) loading = ref(false);
  if (folders === null) folders = ref(null);
  if (nestedFolders === null) nestedFolders = ref(null);
  if (error === null) error = ref(null);
  if (openFolders === null) openFolders = ref(['root']);

  if (folders.value === null && loading.value === false) {
    fetchFolders();
  }

  return { loading, folders, nestedFolders, error, fetchFolders, openFolders };

  async function fetchFolders() {
    if (loading === null) return;
    if (folders === null) return;
    if (nestedFolders === null) return;
    if (error === null) return;

    loading.value = true;

    try {
      const response = await api.get(`/folders`, {
        params: {
          limit: 999999,
          sort: 'name',
        },
      });

      folders.value = response.data.data;
      nestedFolders.value = nestFolders(response.data.data);
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  }
}

export function nestFolders(rawFolders) {
  return rawFolders.map((rawFolder) => nestChildren(rawFolder, rawFolders)).filter((folder) => folder.parent === null);
}

export function nestChildren(rawFolder, rawFolders) {
  const folder = { ...rawFolder };

  const children = rawFolders
    .filter((childFolder) => childFolder.parent === rawFolder.id && childFolder.id !== rawFolder.id)
    .map((childRawFolder) => nestChildren(childRawFolder, rawFolders));

  if (children.length > 0) {
    folder.children = children;
  }

  return folder;
}
