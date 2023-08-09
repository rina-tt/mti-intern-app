<template>
  <div  v-if="isLoading === true" class="text-center load">
      <v-progress-circular
        :size="70"
        :width="7"
        :color="color"
        indeterminate
      ></v-progress-circular>
    </div>
   <div  v-if="isLoading === false" class= "ui main container">
    <div class="ui segment">
    <div class="custom-h1">今日の日記</div>
    
      <form class="ui massive form" >
    <div class="custom-h2">悲しかったこと</div>
        <div class="field">
          <div class="ui input">
            <textarea class="custom-textarea" rows="4" type="text" v-model="post.text1"  placeholder="(例) 朝寝坊した"></textarea>
          </div><!--ui input-->
        </div><!--field-->
        
        
    <div class="custom-h2">嬉しかったこと</div>
        <div class="field">
          <div class="ui input">
            <textarea class="custom-textarea" rows="4" type="text" v-model="post.text2" placeholder="(例) ご飯がおいしかった"></textarea>
          </div><!--ui input-->
        </div><!--field-->
        
        
    <div class="custom-h2">明日の目標</div>
        <div class="field">
          <div class="ui input">
            <textarea class="custom-textarea" rows="4" type="text" v-model="post.text3" placeholder="(例) 散歩する" ></textarea>
          </div><!--ui input-->
        </div><!--field-->
        
      </form> <!-- ui form-->
      
     <div class="ui  custom segment"> <!-- 追加: 新しいsegment -->  
        <div class="field">
            <button @click="postRequest()" class="ui  massive fluid button custom-color" type="submit">投稿</button>
          </div><!--field-->
    </div><!--ui segment-->
    
    </div> <!--ui segment-->
  </div> <!--ui main container-->
 <v-snackbar
      v-model="isShow"
      :timeout="2000"
    >
      {{ snackbarText }}
      <template v-slot:actions>
        <v-btn
          color="blue"
          variant="text"
          @click="hideSnackbar"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
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
        userId:window.localStorage.getItem('userId'),
      },
      user:{
        userId:window.localStorage.getItem('userId'),
        color:window.localStorage.getItem('color'),
        font:window.localStorage.getItem('font')
      },
      token: window.localStorage.getItem('token'),
      isLoading: false,
      isShow: false,
      snackbarText: "",
    };
  },
  created: async function() {
    // ログイン確認
    if(!this.token) {
      this.$router.push({name: 'Login'})
    // フォント取得
    const headers = {'Authorization': this.token};
    
    try {
      this.isLoading = true;
      /* global fetch */
      const res = await fetch(baseUrl + `/user?userId=${this.user.userId}`,  {
        method: 'GET',
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
      //console.log(jsonData);
      this.isLoading = false;
       //this.password = jsonData.password;
       //this.nickname = jsonData.nickname;
      this.color = jsonData.color;
      this.font = jsonData.font;
      this.isLoading = false;
      
      var body = document.body;
      body.style.fontFamily = this.font;
      
      
      //console.log(this.post);
    } catch (e) {
      // エラー時の処理
    }
    }
  },
  computed: {
    color() {
      return "var(--main-color)"; // カスタム変数を返す
    },
  },


  methods: {
    showSnackbar(text) {
      this.snackbarText = text;
      this.isShow = true;
    },
    hideSnackbar() {
      this.isShow = false;
    },
    async postRequest() {
      // headerを指定する
      const headers = {'Authorization': this.token};
      if(!this.post.text1 || !this.post.text2 || !this.post.text3) {
        this.showSnackbar("入力項目が足りていません。")
        return;
      }
      // リクエストボディを指定する
      const requestBody = {
        text1: this.post.text1,
        text2: this.post.text2,
        text3: this.post.text3,
        userId:this.post.userId
      };
      console.log(requestBody);

      try {
        /* global fetch */
        this.isLoading = true;
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
        this.isLoading = false;
        this.$router.push("/")
      } catch (e) {
        // エラー時の処理
      }
    }
  },
  
}
</script>

<style scoped>
.ui.input{
    border: 3px solid var(--main-color); /* 縁の色を赤に設定 */
    border-radius: 15px; /* 縁を丸くする半径の値を設定（10pxは例です） */
    overflow: hidden;  /*子要素をまるく*/
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5); /* ボックスシャドウを追加 */
  }
  

.custom-color {
    background-color: var(--main-color);
    color: white;
  }
  
  /* ボタンが押された状態のスタイル */
  .custom-color:active,
  .custom-color:hover,
  .custom-color:focus{
    background-color: var(--main-color);
    color: white;
  }
  
  /* h1要素のカスタムスタイル */
  .custom-h1 {
    font-size: 45px; /* 好みに応じて大きさを調整 */
    color: #333; /* 好みに応じて文字色を設定 */
    text-align: center; /* 好みに応じてテキストの位置を調整 */
    /*font-family: v-bind(font);*/
    margin-bottom: 40px;
    margin-top: 30px;
    font-weight: bold;
  }

  /* h1要素のカスタムスタイル */
  .custom-h2 {
    font-size: 36px; /* 好みに応じて大きさを調整 */
    color: #333; /* 好みに応じて文字色を設定 */
    margin-bottom: 30px;
    font-weight: bold;
  }
  
  .custom-textarea{
    font-size:33px;
  }
  
  .ui.custom.segment {
      background-color: #FFFFFF;
      border: 1px solid #FFFFFF; /* ボーダーラインの色を白色に設定 */
    }
  
.load {
    margin-top: 2rem;
  }
  
  .container {
    margin:1rem 0 3rem 0;
  }


</style>
