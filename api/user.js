import { request } from '@/plugins/request'

export const login = data => {
    return request({
        method: "POST",
        url: "/api/users/login",
        data
    });
}

export const register = data => {
    return request({
        method: "POST",
        url: "/api/users",
        data
    });
}

export const followUser = username => {
    return request({
        method: "POST",
        url: `/api/profiles/${username}/follow`,
    });
}

export const unfollowUser = username => {
    return request({
        method: "DELETE",
        url: `/api/profiles/${username}/follow`,
    });
}