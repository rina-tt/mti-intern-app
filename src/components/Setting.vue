<template>
   <div>
     
    <div v-if="isLoading" class="ui segment">
      <div class="ui active dimmer">
        <div class="ui text loader">Loading</div>
      </div>
    </div>
    
    
    <div v-if="!isLoading" class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      
      <div class="ui segment">
        <p class="message">{{message}}</p>
        <form class="ui large form" @submit.prevent="submit()">
          <div>ユーザーID</div>
          <div class="ui left icon input">
            <div>{{ userId }}</div>
          </div>
            
          <div>ニックネーム</div>
          <div class="field">
            <div class="ui left icon input">
              <i class="tag icon"></i>
              <input id="brd" type="text" placeholder="Nickname" v-model="nickname" />
            </div>
          </div>
          
          <div>色</div>
          <div class="field">
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
            <div class="ui left icon input" style="max-height: 200px; overflow-y: auto;">
              <select id="brd" class="fontFamilys" name="fontFamily" v-model="font">
                <option value="BIZUDGothic" style="font-family:BIZUDGothic">デフォルト</option>
                <option value="Meiryo" style="fontFamily:Meiryo">メイリオ</option>
                <option value="serif" style="font-family:serif">明朝体</option>
                <!--<option value="sans-serif" style="font-family:sans-serif">ゴシック体</option>-->
                <option value="monospace" style="font-family:monospace">等幅フォント</option>
                <!--<option value="fantasy" style="font-family:fantasy">装飾的フォント</option>-->
                <option value="yomogi" style="font-family:yomogi">よもぎフォント</option>
                <option value="kosugi" style="font-family:kosugi">小杉丸フォント</option>
                <option value="yusei" style="font-family:yusei">油性マジックフォント</option>
                <!--<option value="yosugara" style="font-family:yosugara">夜すがら手書きフォント</option>-->
                <!--<option value="karakaze" style="font-family:karakaze">からかぜ手書きフォント</option>-->
                <!--<option value="yunafont" style="font-family:yunafont">ゆな手書きフォント</option>-->
                <option value="Asobifont" style="font-family:Asobifont">遊びメモ書きフォント</option>
              </select>
            </div>
          </div>
          
          <button :disabled="buttonState"  id="color" class="button ui fluid huge" type="submit">更新</button>
        </form>
      </div>
      <button class="button ui huge grey fluid" type="submit" @click="deleteUser" >退会</button>
      <!--<CommonDialog primaryText="aaa" secondaryText="bbb" onClickFunc="() => console.log('aaa')" ></CommonDialog>  />-->
    </div>
  </div>
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
      nickname: null,
      color: '#4dc4ff',
      font: '',
      message: "",
      token:  window.localStorage.getItem('token'),
      isLoading: false
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
     this.nickname = jsonData.nickname;
     this.color = jsonData.color;
     this.font = jsonData.font;
      
    } catch (e) {
      // エラー時の処理
      this.isLoading = false;
      console.log("e: ", e);
    }
  },

  computed: {
    // 計算した結果を変数として利用したいときはここに記述する
    buttonState() {
        return !this.userId || !this.nickname || !this.color || !this.font;
    },
    computedStyles() {
      return {
        backgroundColor: this.color,
        borderColor: this.color,
      };
    },
    
  },
  

  methods: {
    // Vue.jsで使う関数はここで記述する
    async submit() {
      // console.log(this.nickname)
      // console.log(this.color)
      // console.log(this.font)
      
      this.message = "";
      const headers = {'Authorization': this.token};
      
      const requestBody = {
        userId: this.userId,
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
  
        // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
        if (!res.ok) {
          const errorMessage = jsonData.message ?? 'エラーメッセージがありません';
          throw new Error(errorMessage);
        }
        
        // 成功時の処理
        this.isLoading = false;
        this.message = "更新に成功しました。";
        var body = document.body;
        body.style.fontFamily = this.font;
        // body.style.backgroundColor = this.color;
        document.documentElement.style.setProperty('--main-color', this.color);
       
        console.log(jsonData);
      } catch (e) {
        // エラー時の処理
        this.isLoading = false;
        this.message = e;
        console.log("e: ", e)
      }
    },
    
    async deleteUser() {
      const headers = {'Authorization': this.token};
      
     
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
        // エラー時の処理
        this.isLoading = false;
        this.message = e;
        console.log("e: ", e)
      }
    },
  },
}
</script>

<style scoped>
/* スタイルオプションを使ってスタイルを定義します */
.option{
  margin-left: 15px;
}
.button.ui.fluid {
  /*background-color: #4dc4ff;*/
  background-color: var(--main-color);
}
#brd {
    /*border: 3px solid #4DC4FF;*/
    border: 3px solid var(--main-color);
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}
</style>
