<template>
  <router-view/>
  
 
</template>

<script>
// 必要なものはここでインポートする
// @は/srcと同じ意味です
// import something from '@/components/something.vue';
// import { baseUrl } from '@/assets/config.js';

// const headers = {'Authorization' : 'mtiToken'};

import {baseUrl} from '@/assets/config.js';
import PostDiary from '../views/PostDiary.vue';



export default {
  name: 'Home',

  components: {
   // 読み込んだコンポーネント名をここに記述する
   PostDiary
 
  },

  data() {
    // Vue.jsで使う変数はここに記述する
    return {
     
    };
  },
  created() {
    this.$router.push({name:'Update'})
  
  },
  
  computed: {
  // 計算した結果を変数として利用したいときはここに記述する
  },


  methods: {
   
  }
}
</script>

<style scoped>

</style>
