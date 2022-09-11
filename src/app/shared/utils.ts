export const getEntityId = (value: string): number =>  {
  const re = /\d+/;
  return +value.match(re)!;
}
