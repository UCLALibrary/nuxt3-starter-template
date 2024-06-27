// GQL
const query = `
  query Layout {
    secondary: nodes(navHandle: "secondaryMenu", level: 1) {
        id
        name: title
        to: url
        classes
        target: newWindow
    }
    primary: nodes(navHandle: "primaryMenu", level: 1) {
        id
        name: title
        to: url
        classes
        target: newWindow
        children {
            id
            name: title
            to: url
            classes
            target: newWindow
        }
    }
    globalSets {
        dataId: id
        handle

        ... on askALibrarian_GlobalSet {
            askALibrarianTitle: titleGeneral
            askALibrarianText: summary
            buttonUrl {
                buttonText
                buttonUrl
            }
        }

        ... on libraryAlert_GlobalSet {
            title: entryTitle
            text: richTextAlertBox
        }
    }
    footerPrimary: nodes(navHandle: "footerPrimary", level: 1) {
        id
        name: title
        to: url
        classes
        target: newWindow
        children {
            id
            name: title
            to: url
            classes
            target: newWindow
        }
    }
    footerSock: nodes(navHandle: "footerSockLinks") {
       id
      name: title
      to: url
      classes
      target: newWindow
    }
}

`
export default defineEventHandler(async (event) => {
  const endpoint = useRuntimeConfig().public.craftGraphqlURL

  // const keys = await useStorage().getKeys()
  const hasItem = await useStorage().hasItem('nuxtStarter:layout')
  console.log('Server api storage key exists:' + hasItem)
  let layoutData = await useStorage().getItem('nuxtStarter:layout')
  if (!layoutData) {
    const { data } = await $fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query })
    })
    await useStorage().setItem('nuxtStarter:layout', data)
    layoutData = data
    console.log('Server api Global Data object first set and then get:' + JSON.stringify(layoutData))
    return layoutData
  } else {
    return layoutData
  }
})
