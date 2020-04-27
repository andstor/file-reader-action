import * as core from '@actions/core'
import fs from 'fs'
import util from 'util'

async function run(): Promise<void> {
  try {
    const filePath = core.getInput('path')
    const encoding = core.getInput('encoding')
    const readFile = util.promisify(fs.readFile)
    const contents = await readFile(filePath, encoding)
    core.info(`File contents:\n${contents}`)
    core.setOutput('contents', contents)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
