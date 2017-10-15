const KEY_ITEM_IDS = "itemIds";
const KEY_LAST_ITEM_ID = "lastItemId";
const KEY_ITEM_PREFIX = "item_";
const KEY_TITLE_PREFIX = "item_title_";

function _removeElement(array, element) {
  var i = array.indexOf(element);
  if(i != -1) {
  	array.splice(i, 1);
  }
  return array;
}

function getNewItemId() {
  const lastItemId = localStorage.getItem(KEY_LAST_ITEM_ID);
  if (!lastItemId) {
    return 1;
  }
  return parseInt(lastItemId) + 1;
}

function saveDiagram(id, text) {
  localStorage.setItem(KEY_ITEM_PREFIX + id, text);
  let itemIds = localStorage.getItem(KEY_ITEM_IDS);
  if (!itemIds) {
    itemIds = [];
  } else {
    itemIds = itemIds.split(",");
  }
  itemIds = _removeElement(itemIds, id.toString());
  itemIds.push(id);
  localStorage.setItem(KEY_ITEM_IDS, itemIds.join(","));
}

function setLastItemId(id) {
  localStorage.setItem(KEY_LAST_ITEM_ID, id);
}

// Returns array of diagram (id, title, content)
function getDiagrams() {
  let itemIds = localStorage.getItem(KEY_ITEM_IDS);
  if (!itemIds) {
    return [];
  }
  var result = [];
  itemIds = itemIds.split(",");
  for (var i = itemIds.length - 1; i >= 0; i--) {
    const id = itemIds[i];
    result.push({id: id,
      title: localStorage.getItem(KEY_TITLE_PREFIX + id),
      content: localStorage.getItem(KEY_ITEM_PREFIX + id)});
  }
  return result;
}
