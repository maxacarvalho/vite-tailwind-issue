<template>
  <v-list large>
    <v-list-item v-for="item in navItems" :key="item.to" :to="item.to">
      <v-list-item-icon>
        <v-icon :name="item.icon" />
      </v-list-item-icon>
      <v-list-item-content>
        <v-text-overflow :text="item.name" />
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  setup() {
    const { t } = useI18n();

    const navItems = [
      {
        icon: 'doctor',
        name: t('doctors'),
        to: '/medical-team/doctors',
      },
    ];

    return { navItems };
  },
});
</script>

<style scoped>

</style>
