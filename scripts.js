/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "duckduckgo"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"jaWEdN25gtxmRYgN","label":"reddit","bookmarks":[{"id":"KChrMYqJSyg52Q2J","label":"r/startpages","url":"https://www.reddit.com/r/startpages/"},{"id":"ozxjnl1YrRybZMRs","label":"r/typescript","url":"https://www.reddit.com/r/typescript/"},{"id":"wVSUjvSQAvxjks82","label":"r/reactjs","url":"https://www.reddit.com/r/reactjs/"}]},{"id":"L1bk6GxI0wv4muRn","label":"design tools","bookmarks":[{"id":"lABI684wjFShhp1T","label":"pixlrx","url":"https://pixlr.com/x/"},{"id":"uC4pquabZEfGnVeB","label":"image enlarger","url":"https://bigjpg.com/en"},{"id":"1RJokJp6hdPrpBhX","label":"haikei","url":"https://app.haikei.app/"},{"id":"F3nO6UkjgIGXmeqv","label":"css gradients","url":"https://larsenwork.com/easing-gradients/"}]},{"id":"i9yUOyHqGdnt4OsS","label":"worth reading","bookmarks":[{"id":"UnB5D9W2LU94BWD8","label":"happy hues","url":"https://www.happyhues.co/"},{"id":"C1vxiegm6Ar3epDt","label":"styled-components","url":"https://www.joshwcomeau.com/react/demystifying-styled-components/"},{"id":"fjXGQqSCe7gc6Kcr","label":"react docs","url":"https://reactjs.org/docs/getting-started.html"}]},{"id":"7N3o94JC1E8HZ6Rz","label":"sources","bookmarks":[{"id":"6waCipnvf9BSjYAm","label":"icons","url":"https://feathericons.com/"},{"id":"tMNarzJpyN980NoR","label":"gif","url":"https://designyoutrust.com/2019/05/the-chill-and-retro-motion-pixel-art-of-motocross-saito/"},{"id":"PkDpfHiUIO98MDpp","label":"@startpage","url":"https://prettycoffee.github.io/startpage"},{"id":"xmbUQ7QVPlDtB4fb","label":"author","url":"https://prettycoffee.github.io/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
