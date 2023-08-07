<template>
  <div class='ui main container'>
      <h1>悲しかったこと</h1>
      <div class="ui segment">
          
      </div><!--segment-->
      
      
      <h1>嬉しかったこと</h1>
      <div class="ui segment">
          
      </div><!--segment-->
      
      <h1>明日の目標</h1>
      <div class="ui segment">
          
      </div><!--segment-->
      
  </div><!--ui main container-->
    
 
</template>

<script>
// 必要なものはここでインポートする
// @は/srcと同じ意味です
// import something from '@/components/something.vue';
// import { baseUrl } from '@/assets/config.js';

// const headers = {'Authorization' : 'mtiToken'};

import {baseUrl} from '@/assets/config.js';

export default {
  name: 'PostDiary',

  components: {
   // 読み込んだコンポーネント名をここに記述する
 
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
html{
    font-size:30px;
    
}

</style>
