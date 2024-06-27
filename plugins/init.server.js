export default defineNuxtPlugin(async (nuxtApp) => {
  const globalStore = useGlobalStore()

  const { data, error } = await useFetch('/api/fetchLayout', {
    key: 'layout'
  })
  if (error.value) {
    throw createError({
      ...error.value, statusMessage: 'Error while fetching data.' + error.value, fatal: true
    })
  }
  if (!data.value?.primary || !data.value?.secondary || !data.value?.footerPrimary || !data.value?.footerSock || !data.value?.globalSets) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Layout Data not found',
      fatal: true
    })
  }
  globalStore.header.primary = data.value.primary
  globalStore.header.secondary = data.value.secondary
  globalStore.footerPrimary.nodes = data.value.footerPrimary
  globalStore.footerSock.nodes = data.value.footerSock

  const globalData = removeEmpties(data.value?.globalSets || [])
  // console.log("remove empties: " + JSON.stringify(globalData))
  // Shape data from Craft
  const craftData = Object.fromEntries(
    globalData?.map(item => [item.handle, item])
  )
  globalStore.globals = craftData
})
