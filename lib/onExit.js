module.exports = fn => {
  let manualExit = false
  const doExit = makeExitHandler(true)

  process.on(`exit`, makeExitHandler())
  process.on(`SIGINT`, doExit)
  process.on(`uncaughtException`, e => {
    // eslint-disable-next-line no-console
    console.error(e)
    doExit()
  })

  // https://github.com/remy/nodemon#controlling-shutdown-of-your-script
  process.once(`SIGUSR2`, () => {
    fn()
    process.kill(process.pid, `SIGUSR2`)
  })

  function makeExitHandler(exit) {
    return () => {
      if (!manualExit) {
        process.stdout.write(`\n`)
        fn()
      }

      if (exit) {
        manualExit = true
        process.exit()
      }
    }
  }
}
