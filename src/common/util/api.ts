import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL

const addQueryStringParams = (route: string, queryStringParams: QueryStringParam[]) => {
  if (queryStringParams.length === 0) {
    return route
  }

  const queryString = queryStringParams
    .map((param) => `${param.key}=${param.value}`)
    .join("&")

  return `${route}?${queryString}`
}

export type QueryStringParam = {
  key: string
  value: string
}

export default {
  async get<T>(route: string, queryStringParams: QueryStringParam[] = []): Promise<T> {
    const path = `${API_BASE_URL}${addQueryStringParams(route, queryStringParams)}`
    const { data } = await axios.get(path)

    return data
  }
}
