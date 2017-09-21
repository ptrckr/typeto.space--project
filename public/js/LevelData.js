const LevelData = () => {
  let count = 40
  let colorSchemes = ['green', 'yellow', 'blue', 'red']
  let colorChangeEvery = count / colorSchemes.length

  return {
    length: () => count,
    getColorForLevelId: id => colorSchemes[Math.floor(id / colorChangeEvery)]
  }
}