<template>
   <div class= "ui main container">
    <div class="ui segment">
    <h1>今日の日記</h1>
    
      <form class="ui form" >
    <h2>悲しかったこと</h2>
        <div class="field">
          <div class="ui input">
            <textarea rows="4" type="text" v-model="post.text1" ></textarea>
          </div><!--ui input-->
        </div><!--field-->
        
        
    <h2>嬉しかったこと</h2>
        <div class="field">
          <div class="ui input">
            <textarea rows="4" type="text" v-model="post.text2" ></textarea>
          </div><!--ui input-->
        </div><!--field-->
        
        
    <h2>明日の目標</h2>
        <div class="field">
          <div class="ui input">
            <textarea rows="4" type="text" v-model="post.text3"  ></textarea>
          </div><!--ui input-->
        </div><!--field-->
        
    
          <div class="field">
            <button @click="postRequest()" class="ui  blue  button right floated" type="submit">投稿</button>
          </div><!--field-->
      </form> <!-- ui form-->
    </div> <!--ui segment-->
  </div> <!--ui main container-->
 
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
     post:{
        text1:null,
        text2:null,
        text3:null,
      }
    };
  },
  created() {
  
  },
  computed: {
  // 計算した結果を変数として利用したいときはここに記述する
  },


  methods: {
    async postRequest() {
      // headerを指定する
      const headers = {'Authorization': 'mtiToken'};
      // リクエストボディを指定する
      const requestBody = {
        text1: this.post.text1,
        text2: this.post.text2,
        text3: this.post.text3,
        userId:window.localStorage.getItem('userId')
      };
      console.log(requestBody);

      try {
        /* global fetch */
        const res = await fetch(baseUrl + '/article',  {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers
        });

        const text = await res.text();
        const jsonData = text ? JSON.parse(text) : {}

        // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
        if (!res.ok) {
          const errorMessage = jsonData.message ?? 'エラーメッセージがありません';
          throw new Error(errorMessage);
        }
        
        // 成功時の処理
        console.log(jsonData);
      } catch (e) {
        // エラー時の処理
      }
    }
  },
  
}
</script>

<style scoped>


</style>
