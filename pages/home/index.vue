<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link disabled" href="">Your Feed</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="">Global Feed</a>
              </li>
            </ul>
          </div>

          <div
            v-for="article in articles"
            class="article-preview"
            :key="article.slug"
          >
            <div class="article-meta">
              <nuxt-link
                :to="{
                  name: 'profile',
                  params: {
                    userName: article.author.username,
                  },
                }"
                ><img :src="article.author.image"
              /></nuxt-link>
              <div class="info">
                <nuxt-link
                  class="info"
                  :to="{
                    name: 'profile',
                    params: {
                      userName: article.author.username,
                    },
                  }"
                  >{{ article.author.username }}</nuxt-link
                >
                <span class="date">{{ article.createdAt }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{
                  active: article.favorited,
                }"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              :to="{
                name: 'article',
                params: {
                  slug: article.slug,
                },
              }"
              class="preview-link"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.body }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>

          <nav>
            <ul class="pagination">
              <!-- ngRepeat: pageNumber in $ctrl.pageRange($ctrl.totalPages) -->
              <li
                v-for="item in totalPage"
                :key="item"
                class="page-item"
                :class="{
                  active: item == page,
                }"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    query: {
                      page: item,
                    },
                  }"
                  >{{ item }}</nuxt-link
                >
              </li>
            </ul>
          </nav>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                v-for="item in tags"
                :key="item"
                :to="{
                  query: {
                    page,
                    tag: item,
                  },
                }"
                class="tag-pill tag-default"
                >{{ item }}</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles } from "@/api/article";
import { getTag } from "@/api/tag";
export default {
  name: "Home",
  async asyncData({ query }) {
    const page = Number(query.page) || 1;
    const limit = 5;

    const [articleRes, tagRes] = await Promise.all([
      getArticles({
        limit,
        offset: (page - 1) * limit,
      }),
      getTag(),
    ]);

    const { articles, articlesCount } = articleRes.data,
      { tags } = tagRes.data;

    return {
      articles,
      articlesCount,
      limit,
      page,
      tags,
    };
  },
  data() {
    return {
      articles: [],
    };
  },
  computed: {
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    },
  },
  watchQuery: ["page"],
};
</script>

<style>
</style>