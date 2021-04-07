import { request } from '@/plugins/request'

export const getArticles = params => {
    return request({
        method: "GET",
        url: "/api/articles",
        params
    });
}

export const getFeedArticles = params => {
    return request({
        method: "GET",
        url: "/api/articles/feed",
        params,
    });
}


export const addFavoriteArticle = slug => {
    return request({
        method: "POST",
        url: `/api/articles/${slug}/favorite`,
    });
}

export const deleteFavoriteArticle = slug => {
    return request({
        method: "DELETE",
        url: `/api/articles/${slug}/favorite`,
    });
}

export const getArticle = slug => {
    return request({
        method: "GET",
        url: `/api/articles/${slug}`,
    });
}

export const getArticleComments = slug => {
    return request({
        method: "GET",
        url: `/api/articles/${slug}/comments`,
    });
}

export const addArticleComments = (slug, data) => {
    return request({
        method: "POST",
        url: `/api/articles/${slug}/comments`,
        data
    });
}
