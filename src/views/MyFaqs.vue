<template>
  <div class="h-full overflow-y-auto">
    <Header />

    <div>
      <div
        v-if="!faqs.length && !$store.state.searchPhrase.length"
        class="flex flex-col justify-center items-center mt-20"
      >
        <QuestionMarkCircleIcon
          class="h-10 w-10 text-indigo-500 group-hover:text-indigo-500"
          aria-hidden="true"
        />
        <p class="mt-5 text-base">...לא מצאנו תשובות שאתה כתבת</p>
        <p class="mt-1 text-base">
          מעוניין להוסיף תשובה?
          <span
            ><router-link to="/create_faq" class="text-blue-500"
              >לחץ כאן</router-link
            ></span
          >
        </p>
      </div>

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
    </div>

    <Faq v-for="(faq, index) in faqs" :key="index" :faq="faq" />
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import Header from '@/components/Header.vue';
import Faq from '@/components/Faq.vue';
import { QuestionMarkCircleIcon, EmojiSadIcon } from '@heroicons/vue/outline';

export default {
  name: 'MyFaqs',
  components: { Header, Faq, QuestionMarkCircleIcon, EmojiSadIcon },

  setup() {
    const store = useStore();

    return {
      faqs: computed(() =>
        store.getters.getMyFilteredFaqs(store.state.searchPhrase),
      ),
    };
  },
};
</script>
