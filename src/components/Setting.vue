<template>
   <div>
    <div  v-if="isLoading === true" class="text-center">
      <v-progress-circular
        :size="70"
        :width="7"
        :color="color_pro"
        indeterminate
      ></v-progress-circular>
    </div>
    
    
    <div v-if="isLoading === false" class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      
      <div class="ui segment">

        <form class="ui large form" @submit.prevent="submit()">
          <div>ユーザーID</div>
          <div class="ui left icon input">
            <div>{{ userId }}</div>
          </div>
          
          <div>パスワード</div>
          <div class="field">
            <div id="brd" class="ui left icon input">
              <i class="lock icon"></i>
              <input type="password" placeholder="Password" v-model="password" minlength="5"/>
            </div>
          </div>
            
          <div>ニックネーム</div>
          <div class="field">
            <div class="ui left icon input">
              <i class="tag icon"></i>
              <input id="brd" type="text" placeholder="Nickname" v-model="nickname" />
            </div>
          </div>
          
          <div>色</div>
          <div class="field" :class="{ active: isActive }">
            <div class="ui left icon input">
              <select id="brd" class="ui_color" name="ui_color" v-model="color">
                <option value="#4dc4ff" style="color: #4dc4ff">水色</option>
                <option value="#04AF34" style="color: #04AF34">緑色</option>
                <option value="#FF6AE7" style="color: #FF6AE7">桃色</option>
                <option value="#FFA740" style="color: #FFA740">橙色</option>
              </select>
            </div>
          </div>
          
          <div>フォント</div>
          <div class="field">
            <div class="ui left icon input">
              <select id="brd" class="fontFamilys" name="fontFamily" v-model="font">
                <option value="BIZ UDMincho" style="font-family:BIZ UDMincho, serif">デフォルト</option>
                <option value="Meiryo" style="fontFamily:Meiryo">メイリオ</option>
                <option value="serif" style="font-family:serif">明朝体</option>
                <option value="monospace" style="font-family:monospace">等幅フォント</option>
                <option value="Yomogi" style="font-family:Yomogi">よもぎフォント</option>
                <option value="Kosugi Maru" style="font-family:Kosugi Maru">小杉丸フォント</option>
                <option value="Yusei Magic" style="font-family:Yusei Magic">油性マジックフォント</option>
                <!--<option value="yosugara" style="font-family:yosugara">夜すがら手書きフォント</option>-->
                <!--<option value="karakaze" style="font-family:karakaze">からかぜ手書きフォント</option>-->
                <!--<option value="yunafont" style="font-family:yunafont">ゆな手書きフォント</option>-->
                <!--<option value="Asobifont" style="font-family:Asobifont">遊びメモ書きフォント</option>-->
              </select>
            </div>
          </div>
          
          <button :disabled="buttonState"  id="color" class="button ui fluid huge" type="submit">更新</button>
        </form>
      </div>
      <button id="btn_color" class="button ui huge fluid" type="submit" @click="dialog=true" >退会</button>
    </div>
  </div>
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
         本当に退会しますか？
        </v-card-title>
        <v-card-text>一度退会すると、ユーザーデータが削除され、再ログインできなくなります。</v-card-text>
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
            :color="color_pro"
            text
            @click="deleteUser"
          >
            はい
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
// 必要なものはここでインポートする
// @は/srcの同じ意味です
// import something from '@/components/something.vue';
import {baseUrl} from '@/assets/config.js';
// import {CommonDialog} from '@/components/CommonDialog.vue';

export default {
  name: 'Setting',

  components: {
    // 読み込んだコンポーネント名をここに記述する
  },

  data() {
    // Vue.jsで使う変数はここに記述する
    return {
      userId: window.localStorage.getItem('userId'),
      password: null,
      nickname: null,
      color: window.localStorage.getItem('color'),
      font: window.localStorage.getItem('font'),
      token:  window.localStorage.getItem('token'),
      isLoading: false,
      isShow: false,
      snackbarText: "",
      dialog: false
    };
  },
  
  created: async function() {
    const token = window.localStorage.getItem('token')
    if(!token) {
      this.$router.push({name: 'Login'})
    }
    
    const headers = {'Authorization': this.token};
    
    try {
          /* global fetch */
      this.isLoading = true;
      const res = await fetch(baseUrl + `/user?userId=${this.userId}`,  {
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
      this.isLoading = false;
     this.password = jsonData.password;
     this.nickname = jsonData.nickname;
     this.color = jsonData.color;
     this.font = jsonData.font;
     
     var body = document.body;
     body.style.fontFamily = this.font;
     document.documentElement.style.setProperty('--main-color', this.color);
      
    } catch (e) {
      // エラー時の処理
      this.isLoading = false;
      console.log("e: ", e);
    }
  },

  computed: {
    // 計算した結果を変数として利用したいときはここに記述する
    buttonState() {
        return !this.userId|| !this.password || !this.nickname || !this.color || !this.font;
    },
    color_pro() {
      return "var(--main-color)"; // カスタム変数を返す
    },
  },

  methods: {
    // Vue.jsで使う関数はここで記述する
    showSnackbar(text) {
      this.snackbarText = text;
      this.isShow = true;
    },
    hideSnackbar() {
      this.isShow = false;
    },
    async submit() {
      // console.log(this.password)
      // console.log(this.color)
      // console.log(this.font)
      

      const headers = {'Authorization': this.token};
      
      const requestBody = {
        userId: this.userId,
        password: this.password,
        nickname: this.nickname,
        color: this.color,
        font: this.font,
      };
  
      try {
        /* global fetch */
        this.isLoading = true;
        const res = await fetch(baseUrl + '/user',  {
          method: 'PUT',
          body: JSON.stringify(requestBody),
          headers
        });
  
        const text = await res.text();
        const jsonData = text ? JSON.parse(text) : {}
        console.log(jsonData)
  
        // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
        if (!res.ok) {
          const errorMessage = jsonData.message ?? 'エラーメッセージがありません';
          throw new Error(errorMessage);
        }
        
        // 成功時の処理
        this.isLoading = false;
        this.showSnackbar( "更新に成功しました。");
        var body = document.body;
        body.style.fontFamily = this.font;
        document.documentElement.style.setProperty('--main-color', this.color);
       
        console.log(jsonData);
      } catch (e) {
        // エラー時の処理
        this.isLoading = false;
        this.showSnackbar(e);
        console.log("e: ", e)
      }
    },
    
    async deleteUser() {
      const headers = {'Authorization': this.token};
      this.dialog = false;
      
     
      try {
        /* global fetch */
        this.isLoading = true;
        const res = await fetch(baseUrl + `/user?userId=${this.userId}`,  {
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
       this.$router.push({name: 'Login'})
        console.log(jsonData);
      } catch (e) {
        // エ���ー時の処理
        this.isLoading = false;
        this.showSnackbar(e)
        console.log("e: ", e)
      }
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=BIZ+UDMincho&family=Kosugi+Maru&family=Shippori+Mincho:wght@400;600&family=Yomogi&family=Yusei+Magic&display=swap');
/* スタイルオプションを使ってスタイルを定義します */
.option{
  margin-left: 15px;
}
.button.ui.fluid {
  /*background-color: #4dc4ff;*/
  background-color: var(--main-color);
  color: #fff;
}
#btn_color{
  background-color: red;
  color: #fff;
}
#brd {
    /*border: 3px solid #4DC4FF;*/
    border: 3px solid var(--main-color);
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}

  .load {
    margin-top: 2rem;
  }
  
  .container {
    margin:1rem 0 3rem 0;
  }
</style>
