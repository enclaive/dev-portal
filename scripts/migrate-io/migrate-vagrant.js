const fs = require('fs')
const util = require('util')
const path = require('path')
const exec = util.promisify(require('child_process').exec)
const {
  addGlobalStyles,
  addProxyLayout,
  editFile,
  evalDataFile,
  patchSubnav,
  setupDocsRoute,
  setupProductMigration,
  setupIoLayout,
} = require('./_shared')

migrateVagrantIo()

async function migrateVagrantIo() {
  const slug = 'vagrant'
  //
  // SETUP
  //
  // set up the source direction (cloned product repository)
  // and the destination directories (all within this project's source)
  const { repoDirs, destDirs } = await setupProductMigration(slug)
  console.log({ repoDirs, destDirs })
}
