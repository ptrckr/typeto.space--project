class LevelSelectionScene {
  constructor(SceneController) {
    this.SceneController = SceneController
    this.LevelScene = new LevelScene(SceneController)
    this.levelSelectionNode = document.querySelector('.levelSelectionScene')

    this.count = 40
    this.colorSchemes = ['green', 'yellow', 'blue', 'red']

    this.currentLevelId = 0

    this.currentLevelIdNode = null
    this.levelSelectionListNode = null

    this.addListener()
    this.buildNodeTree()
  }

  addListener() {
    document.body.addEventListener('keydown', e => {
      e.preventDefault()

      if (e.key.length === 1 || e.key === 'Escape' || e.key === 'Enter')
        this.handleEvent(e.key)
    }, false)
  }

  handleEvent(key) {
    if (this.SceneController.currentGameSceneId !== 1) return

    if (key === 'j' && this.currentLevelId + 1 < this.count) {
      this.changeLevelIdTo(this.currentLevelId + 1)
    } else if (key === 'f' && this.currentLevelId > 0) {
      this.changeLevelIdTo(this.currentLevelId - 1)
    } else if (key === 't') {
      document.querySelectorAll('.keyboardShortcuts').forEach(x => x.classList.toggle('hidden'))
    } else if (key === ' ') {
      this.playCurrentLevel()
    } else if (key === 'Escape') {
      this.SceneController.setSceneToId(0)
    }
  }

  changeLevelIdTo(levelId) {
    this.levelSelectionListNode.children[this.currentLevelId].classList.remove('activeLevel')
    this.currentLevelId = levelId
    this.levelSelectionListNode.style.marginLeft = `-${levelId * 360 + levelId * 30}px`
    this.levelSelectionListNode.children[this.currentLevelId].classList.add('activeLevel')
    this.currentLevelIdNode.innerText = `Level ${this.currentLevelId + 1}`
  }

  buildNodeTree() {
    const levelSelectionWrapper = document.createElement('div')
    const currentLevelId = document.createElement('h2')
    const currentLevelIdText = document.createTextNode(`Level ${this.currentLevelId + 1}`)
    const levelSelectionList = document.createElement('ol')

    levelSelectionWrapper.setAttribute('class', 'levelSelectionWrapper')
    currentLevelId.setAttribute('class', 'currentLevelId')
    levelSelectionList.setAttribute('class', 'levelSelectionList')

    currentLevelId.appendChild(currentLevelIdText)
    levelSelectionWrapper.appendChild(currentLevelId)
    levelSelectionWrapper.appendChild(levelSelectionList)

    for(let i = 0; i < this.count; i++) {
      const li = document.createElement('li')
      const div = document.createElement('div')
      const span = document.createElement('span')
      const spanText = document.createTextNode('No time.')

      if (this.currentLevelId === i) li.setAttribute('class', 'activeLevel')
      div.setAttribute('class', 'levelStatusIndicator')
      span.setAttribute('class', 'title')

      li.appendChild(div)
      span.appendChild(spanText)
      li.appendChild(span)

      levelSelectionList.appendChild(li)
    }

    document.querySelector('.levelSelectionScene').appendChild(levelSelectionWrapper)

    this.currentLevelIdNode = currentLevelId
    this.levelSelectionListNode = levelSelectionList
  }

  playCurrentLevel() {
    this.SceneController.setSceneToId(2)
    this.LevelScene.createLevelWithId(this.currentLevelId, (err, level) => {
      level.onQuit = this.SceneController.setSceneOnLevelQuit.bind(this.SceneController)
    })
  }

  getColorForLevelId(levelId) {
    return this.colorSchemes[Math.floor(levelId / (this.count / this.colorSchemes.length))]
  }
}