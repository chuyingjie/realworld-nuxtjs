<template>
  <div class="article-meta">
    <a href=""><img :src="author.image" /></a>
    <div class="info">
      <a href="" class="author">{{ author.username }}</a>
      <span class="date">{{ article.createdAt | date("MMM DD, YYYY") }}</span>
    </div>
    <button
      class="btn btn-sm btn-outline-primary"
      :class="{
        active: author.following,
      }"
      @click="onFollowClick"
      :disabled="followDisabled"
    >
      <i class="ion-plus-round"></i> &nbsp; {{ author.following ? "Unfollow" : "Follow"}} Eric Simons
    </button>
    &nbsp;&nbsp;
    <button
      class="btn btn-sm btn-outline-primary"
      :class="{
        active: article.favorited,
      }"
      @click="onFavoriteClick"
      :disabled="favoriteDisabled"
    >
      <i class="ion-heart"></i> &nbsp;
      {{ article.favorited ? "Unfavorite" : "Favorite" }} Article
      <span class="counter">({{ article.favoritesCount }})</span>
    </button>
  </div>
</template>

<script>
import { addFavoriteArticle, deleteFavoriteArticle } from "@/api/article";
import { followUser, unfollowUser } from "@/api/user";
export default {
  name: "ArticleMeta",
  props: {
    article: {
      type: Object,
      require: true,
    },
  },
  computed: {
    author: function () {
      return this.article.author;
    },
  },
  data() {
    return {
      favoriteDisabled: false,
      followDisabled: false,
    };
  },
  mounted() {
    console.log("article--------", this.article);
  },
  methods: {
    async onFavoriteClick() {
      let article = this.article;
      this.favoriteDisabled = true;
      if (article.favorited) {
        await deleteFavoriteArticle(article.slug);
        article.favoritesCount -= 1;
        article.favorited = false;
      } else {
        await addFavoriteArticle(article.slug);
        article.favoritesCount += 1;
        article.favorited = true;
      }
      this.favoriteDisabled = false;
    },
    async onFollowClick() {
      let author = this.article.author;
      this.followDisabled = true;
      if (author.following) {
        await unfollowUser(author.username);
        author.following = false;
      } else {
        await followUser(author.username);
        author.following = true;
      }
      this.followDisabled = false;
    },
  },
};
</script>

<style>
</style>