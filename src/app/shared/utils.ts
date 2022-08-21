export const getEntityId = (value: string): number =>  {
  //TODO refactor by regex
  const arr = value.split('/');
  return +arr[arr.length - 2];
}
