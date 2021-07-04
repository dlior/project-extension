<template>
  <div class="sticky top-0 w-full">
    <!-- disclosure -->
    <Disclosure v-slot="{ open }" as="nav" class="bg-gray-800">
      <div class="max-w-7xl mx-auto px-2">
        <div class="relative flex items-center justify-between h-16">
          <div class="flex items-center px-2">
            <!-- logo icon -->
            <div class="flex-shrink-0">
              <a href="http://midaat.org.il" target="_blank"
                ><img
                  class="block h-5 w-auto"
                  src="@/assets/icons/logo.png"
                  alt="logo"
                />
              </a>
            </div>
          </div>

          <!-- search input -->
          <div class="flex-1 flex justify-center px-2">
            <div class="max-w-lg w-full">
              <label for="search" class="sr-only">Search</label>
              <div class="relative">
                <div
                  class="
                    absolute
                    inset-y-0
                    right-0
                    pr-3
                    flex
                    items-center
                    pointer-events-none
                  "
                >
                  <SearchIcon
                    class="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  v-model="phrase"
                  id="search"
                  dir="rtl"
                  name="search"
                  class="
                    block
                    w-full
                    pr-10
                    pl-3
                    py-2
                    border border-transparent
                    rounded-md
                    leading-5
                    bg-gray-700
                    text-gray-300
                    placeholder-gray-400
                    focus:outline-none
                    focus:bg-white
                    focus:border-white
                    focus:ring-white
                    focus:text-gray-900
                  "
                  placeholder="חיפוש"
                  type="search"
                />
              </div>
            </div>
          </div>
          <div class="flex lg:hidden">
            <!-- mobile menu button -->
            <DisclosureButton
              class="
                inline-flex
                items-center
                justify-center
                p-2
                rounded-md
                text-gray-400
                hover:text-white
                hover:bg-gray-700
                focus:outline-none
                focus:ring-2 focus:ring-inset focus:ring-white
              "
            >
              <span class="sr-only">Open main menu</span>
              <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <!-- menu -->
      <DisclosurePanel class="h-3/4" dir="rtl">
        <!-- navigation -->
        <div class="pt-2 pb-3 space-y-1 flex flex-col">
          <router-link
            to="/"
            class="
              text-gray-300
              hover:bg-gray-700
              hover:text-white
              px-3
              py-2
              rounded-md
              text-base
              font-medium
              inline-flex
              items-center
            "
          >
            <img
              src="@/assets/icons/collection.svg"
              class="h-6 w-6 ml-2"
              alt="collection"
            />
            <span>כל התשובות</span>
          </router-link>
          <router-link
            to="/my_faqs"
            class="
              text-gray-300
              hover:bg-gray-700
              hover:text-white
              px-3
              py-2
              rounded-md
              text-base
              font-medium
              inline-flex
              items-center
            "
          >
            <img
              src="@/assets/icons/document-text.svg"
              class="h-6 w-6 ml-2"
              alt="my-faqs"
            />
            <span>התשובות שלי</span>
          </router-link>
          <router-link
            v-show="userInfo.role === 'מדען'"
            to="/pending_approval"
            class="
              text-gray-300
              hover:bg-gray-700
              hover:text-white
              px-3
              py-2
              rounded-md
              text-base
              font-medium
              inline-flex
              items-center
            "
          >
            <img
              src="@/assets/icons/exclamation.svg"
              class="h-6 w-6 ml-2"
              alt="pending"
            />
            <span>תשובות ממתינות לאישור</span>
            <span
              v-show="pendingApprovalFaqs.length"
              class="
                px-2
                py-0.5
                mr-2
                rounded-full
                text-xs
                font-medium
                bg-indigo-500
                text-white
              "
            >
              {{ pendingApprovalFaqs.length }}
            </span>
          </router-link>
          <router-link
            to="/tweets"
            class="
              text-gray-300
              hover:bg-gray-700
              hover:text-white
              px-3
              py-2
              rounded-md
              text-base
              font-medium
              inline-flex
              items-center
            "
          >
            <img
              src="@/assets/icons/twitter-icon.svg"
              alt="twitter"
              class="h-6 w-6 ml-2"
            />
            <span>ציוצים ממתינים לתגובה</span>
            <span
              v-show="tweets.length"
              class="
                px-2
                py-0.5
                mr-2
                rounded-full
                text-xs
                font-medium
                bg-indigo-500
                text-white
              "
            >
              {{ tweets.length }}
            </span>
          </router-link>
          <div class="mt-3 px-2 space-y-1">
            <button
              class="
                text-white
                bg-indigo-500
                hover:bg-indigo-600
                px-3
                py-2
                rounded-md
                text-base
                font-medium
                inline-flex
                items-center
                mt-2
              "
              @click="$router.push('/create_faq')"
            >
              <PlusIcon class="ml-2 h-5 w-5" aria-hidden="true" />
              <span class="ml-2">הוסף תשובה</span>
            </button>
          </div>
        </div>

        <!-- user information -->
        <div class="pt-4 pb-3 border-t border-gray-700">
          <div class="flex items-center px-5" dir="ltr">
            <div class="flex-shrink-0">
              <img
                class="h-8 w-8 rounded-full"
                :src="userInfo.photoURL"
                alt="avatar"
              />
            </div>
            <div class="ml-3">
              <div class="text-sm font-medium text-gray-400">
                {{ userInfo.displayName }} - {{ userInfo.role }}
              </div>
              <div class="text-sm font-medium text-gray-400">
                {{ userInfo.email }}
              </div>
            </div>
          </div>

          <!-- signout button -->
          <div class="mt-3 px-2 space-y-1">
            <button
              class="
                text-white
                bg-red-500
                hover:bg-red-700
                inline-flex
                items-center
                px-3
                py-2
                rounded-md
                text-base
                font-medium
              "
              @click="signOut"
            >
              <LogoutIcon class="ml-2 h-5 w-5" aria-hidden="true" />
              <span class="ml-2">התנתק</span>
            </button>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  </div>
</template>

<script>
import { ref, onBeforeMount, watch, computed } from 'vue';
import { useStore } from 'vuex';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { SearchIcon } from '@heroicons/vue/solid';
import { MenuIcon, XIcon, PlusIcon, LogoutIcon } from '@heroicons/vue/outline';

export default {
  name: 'Header',
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    SearchIcon,
    MenuIcon,
    XIcon,
    PlusIcon,
    LogoutIcon,
  },

  setup() {
    const store = useStore();
    const phrase = ref('');

    onBeforeMount(() => store.commit('updateSearchPhrase', phrase));

    watch(phrase, (newVal) => store.commit('updateSearchPhrase', newVal));

    return {
      phrase,
      userInfo: computed(() => store.getters.getUserInfo),
      pendingApprovalFaqs: computed(() =>
        store.getters.getPendingApprovalFaqs(store.state.searchPhrase),
      ),
      tweets: computed(() => store.getters.getTweets),

      signOut: () => store.dispatch('signOutAction'),
    };
  },
};
</script>
