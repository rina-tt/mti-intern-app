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
            <button @click="putRequest()" class="ui  massive fluid button custom-color" type="submit">編集</button>
        </div><!--field-->
      </div><!--ui segment-->
      <div class="ui  custom segment">
        <div class="field">
            <button @click="dialog = true" class="ui  massive fluid button red" type="submit">削除</button>
        </div><!--field-->
      </div>
    
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
    <v-dialog
      v-model="dialog"
      max-width="320"
    >
      <v-card>
        <v-card-title class="text-h5">
         日記を削除しますか？
        </v-card-title>
        <v-card-text>一度削除すると、日記データが削除され、閲覧できなくなります。</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            text
            @click="dialog = false"
          >
            いいえ
          </v-btn>
          <v-btn
            :color="color"
            text
            @click="deleteRequest()"
          >
            はい
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
 
</template>

<script>
import {baseUrl} from '@/assets/config.js';

export default {
  name: 'UpdateDiary',

  components: {
 
  },

  data() {
    return {
     post:{
        text1:null,
        text2:null,
        text3:null,
        userId:window.localStorage.getItem('userId'),
        timestamp:null
      },
      user:{
        userId:window.localStorage.getItem('userId'),
        color:window.localStorage.getItem('color'),
        font:window.localStorage.getItem('font')
      },
      errorMessage: null,
      token: window.localStorage.getItem('token'),
      isLoading: false,
      isShow: false,
      snackbarText: "",
      dialog: false
    };
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
    async putRequest() {
      // headerを指定する
      const headers = {'Authorization': this.token};
      
      const { userId, text1, text2, text3, timestamp } = this.post;
      
      if( !text1 || !text2 || !text3 ) {
        this.showSnackbar("入力項目が足りません。")
        return;
      }
      
      // リクエストボディを指定する
      const requestBody = {
        text1,
        text2,
        text3,
        userId,
        timestamp
      };
      console.log(requestBody);

      try {
        // 日記を編集
        this.isLoading = true;
        const res = await fetch(baseUrl + '/article',  {
          method: 'PUT',
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
        this.isLoading = false;
        this.$router.push('/');
        // 成功時の処理
        console.log(jsonData);
      } catch (e) {
        // エラー時の処理
        console.log("e: ", e)
      }
    },
    async deleteRequest(){
      // 削除時の動作
      // headerを指定する
      this.dialog = false;
      const headers = {'Authorization': this.token};

      try {
        // global fetch 
        this.isLoading = true;
        const res = await fetch(baseUrl + `/article?userId=${this.post.userId}&timestamp=${this.post.timestamp}`,  {
          method: 'DELETE',
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
        this.isLoading = false;
        this.$router.push('/');
      } catch (e) {
        // エラー時の処理
      }
    }
  },
  // ページを開いた時の動作
  created: async function() {
    // headerを指定する
    if(!this.token) {
      this.$router.push({name: 'Login'})
    }
    console.log("index: ", window.localStorage.getItem("pageIndex"))
    this.post.timestamp = parseInt(this.$route.query.timestamp);
    const headers = {'Authorization': this.token};

    try {
      /* global fetch */
      this.isLoading = true;
      const res = await fetch(baseUrl + `/article?userId=${this.post.userId}&timestamp=${this.post.timestamp}`,  {
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
      this.post.text1 = jsonData.text1;
      this.post.text2 = jsonData.text2;
      this.post.text3 = jsonData.text3;
      this.isLoading = false;
      //console.log(this.post);
      
      res = await fetch(baseUrl + `/user?userId=${this.user.userId}`,  {
        method: 'GET',
        headers
      });
      
      text = await res.text();
      jsonData = text ? JSON.parse(text) : {}
      
      // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
      if (!res.ok) {
        const errorMessage = jsonData.message ?? 'エラーメッセージがありません';
        throw new Error(errorMessage);
      }
      
      this.color = jsonData.color;
      this.font = jsonData.font;
      this.isLoading = false;
      
      var body = document.body;
      body.style.fontFamily = this.font;
      
      
      
      
      
      
      
    } catch (e) {
      // エラー時の処理
    }
  }
  
}
</script>

<style scoped>
.ui.input{
    border: 3px solid var(--main-color, #4dc4ff); /* 縁の色を赤に設定 */
    border-radius: 15px; /* 縁を丸くする半径の値を設定（10pxは例です） */
    overflow: hidden;  /*子要素をまるく*/
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5); /* ボックスシャドウを追加 */
  }
  

.custom-color {
    background-color: var(--main-color, #4dc4ff);
    color: white;
  }
  
  /* ボタンが押された状態のスタイル */
  .custom-color:active,
  .custom-color:hover,
  .custom-color:focus{
    background-color: var(--main-color, #4dc4ff);
    color: white;
  }
  
  /* h1要素のカスタムスタイル */
  .custom-h1 {
    font-size: 45px; /* 好みに応じて大きさを調整 */
    color: #333; /* 好みに応じて文字色を設定 */
    text-align: center; /* 好みに応じてテキストの位置を調整 */
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



</style>
