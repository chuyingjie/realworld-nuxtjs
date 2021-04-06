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
        headers: {
            Authorization: `Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTU1MzUxLCJ1c2VybmFtZSI6InRvYzEyMzQ1NiIsImV4cCI6MTYyMjg3NjkwMn0.iZ9h2NqFFUTT6NqbItl2pLqVeqEd5hOzorpwJJFQH4M`
        }
    });
}

