import * as core from '@actions/core'
import fs from 'fs'
import util from 'util'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const filePath: string = core.getInput('path')
    const readFile = util.promisify(fs.readFile)
    const contents = await readFile(filePath, 'utf8')
    core.info(`File contents:\n${contents}`)
    core.setOutput('contents', contents)
  } catch (error: unknown) {
    core.setFailed((error as Error).message)
  }
}
