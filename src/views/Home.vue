<template>
  <router-view/>
  <Diary />
</template>

<script>
// 必要なものはここでインポートする
// @は/srcと同じ意味です
// import something from '@/components/something.vue';
// import { baseUrl } from '@/assets/config.js';

// const headers = {'Authorization' : 'mtiToken'};

import {baseUrl} from '@/assets/config.js';
import Diary from "../components/diary.vue";

export default {
  name: 'Home',

  components: {
   // 読み込んだコンポーネント名をここに記述する
    Diary
  },

  data() {
    // Vue.jsで使う変数はここに記述する
    return {
     
    };
  },
  created() {
  
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
