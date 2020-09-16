import _ from "lodash";
export function paginate(items, pagenumber, pagesize) {
  const startindex = (pagenumber - 1) * pagesize;
  return _(items).slice(startindex).take(pagesize).value();
}
