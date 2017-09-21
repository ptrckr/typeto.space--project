class Level {
  constructor(parentNode, data) {
    this.keySize = 60
    this.keyPadding = 10

    this.parentNode = parentNode

    this.keyIndex = 0
    this.keys
    this.levelNode
    this.keyNodes

    this.onQuit = null

    this.levelNode = this.buildNodeTree(data)
    this.keyNodes = this.levelNode.childNodes
    this.keys = this.buildKeys(data)

    this.ball = document.createElement('div')
    this.ball.setAttribute('class', 'ball')
    this.ball.setAttribute('style', 'top: 0; left: 0;')
    parentNode.appendChild(this.ball)

    this.addListener()
    this.renderAt(this.parentNode)
  }

  static initLevelOnDomNode(parentNode, cb) {
    let levelId
    
    if (!parentNode) return
    if (!parentNode.classList.contains('levelContainer') && (parentNode = parentNode.querySelector('.levelContainer')) === null) {
      return
    }

    if (!(levelId = parentNode.getAttribute('data-levelid'))) return

    Level.loadLevelDataWithId(levelId, (err, data) => {
      if (!err) {
        cb(null, new Level(parentNode, data))
      } else {
        cb(`Leveldata for id 「${levelId}」could not be fetched.`, null)
      }
    })
  }

  static loadLevelDataWithId(levelId, cb) {
    Http.get(`/level/${levelId}`, (err, levelData) => {
      if (!err) {
        cb(null, levelData)
      }
    })
  }

  buildNodeTree(data) {
    const ol = document.createElement('ol')
    ol.setAttribute('class', 'keys')

    data.forEach((x, i) => {
      const [left, top, char] = x

      const li = document.createElement('li')
      li.setAttribute('style',
        `left: ${left * (this.keySize + this.keyPadding)}px;` +
        `top: ${top * (this.keySize + this.keyPadding)}px;`
      )
      li.setAttribute('data-x', left)
      li.setAttribute('data-y', top)

      if (i === 0)
        li.setAttribute('class', 'currentKey')

      if (i === data.length - 1) {
        const goal = document.createElement('div')
        goal.setAttribute('class', 'goal')
        li.appendChild(goal)
      }

      if (char) {
        const liText = document.createTextNode(char)
        li.appendChild(liText)
      }

      ol.appendChild(li)
    })

    return ol
  }

  buildKeys(data) {
    let keys = []

    data.forEach(x => {
      let char = x[2]

      keys.push(char ? char : ' ')
    })

    return keys
  }

  addListener() {
    document.body.addEventListener('keydown', e => {
      e.preventDefault()

      if (e.key.length === 1)
        this.handleEvent(e.key)
    }, false)
  }

  handleEvent(key) {
    if (this.keyIndex + 1 === this.keyNodes.length - 1) this.quit()
    if (key === this.peekNextKey()) this.increaseKeyIndexBy(1)
  }

  increaseKeyIndexBy(amount) {
    this.keyNodes[this.keyIndex].classList.remove('currentKey')
    
    this.keyIndex = this.keyIndex + amount
    this.keyNodes[this.keyIndex].classList.add('currentKey')

    const x = this.keyNodes[this.keyIndex].getAttribute('data-x')
    const y = this.keyNodes[this.keyIndex].getAttribute('data-y')

    this.levelNode.setAttribute('style',
      `left: ${-x  * (this.keySize + this.keyPadding)}px;` +
      `top: ${-y * (this.keySize + this.keyPadding)}px;`
    )
  }

  peekNextKey() {
    if (this.keyIndex + 1 in this.keys) {
      return this.keys[this.keyIndex + 1]
    } else {
      return false
    }
  }

  quit() {
    this.parentNode.classList.add('finished')

    setTimeout(() => {
      if (typeof this.onQuit === 'function') this.onQuit()
    }, 800 /* .goal::before transition */)

    setTimeout(() => {
      this.parentNode.removeChild(this.levelNode)
      this.parentNode.removeChild(this.ball)
      this.parentNode.classList.remove('finished')
    }, 1600)
  }

  renderAt(node) {
    node.appendChild(this.levelNode)
  }
}
