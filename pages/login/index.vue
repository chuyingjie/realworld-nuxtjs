<template>
  <div class="auth-page">
    <div class="container page">
      <div v-if="isLogin" @click="goBack" class="goBack">Go Back</div>
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? "Sign in" : "Sign up" }}</h1>
          <p class="text-xs-center">
            <!-- <a href="">Have an account?</a> -->
            <nuxt-link v-if="isLogin" to="/register"
              >Need an account?</nuxt-link
            >
            <nuxt-link v-else to="/login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(messages, filed) in errors">
              <li v-for="(msg, index) in messages" :key="filed + index">
                {{ filed }} {{ msg }}
              </li>
            </template>
            <!-- <li>That email is already taken</li> -->
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group" v-if="!isLogin">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                v-model="user.username"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                v-model="user.email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="user.password"
                required
                minlength="8"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? "Sign in" : "Sign up" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from "@/api/user";

const Cookie = process.client ? require('js-cookie') : undefined
export default {
  middleware: "notAuthenticated",
  name: "login",
  computed: {
    isLogin() {
      return this.$route.name === "login";
    },
  },
  data() {
    return {
      user: {
        email: "tochuyingjie@126.com",
        password: "12345678",
        username: "",
      },
      errors: {},
    };
  },
  methods: {
    async onSubmit() {
      const fn = this.isLogin ? login : register;

      const { data } = await fn({
        user: this.user,
      }).catch((err) => {
        const res = err.response;
        this.errors = res.data.errors;
        return res;
      });

      this.$store.commit('setUser', data.user)
      Cookie.set('user', data.user)

      this.$router.push('/')
    },
    goBack() {
      this.$router.go(-1)
    }
  },
};
</script>

<style>
.goBack {
  width: 80px;
  cursor: pointer;
  position: absolute;
  top: 40px;
  right: 20px;
  border: solid 1px gray;
  border-radius: 3px;
  text-align: center;
}
</style>