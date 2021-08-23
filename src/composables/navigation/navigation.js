import { computed } from 'vue';

const useNavigation = (navigation) => {
  const pageTitle = computed(() => {
    const parent = navigation.find(p => p.current === true);

    if (! parent) return null;

    if (! parent.hasOwnProperty('children')) return parent.name;

    const activeChild = parent.children.find(child => child.current === true);

    if (! activeChild) return parent.name;

    return activeChild.name;
  });

  const topPage = computed(() => {
    const parent = navigation.find((p) => p.current === true);

    if (! parent) return null;

    return parent;
  });

  const childrenPages = computed(() => {
    if (! topPage.value.children.length) {
      return [];
    }

    const children = [];

    children.push(findActive(topPage.value.children));

    return children;
  });

  return { pageTitle, topPage, childrenPages };

  function findActive(children) {
    if (children.hasOwnProperty('children')) {
      return findActive(children);
    }

    return children.find(child => child.current === true);
  };
}

export default useNavigation;
