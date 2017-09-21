class Typeto {
  constructor() {
    this.saveState = new SaveState()
    this.SceneController = new SceneController(this.saveState)
    this.LaunchScene = new LaunchScene(this.SceneController)
    this.LevelSelectionScene = new LevelSelectionScene(this.SceneController)
  }
}

class LaunchScene {
  constructor(SceneController) {
    this.SceneController = SceneController
    this.launchSceneNode = document.querySelector('.launchScene')

    Level.initLevelOnDomNode(this.launchSceneNode, (err, level) => {
      if (!err) level.onQuit = this.SceneController.setSceneOnLevelQuit.bind(this.SceneController)
    })
  }
}

class SaveState {
  constructor() {
    this.current = {
      currentGameSceneId: 0
    }
  
    this.load()
  }

  load() {
    const save = localStorage.getItem('typeToSaveState')

    if (save) {
      try {
        save = JSON.parse(save)
        this.current = save
      } catch(e) {
        localStorage.setItem('typeToSaveState', JSON.stringify(this.current))
      }
    }
  }
}

const gameInstance = new Typeto()
