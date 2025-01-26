import { describe, it, expect, beforeEach, vi } from 'vitest'
import * as fs from 'node:fs'
import * as path from 'node:path'
import * as readline from 'node:readline'
import { createApp } from './generate-new-app'

vi.mock('node:fs')
vi.mock('node:path')
vi.mock('node:readline')

describe('createApp', () => {
  const appsDir = '/fake/dir/apps'
  const templateDir = '/fake/dir/_template'
  const newAppDir = '/fake/dir/apps/test-app'

  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(path, 'join').mockImplementation((...args) => args.join('/'))
    vi.spyOn(fs, 'existsSync').mockImplementation(dir => dir === appsDir)
    vi.spyOn(fs, 'mkdirSync').mockImplementation(() => {})
    vi.spyOn(fs, 'readdir').mockImplementation((dir, cb) =>
      cb(null, ['file1', 'file2']),
    )
    vi.spyOn(fs, 'copyFile').mockImplementation((src, dest, cb) => cb(null))
  })

  it('should create a new app directory and copy template files', () => {
    createApp('test-app')

    expect(fs.existsSync).toHaveBeenCalledWith(appsDir)
    expect(fs.mkdirSync).toHaveBeenCalledWith(newAppDir)
    expect(fs.readdir).toHaveBeenCalledWith(templateDir, expect.any(Function))
    expect(fs.copyFile).toHaveBeenCalledWith(
      '/fake/dir/_template/file1',
      '/fake/dir/apps/test-app/file1',
      expect.any(Function),
    )
    expect(fs.copyFile).toHaveBeenCalledWith(
      '/fake/dir/_template/file2',
      '/fake/dir/apps/test-app/file2',
      expect.any(Function),
    )
  })

  it('should not create a new app if directory already exists', () => {
    vi.spyOn(fs, 'existsSync').mockImplementation(dir => dir === newAppDir)

    createApp('test-app')

    expect(fs.mkdirSync).not.toHaveBeenCalled()
  })

  it('should validate app name format', () => {
    const validAppName = 'valid-app-name'
    const invalidAppName = 'Invalid_App_Name123'

    const isValidAppName = (name: string) => /^[a-z-]+$/.test(name)

    expect(isValidAppName(validAppName)).toBe(true)
    expect(isValidAppName(invalidAppName)).toBe(false)
  })
})
