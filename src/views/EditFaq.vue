<template>
  <div class="h-full overflow-y-auto">
    <Header />

    <div class="m-4" dir="rtl">
      <div class="bg-white shadow px-4 py-5">
        <!-- error and success alerts -->
        <Alert v-show="error.err && !success">
          <h3 class="text-sm font-medium text-red-700 mr-2">
            {{ error.msg }}
          </h3>
        </Alert>

        <Success v-show="success">
          <h3 class="text-sm font-medium text-green-800">
            תשובה נערכה בהצלחה!
          </h3>
        </Success>

        <!-- create faq form -->
        <div>
          <form>
            <!-- question -->
            <div>
              <label
                for="question"
                class="block text-sm font-medium text-gray-700"
                >שאלה</label
              >
              <input
                v-model.trim="faqData.q"
                type="text"
                name="question"
                id="question"
                class="
                  mt-1
                  focus:ring-indigo-500
                  focus:border-indigo-500
                  block
                  w-full
                  shadow-sm
                  border-gray-300
                  rounded-md
                "
                required=""
              />
              <span
                class="mb-2 mr-2 text-red-500 italic"
                v-if="!faqData.q.length"
                >שדה חובה!</span
              >
            </div>

            <!-- answer -->
            <div>
              <label
                for="answer"
                class="block text-sm font-medium text-gray-700 mt-2"
              >
                תשובה
              </label>
              <div class="mt-1">
                <textarea
                  v-model.trim="faqData.a"
                  id="answer"
                  name="answer"
                  rows="7"
                  class="
                    shadow-sm
                    focus:ring-indigo-500
                    focus:border-indigo-500
                    block
                    w-full
                    border border-gray-300
                    rounded-md
                  "
                  required=""
                />
                <span
                  class="mb-2 mr-2 text-red-500 italic"
                  v-if="!faqData.a.length"
                  >שדה חובה!</span
                >
              </div>

              <!-- link -->
              <div>
                <label
                  for="link"
                  class="block text-sm font-medium text-gray-700 mt-2"
                  >קישור</label
                >
                <input
                  v-model="faqData.link"
                  type="text"
                  name="link"
                  id="link"
                  class="
                    text-left
                    mt-1
                    mb-3
                    focus:ring-indigo-500
                    focus:border-indigo-500
                    block
                    w-full
                    shadow-sm
                    sm:text-sm
                    border-gray-300
                    rounded-md
                  "
                  placeholder=".../https://facebook.com"
                />
              </div>

              <!-- tags (optional) -->
              <div>
                <label
                  for="tags"
                  class="block text-sm font-medium text-gray-700 mt-2"
                  >תגיות (אופציונלי)</label
                >
                <input
                  v-model.trim="faqData.tags"
                  type="text"
                  name="tags"
                  id="tags"
                  class="
                    mt-1
                    focus:ring-indigo-500
                    focus:border-indigo-500
                    block
                    w-full
                    shadow-sm
                    border-gray-300
                    rounded-md
                  "
                  required=""
                />
              </div>
            </div>
          </form>
        </div>
      </div>

      <!-- submit and reset form buttons -->
      <div class="flex justify-end mt-5 px-4">
        <button
          type="button"
          class="
            ml-3
            inline-flex
            justify-center
            py-2
            px-4
            border border-transparent
            shadow-sm
            text-sm
            font-medium
            rounded-md
            text-white
            bg-indigo-600
            hover:bg-indigo-700
            focus:outline-none
            focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
            mb-2
          "
          @click="submitForm"
        >
          אישור
        </button>
        <button
          type="button"
          class="
            bg-white
            py-2
            px-4
            border border-gray-300
            rounded-md
            shadow-sm
            text-sm
            font-medium
            text-gray-700
            hover:bg-gray-50
            focus:outline-none
            focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
            mb-2
          "
          @click="$router.go(-1)"
        >
          חזרה
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import Header from '@/components/Header.vue';
import Success from '@/components/Success.vue';
import Alert from '@/components/Alert.vue';

export default {
  name: 'EditFaq',
  components: { Header, Success, Alert },

  setup() {
    const store = useStore();
    const route = useRoute();
    const clicked = ref(false);
    const faqData = computed(() => store.getters.getFaq(route.params.id));
    const error = computed(() => store.getters.getError);

    onUnmounted(() => {
      store.commit('setSuccess', false);
      store.commit('setError', {});
    });
    return {
      faqData,
      error,
      clicked,
      success: computed(() => store.getters.getSuccess),

      submitForm: () => {
        clicked.value = true;
        faqData.value.tags += '';
        faqData.value.tags = faqData.value.tags.split(',');
        if (faqData.value.q.length && faqData.value.a.length) {
          store.dispatch('editFaqAction', faqData.value);
        } else if (clicked.value) {
          store.commit('setError', { err: true, msg: 'קיימות שגיאות בטופס' });
          clicked.value = false;
        }
      },
    };
  },
};
</script>
