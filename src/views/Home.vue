<template>
  <div class="h-full overflow-y-auto">
    <Header />

    <div
      v-if="!faqs.length && $store.state.searchPhrase.length"
      class="flex flex-col justify-center items-center mt-20"
    >
      <EmojiSadIcon
        class="h-10 w-10 text-indigo-500 group-hover:text-indigo-500"
        aria-hidden="true"
      />
      <p class="mt-5 text-base">לא נמצאו תשובות רלוונטיות</p>
    </div>

    <Faq v-for="(faq, index) in faqs" :key="index" :faq="faq" />
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import Header from '@/components/Header.vue';
import Faq from '@/components/Faq.vue';
import { EmojiSadIcon } from '@heroicons/vue/outline';

export default {
  name: 'Home',
  components: { Header, Faq, EmojiSadIcon },

  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch('fetchFaqsAction');
      store.dispatch('fetchTweetsAction');
    });

    return {
      faqs: computed(() =>
        store.getters.getFilteredFaqs(store.state.searchPhrase),
      ),
    };
  },
};
</script>
