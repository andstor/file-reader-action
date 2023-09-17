/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * These should be run as if the action was called from a workflow.
 * Specifically, the inputs listed in `action.yml` should be set as environment
 * variables following the pattern `INPUT_<INPUT_NAME>`.
 */

import * as core from '@actions/core'
import * as main from '../src/main'

// Mock the GitHub Actions core library
const infoMock = jest.spyOn(core, 'info')
const getInputMock = jest.spyOn(core, 'getInput')
const setFailedMock = jest.spyOn(core, 'setFailed')
const setOutputMock = jest.spyOn(core, 'setOutput')

// Mock the action's main function
const runMock = jest.spyOn(main, 'run')

// The expected content of file sample.txt
const expectedContent = 'Sample text file for tests'
const expectedError = 'ENOENT: no such file or directory, open .+?'

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('sets the path output', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation((name: string): string => {
      if (name === 'path') return 'sample.txt'
      else return ''
    })

    await main.run()
    expect(runMock).toHaveReturned()

    // Verify that all of the core library functions were called correctly
    expect(infoMock).toHaveBeenNthCalledWith(
      1,
      `File contents:\n${expectedContent}`
    )
    expect(setOutputMock).toHaveBeenNthCalledWith(
      1,
      'contents',
      expectedContent
    )
  })

  it('sets a failed status', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation((name: string): string => {
      if (name === 'path') return 'README.notfound'
      else return ''
    })

    await main.run()
    expect(runMock).toHaveReturned()

    // Verify that all of the core library functions were called correctly
    expect(setFailedMock).toHaveBeenNthCalledWith(
      1,
      expect.stringMatching(expectedError)
    )
  })
})
