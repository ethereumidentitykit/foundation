export const formatQueryParams = (inputs: Record<string, string | number | string[] | null | undefined>) =>
  Object.entries(inputs)
    .filter(([, value]) => !!value)
    .map(([param, value]) => {
      if (Array.isArray(value)) {
        return `${param}=${value.join(',')}`
      }

      return `${param}=${value}`
    })
    .join('&')
// [
