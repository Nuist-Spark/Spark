function saveToLocal(id, key, value) {
  let seller = window.localStorage.__spark__
  if (!seller) {
    seller = {}
    seller[id] = {}
  } else {
    seller = JSON.parse(seller)
    if (!seller[id]) {
      seller[id] = {}
    }
  }
  seller[id][key] = value
  window.localStorage.__spark__ = JSON.stringify(seller)
}

function loadFromLocal(id, key, def) {
  let seller = window.localStorage.__spark__
  if (!seller) {
    return def
  }
  seller = JSON.parse(seller)[id]
  if (!seller) {
    return def
  }
  let ret = seller[key]
  return ret || def
}

export { saveToLocal, loadFromLocal }
