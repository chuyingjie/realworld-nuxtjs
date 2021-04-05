import request from '@/utils/request'

export const getTag = () => {
  return request({
      method: "GET",
      url: "/api/tags",
  });
}