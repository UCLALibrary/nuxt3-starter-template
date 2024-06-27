<script setup>

const { enabled, state } = usePreviewMode()

const globalStore = useGlobalStore()

const { data, error } = await useFetch('/api/fetchLayout')
globalStore.header.primary = data.value.primary
globalStore.header.secondary = data.value.secondary
globalStore.footerPrimary.nodes = data.value.footerPrimary
globalStore.footerSock.nodes = data.value.footerSock
if (data.value) {
  const globalData = removeEmpties(data.value?.globalSets || [])
  // console.log("remove empties: " + JSON.stringify(globalData))
  // Shape data from Craft
  const craftData = Object.fromEntries(
    globalData?.map(item => [item.handle, item])
  )
  globalStore.globals = craftData
}

</script>
<template>
  <div>
    <NuxtLoadingIndicator
      color="#ffe800"
      height="3"
    />
    <vue-skip-to
      to="#main"
      label="Skip to main content"
    />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
