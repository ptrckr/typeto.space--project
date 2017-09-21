class SceneController {
  constructor(saveState) {
    this.saveState = saveState

    this.gameScenes = ['launchScene', 'levelSelectionScene', 'levelScene']
    this.currentGameSceneId = this.saveState.current.currentGameSceneId || 0

    this.setSceneToId(this.currentGameSceneId)
  }

  setSceneToId(sceneId) {
    this.currentGameSceneId = sceneId
    document.body.dataset.state = this.gameScenes[sceneId]
  }

  setSceneOnLevelQuit() {
    this.setSceneToId(1)
  }
}