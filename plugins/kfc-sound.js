export default (context, inject) => {
  /* 音声をロード */
  const sndClick = new Audio("/pi.mp3")
  const sndSubmit = new Audio("/submit.mp3")
  const sndFaul = new Audio("/faul.mp3")
  const voiceWelcome = new Audio("/01.mp3")
  const voiceBoxOpen = new Audio("/03.mp3")
  const voiceThanks = new Audio("/04.mp3")
  sndClick.load()
  sndSubmit.load()
  sndFaul.load()
  voiceWelcome.load()
  voiceBoxOpen.load()
  voiceThanks.load()

  /* 音声再生関数を用意 */
  function playClick() { sndClick.cloneNode(true).play() }
  function playSubmit() { sndSubmit.cloneNode(true).play() }
  function playFaul() { sndFaul.cloneNode(true).play() }
  function playWelcome() { voiceWelcome.cloneNode(true).play() }
  function playBoxOpen() { voiceBoxOpen.cloneNode(true).play() }
  function playThanks() { voiceThanks.cloneNode(true).play() }

  /* ページからthis.$sound.playClick()などで再生できるようにする */
  inject('sound', {
    playClick,
    playSubmit,
    playFaul,
    playWelcome,
    playBoxOpen,
    playThanks,
  })
}
