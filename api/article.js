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

