import { ref } from 'vue';
import { get, isEqual } from 'lodash';

export default function useEdit(
  value,
  relation,
  emit,
) {
  const editModalActive = ref(false);
  const currentlyEditing = ref(null);
  const relatedPrimaryKey = ref(null);

  // This keeps track of the starting values so we can match with it
  const editsAtStart = ref({});

  function editItem(item) {
    const { relationPkField, junctionField, junctionPkField } = relation.value;

    editModalActive.value = true;
    editsAtStart.value = item;
    currentlyEditing.value = get(item, [junctionPkField], null);
    relatedPrimaryKey.value = get(item, [junctionField, relationPkField], null);
  }

  function stageEdits(edits) {
    const { relationPkField, junctionField, junctionPkField } = relation.value;

    const newValue = (value.value || []).map((item) => {
      if (currentlyEditing.value !== null) {
        const id = currentlyEditing.value;

        if (typeof item === 'object' && junctionPkField in item) {
          if (item[junctionPkField] === id) return edits;
        } else if (['number', 'string'].includes(typeof item)) {
          if (item === id) return edits;
        }
      }

      if (relatedPrimaryKey.value != null) {
        const id = relatedPrimaryKey.value;

        if (get(item, [junctionField], null) === id) return edits;
        if (get(item, [junctionField, relationPkField], null) === id) return edits;
      }

      if (isEqual(editsAtStart.value, item)) {
        return edits;
      }

      return item;
    });

    if (relatedPrimaryKey.value === null && currentlyEditing.value === null && newValue.includes(edits) === false) {
      newValue.push(edits);
    }

    if (newValue.length === 0) emit(null);
    else emit(newValue);

    cancelEdit();
  }

  function cancelEdit() {
    editModalActive.value = false;
    editsAtStart.value = {};
    currentlyEditing.value = null;
    relatedPrimaryKey.value = null;
  }

  return { currentlyEditing, editItem, editsAtStart, stageEdits, cancelEdit, relatedPrimaryKey, editModalActive };
}
