<template>
  <div class="md:pb-16">
    <!-- site-navbar start -->
    <nav class="md:bottom-auto bottom-0 h-16" :class="{ 'hidden-navbar': !showNavbar && navIsOpen, 'visible-navbar' : showNavbar && navIsOpen }">
    <!-- classic -->
      <div class="md:flex justify-between hidden w-full">
        <router-link v-if="isAuthenticated" to="/" >Accueil</router-link>
        <div v-else></div>
        
        <div class="flex justify-between text-center">
          <router-link v-if="isAuthenticated" class="w-44" to="/profile"><i class="fa-solid fa-circle-user fa-xl "></i></router-link>
          <router-link v-if="!isAuthenticated"  class="w-44" to="/profile/create" >Créer un compte</router-link>
          <router-link v-if="!isAuthenticated" class="w-44" to="/login" >Connexion</router-link>

          <SwitchCheckbox class="mySwitch w-44" v-on:change="toggleTheme" />
        </div>
      </div>
    <!-- mobile -->
      <div class="md:hidden flex justify-between text-center">
        <!-- col 3 -->
        <router-link class="w-24" v-if="isAuthenticated" to="/" ><i class="fa-solid fa-house fa-lg"></i></router-link>
        <router-link class="w-24" v-if="isAuthenticated" to="/" ><i class="fa-solid fa-circle-plus fa-2xl"></i></router-link>
        <router-link v-if="isAuthenticated" class="w-24" to="/profile"><i class="fa-solid fa-circle-user fa-xl"></i></router-link>

        <!-- col 2 -->
        <router-link v-if="!isAuthenticated"  to="/login" >Connexion</router-link>
        <router-link v-if="!isAuthenticated" to="/profile/create" >Créer un compte</router-link>

        
      </div>
    </nav>
  </div>
</template>

<script>
import store from "@/store";
import SwitchCheckbox from "@/components/SwitchCheckbox";

export default {
  name: 'NavBar',
  components:{
    SwitchCheckbox
  },
  data: function(){
    return{
      navToggler: null,
      navMenu: null,
      navLinks: null,
      OFFSET: 30,
      showNavbar: true,
      lastScrollPosition: 0,
      scrollValue: 0,
      navIsOpen: true,
    }
  },
  computed:{
    isAuthenticated() {
      return store.getters.isAuthenticated;
    },

  },

  mounted() {
    this.navToggler = document.querySelector('.nav-toggler');
    this.navMenu = document.querySelector('.site-navbar ul');
    this.navLinks = document.querySelectorAll('.site-navbar a');

    this.lastScrollPosition = document.documentElement.scrollTop;
    window.addEventListener('scroll', this.onScroll);
    const viewportMeta = document.createElement('meta');
    viewportMeta.name = 'viewport';
    viewportMeta.content = 'width=device-width, initial-scale=1';
    document.head.appendChild(viewportMeta);

  },

  methods: {
    
    onScroll () {
      if (document.documentElement.scrollTop < 0) {
        return;
      }
      if (Math.abs(document.documentElement.scrollTop - this.lastScrollPosition) < this.OFFSET) {
        return;
      }
      this.showNavbar = document.documentElement.scrollTop < this.lastScrollPosition;
      this.lastScrollPosition = document.documentElement.scrollTop;
    },
  
    toggleTheme() {
      this.$store.dispatch('toggleTheme');
    },
  },
  beforeUnmount () {
    window.removeEventListener('scroll', this.onScroll)
  },

}
</script>

<style scoped>

.router-link-active{
  @apply text-fuchsia-700;
}



a{
  @apply hover:text-fuchsia-700 duration-200;
}

.switch-toggle-checked {
  transform: translateX(calc(var(--element-size) * 0.6)) !important;
}
.site-logo{
  margin: -10px 0 -8px 0;
}
.hidden-navbar {
  transform: translate(0, 100%);
}

@media (min-width: 768px) {
  .hidden-navbar {
    transform: translate(0, -100%);
  }

}



/* navbar regular css start */
nav {
  width: 100%;
  position: fixed;
  z-index: 1100;
  transition: 0.5s all ease-out;
  background: var(--nav-background-color-primary);
  color: var(--text-primary-color);
  padding: 20px;
  display: block;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
}






</style>