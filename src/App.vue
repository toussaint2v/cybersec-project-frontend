<template>
  <NavBar />
  <router-view v-slot="{ Component }">
    <transition name ="route" mode="out-in">
      <component :is="Component"> </component>
    </transition>
  </router-view>
</template>

<script>
import store from "@/store";
import NavBar from "@/components/NavBar";

export default {
  components: {NavBar},
  data(){
    return{
      userTheme: "light-theme",
    }
  },

  beforeMount() {

    var theme = this.getMediaPreference();
    if (localStorage.getItem('userTheme')){
      theme = localStorage.getItem('userTheme');
    }
    this.setTheme(theme);
    this.match_media = window.matchMedia("(prefers-color-scheme: dark)");
    this.match_media.addEventListener("change", () => {
      this.setTheme(this.getMediaPreference());
    })

  },

  methods: {
    setTheme(theme) {
      store.commit('SET_USER_THEME', theme)
      this.userTheme = theme;
      document.documentElement.className = theme;
    },

    getMediaPreference() {
      const hasDarkPreference = window.matchMedia(
          "(prefers-color-scheme: dark)"
      ).matches;
      if (hasDarkPreference) {
        return "dark-theme";
      } else {
        return "light-theme";
      }
    }
  }
}
</script>
<style>
/* Define styles for the default root window element */
:root{
  --element-size: 4rem;
  --primary-blue: #772ee5;
}
:root.light-theme {
  --nav-background-color-primary: rgb(234, 234, 234);
  --background-color-primary: #ffffff;
  --background-color-secondary: #e7e6e6;
  --accent-color: #e7e6e6;
  --text-primary-color: #222;
}

/* Define styles for the root window with dark - mode preference */
:root.dark-theme {
  --nav-background-color-primary: rgb(25, 28, 31);
  --background-color-primary: #5a595b;
  --background-color-secondary: #2d2d30;
  --accent-color: #3f3f3f;
  --text-primary-color: #ffffff;
}

#app {
  color: var(--text-primary-color);
  background-color: var(--background-color-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif;

  min-height: 100vh;
  @apply md:pb-0 pb-16;

}
</style>
