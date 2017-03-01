export const SWITCH_LOADER = 'SWITCH_LOADER'

export const switchLoader = (payload) => {
  return {
    type: SWITCH_LOADER,
    payload
  }
}