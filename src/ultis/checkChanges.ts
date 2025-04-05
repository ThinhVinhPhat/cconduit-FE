function checkChanges(data: any, data2: any) {
  return JSON.stringify(data) !== JSON.stringify(data2);
}

export default checkChanges;
