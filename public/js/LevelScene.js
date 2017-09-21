class LevelScene {
  constructor(SceneController) {
    this.SceneController = SceneController
    this.levelSceneNode = document.querySelector('.levelScene')
  }

  createLevelWithId(id, cb) {
    this.levelSceneNode.querySelector('.levelContainer').setAttribute('data-levelid', id)
    Level.initLevelOnDomNode(this.levelSceneNode, cb)
  }
}