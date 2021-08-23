import { render } from 'micromustache';
import { computed } from 'vue';
import { getFieldsFromTemplate } from './../get-fields-from-template';

export function renderStringTemplate(template, item) {
  const templateString = computed(() => (typeof template === 'string' ? template : template.value));

  const fieldsInTemplate = computed(() => getFieldsFromTemplate(templateString.value));

  const displayValue = computed(() => {
    if (! item.value || ! templateString.value || ! fieldsInTemplate.value) return false;

    try {
      return render(templateString.value, item.value, { propsExist: true });
    } catch {
      return false;
    }
  });

  return { fieldsInTemplate, displayValue };
}

export function renderPlainStringTemplate(template, item) {
  const fieldsInTemplate = getFieldsFromTemplate(template);

  if (! item || ! template || ! fieldsInTemplate) return null;

  try {
    return render(template, item, { propsExist: true });
  } catch {
    return null;
  }
}
