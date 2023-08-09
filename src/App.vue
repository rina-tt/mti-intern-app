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
        color="primary">
    
        <v-btn @click="this.$router.push('/post')" class="button ">
          <v-icon class="navicon float">mdi-note</v-icon>
          <span class="font-size28 float">投稿</span> 
        </v-btn>
        
        <v-btn @click="this.$router.push('/')" class="button">
          <v-icon class="navicon">mdi-home</v-icon>
          <span class="font-size28">ホーム</span>
        </v-btn>
  
        <v-btn @click="this.$router.push('/setting')" class="button">
          <v-icon class="navicon">mdi-cog</v-icon>
          <span class="font-size28">設定</span>
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
}
</script>

<style scoped>
    .font-size28{
    	font-size: 28px;
    }
    .navicon{
        font-size: 35px;
    }
    .float{
       float: left !important;
    }
    .v-bottom-navigation .button {
      width: 130px !important; /* ボタンの横幅を指定 */
    }
    .v-bottom-navigation{
      height:80px !important;
    }

</style>