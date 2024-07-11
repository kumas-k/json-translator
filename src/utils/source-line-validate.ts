export function sourceLineValidate(line: string) {
  return /"([^"]+)":(s+)?"?([^,{"]+)./.test(line)
}
