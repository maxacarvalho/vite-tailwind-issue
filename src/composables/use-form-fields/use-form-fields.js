import { getInterfaces } from '@/interfaces';
import { getDefaultInterfaceForType } from '@/utils/get-default-interface-for-type';
import { clone, orderBy } from 'lodash';
import { computed } from 'vue';
import { translate } from '@/utils/translate-object-values';

export default function useFormFields(fields) {
  const { interfaces } = getInterfaces();

  const systemFieldsCount = computed(() => fields.value.filter((field) => field.meta?.system === true).length);

  const formFields = computed(() => {
    let formFields = clone(fields.value);

    formFields = formFields.map((field, index) => {
      if (! field.meta) return field;

      let interfaceUsed = interfaces.value.find((int) => int.id === field.meta?.interface);
      const interfaceExists = interfaceUsed !== undefined;

      if (interfaceExists === false) {
        field.meta.interface = getDefaultInterfaceForType(field.type);
      }

      interfaceUsed = interfaces.value.find((int) => int.id === field.meta?.interface);

      if (interfaceUsed?.hideLabel === true) {
        field.hideLabel = true;
      }

      if (interfaceUsed?.hideLoader === true) {
        field.hideLoader = true;
      }

      if (index !== 0 && field.meta.width === 'half') {
        const prevField = formFields[index - 1];

        if (prevField.meta?.width === 'half') {
          field.meta.width = 'half-right';
        }
      }

      if (field.meta?.sort && field.meta?.system !== true) {
        field.meta.sort = Number(field.meta.sort) + Number(systemFieldsCount.value);
      }

      return field;
    });

    // Filter out the fields that are marked hidden on detail
    formFields = formFields.filter((field) => {
      const hidden = field.meta?.hidden;
      const systemFake = field.field?.startsWith('$') || false;
      return hidden !== true && systemFake === false;
    });

    formFields = orderBy(formFields, 'meta.sort');

    formFields = translate(formFields);

    return formFields;
  });

  return { formFields };
}
