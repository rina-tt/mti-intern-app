<template>
    <div  v-if="isLoading === true" class="text-center load">
      <v-progress-circular
        :size="70"
        :width="7"
        color="purple"
        indeterminate
      ></v-progress-circular>
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
    
    <div v-if="isLoading === false" class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <div class="ui segment">
        <p class="message">{{message}}</p>
        <form class="ui large form" @submit.prevent="submit()">
          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input  type="text" placeholder="ID" v-model="user.userId"  autofocus/>
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input type="text" placeholder="Password" v-model="user.password" />
            </div>
          </div>
          <div class="field" v-if="!isLogin">
            <div class="ui left icon input">
              <i class="tag icon"></i>
              <input type="text" placeholder="Nickname" v-model="user.nickname" />
            </div>
          </div>
          <button :disabled="buttonState" class="button ui fluid huge" type="submit">{{submitText}}</button>
        </form>
      </div>
      <button class="button ui huge grey fluid" type="submit" @click="toggleMode()" >{{toggleText}}</button>
    </div>
</template>

<script>
// 必要なものはここでインポートする
// @は/srcの同じ意味です
// import something from '@/components/something.vue';
import { baseUrl } from '@/assets/config.js';

export default {
  name: 'Login',


  data() {
    // Vue.jsで使う変数はここに記述する
    return {
      isLogin: true,
      user: {
        userId: null,
        password: null,
        nickname: null,
        color: null,
        font: null
      },
      message: "",
      isLoading: false,
      isShow: false,
      snackbarText: "",
    };
  },

  computed: {
    // 計算した結果を変数として利用したいときはここに記述する
    submitText() {
      return this.isLogin ? "ログイン" : "新規登録";
    },
    toggleText() {
      return this.isLogin ? "新規登録" : "ログイン";
    },
    buttonState() {
      if(this.isLogin) {
        const {userId, password,} = this.user;
        console.log("bool: ", userId, password)
        return !userId || !password ;
      }else {
        const {userId, password, nickname, color, font} = this.user;
        return !userId || !password || !nickname;
      }
    }
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
    toggleMode() {
      this.isLogin = !this.isLogin
      this.clearForm()
    },
    clearForm() {
      this.user = {
        userId: null,
        password: null,
        nickname: null,
        color: null,
        font: null
      }
    },
    async submit() {
      if(this.isLogin) {
        console.log("login");
        const requestBody = {
          userId: this.user.userId,
          password:this.user.password
        };
        
        if(!this.user.userId || !this.user.password) {
          this.showSnackbar("userIdとpasswordの両方を入力してください。");
          return;
        }

        try {
          /* global fetch */
          this.isLoading = true;
          const res = await fetch(baseUrl + '/user/login',  {
            method: 'POST',
            body: JSON.stringify(requestBody)
          });
  
          const text = await res.text();
          const jsonData = text ? JSON.parse(text) : {}
  
          // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
          if (!res.ok) {
            const errorMessage = jsonData.message ?? 'エラーメッセージがありません';
            throw new Error(errorMessage);
          }
          
          window.localStorage.setItem('token', jsonData.token);
          window.localStorage.setItem('userId', this.user.userId);
          
          this.isLoading = false;
          this.$router.push({name: 'Home'});
          
        } catch (e) {
          // エラー時の処理
          this.showSnackbar(e)
          this.isLoading = false;
          console.log("e: ", e)
        }
        return;
      }
      
      if(!this.user.userId || !this.user.password || !this.user.nickname) {
          this.showSnackbar("userIdとpasswordとnicknameすべてを入力してください。");
          return;
      }

      
      const requestBody = {
        userId: this.user.userId,
        password:this.user.password,
        nickname: this.user.nickname,
        color: this.user.color,
        font: this.user.font
      };
      
      try {
        /* global fetch */
        this.isLoading = true;
        const res = await fetch(baseUrl + '/user/signup',  {
          method: 'POST',
          body: JSON.stringify(requestBody)
        });

        const text = await res.text();
        const jsonData = text ? JSON.parse(text) : {}

        // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
        if (!res.ok) {
          const errorMessage = jsonData.message ?? 'エラーメッセージがありません';
          throw new Error(errorMessage);
        }
        this.isLoading = false;
        
        // 成功時の処理
        
        window.localStorage.setItem('token', jsonData.token);
        window.localStorage.setItem('userId', this.user.userId);
          
        this.$router.push({name: 'Home'});
      } catch (e) {
        // エラー時の処理
        this.isLoading = false;
        this.showSnackbar(e)
        console.log("e: ", e)
      }
    }
  },
}
</script>

<style scoped>
/* このコンポーネントだけに適用するCSSはここに記述する */
.button.ui.fluid.huge{
  background-color: var(--main-color);
}
.load {
  margin-top: 2rem;
}
</style>
