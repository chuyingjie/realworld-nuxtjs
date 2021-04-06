import { request } from '@/plugins/request'

export const getTag = () => {
  return request({
      method: "GET",
      url: "/api/tags",
  });
}