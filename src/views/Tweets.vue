<template>
  <div class="h-full overflow-y-auto">
    <Header />

    <Tweet v-for="(tweet, index) in tweets" :key="index" :tweet="tweet" />
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import Header from '@/components/Header.vue';
import Tweet from '@/components/Tweet.vue';

export default {
  name: 'Tweets',
  components: { Header, Tweet },

  setup() {
    const store = useStore();

    return {
      tweets: computed(() => store.getters.getTweets),
    };
  },
};
</script>
