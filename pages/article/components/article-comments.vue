<template>
  <div class="row">
    <div class="col-xs-12 col-md-8 offset-md-2">
      <div class="card comment-form">
        <div class="card-block">
          <textarea
            class="form-control"
            placeholder="Write a comment..."
            rows="3"
            v-model="inputComment"
          ></textarea>
        </div>
        <div class="card-footer">
          <img :src="user.image" class="comment-author-img" />
          <button
            class="btn btn-sm btn-primary"
            @click="onAddComment"
            :disabled="addCommentDisabled"
          >
            Post Comment
          </button>
        </div>
      </div>

      <div class="card" v-for="comment in comments" :key="comment.id">
        <div class="card-block">
          <p class="card-text">{{ comment.body }}</p>
        </div>
        <div class="card-footer">
          <a href="" class="comment-author">
            <img :src="comment.author.image" class="comment-author-img" />
          </a>
          &nbsp;
          <a href="" class="comment-author">{{ comment.author.username }}</a>
          <span class="date-posted">{{
            comment.createAt | date("MMM DD, YYYY")
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleComments, addArticleComments } from "@/api/article";
export default {
  name: "articleComments",
  props: {
    article: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      comments: [],
      inputComment: "",
      addCommentDisabled: false,
    };
  },
  mounted() {
    this.getComments();
  },
  computed: {
    user: function () {
      return this.$store.state.user;
    },
  },
  methods: {
    async getComments() {
      const { data } = await getArticleComments(this.article.slug);
      this.comments = data.comments;
    },
    async onAddComment() {
      this.addCommentDisabled = true;
      await addArticleComments(this.article.slug, {
        comment: {
          body: this.inputComment,
        },
      }).catch((err) => alert);
      await this.getComments();
      this.addCommentDisabled = false;
      this.inputComment = "";
    },
  },
};
</script>

<style>
</style>