<template>
  <v-app>
    <v-main>
      <v-app-bar
        v-if="!isLoginPage"
        color="primary"
        density="compact"
      >
        <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>ほんのいちにち</v-app-bar-title>
        <v-btn icon @click="logout">
          <v-icon>mdi-logout</v-icon>
        </v-btn>

      </v-app-bar>
      <div id="app">
        <router-view/>
      </div>
      <v-bottom-navigation
        v-if="!isLoginPage"
        v-model="value"
        active
        color="primary"
      >
      <v-btn @click="this.$router.push('/post')">
        <v-icon>mdi-note</v-icon>

       <span>投稿</span> 
      </v-btn>

      <v-btn @click="this.$router.push('/')">
        <v-icon>mdi-home</v-icon>

        <span>ホーム</span>
      </v-btn>

      <v-btn @click="this.$router.push('/setting')">
        <v-icon>mdi-cog</v-icon>

        <span>設定</span>
      </v-btn>
    </v-bottom-navigation>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    value: parseInt(window.localStorage.getItem('pageIndex')) | null,
  }),
  created() {
    window.localStorage.setItem('pageIndex', 1);
  },
  methods: {
   logout() {
      window.localStorage.clear();
      this.$router.push({name: "Login"});
   }
  },
  computed: {
    isLoginPage() {
      return this.$route.path === '/Login' ;
    },
    currentPath() {
      if(this.$route.path === '/') {
        console.log("aaa")
        return true;
    }

  }
}
</script>
