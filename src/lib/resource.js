// insertUpdate (state: List, id: String, resource: Object) => List
export function insertUpdate (list, id, resource) {
  const index = list.findIndex((res) => res.get('id') === id);
  if (index === -1) {
    return list.push(resource);
  }
  return list.mergeDeepIn([ index ], resource);
}
