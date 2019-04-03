const exec = require('child_process').execFile
const fs = require('fs')
const path = require('path')

async function git(args) {
  return new Promise(function (resolve, reject) {
    exec('git', args, function (error, stdout, stderr) {
      process.stderr.write(stderr)
      if (error) return reject(error)
      resolve(stdout)
    })
  })
}

git.RemoteExists = async function RemoteExists(remote) {
  return git(['remote'])
    .then((remotes) => remotes.split('\n'))
    .then((remotes) => remotes.find((r) => r === remote))
}
git.RemoteCreate =  async function createRemote(remote, url) {
  return git.RemoteExists(remote)
    .then((exists) => !exists ? git(['remote', 'add', remote, url]) : null)
}
git.RemoteList = async function ListRemotes() {
  return git(['remote', '-v'])
    .then((remotes) => remotes.trim().split('\n').map((r) => r.split(/\s/)))
}

git.SubtreePush = async function SubtreePush(prefix, remote, branch, force = false) {
  if (force) {
    let remoteBranch = remote+'-tmp'
    try {
      let subtreeHash = await git.SubtreeCreateBranch(path.relative('.', prefix), remoteBranch)
      let gitSubtree = await git.bumpCommit(remoteBranch)
      let push = await git.SubtreeForcePush(remote, remoteBranch, branch)
      
    } catch (err) {
      console.log('Failed to push '+prefix+': '+err)
    } finally {
      let result = await git.SubtreeDeleteBranch(remoteBranch)
      console.log(result)
    }
  } else {
    return git(['subtree', 'push', '--prefix', path.relative('.', prefix), remote, branch])
  }
}

git.SubtreeCreateBranch = async function SubtreeCreateBranch(prefix, branch) {
  return git(['subtree', 'split', '--prefix', prefix, '-b', branch])
}

git.SubtreeDeleteBranch = async function SubtreeDeleteBranch(branch) {
  return git(['branch', '-D', branch])
}

git.bumpCommit = async function(branch){
  let lastBranch = git(["rev-parse", "--abbrev-ref", "HEAD"])
  git(["checkout", branch])
  let date = new Date()
  let commitHash = git(['commit', '--allow-empty', '-m', `"${date.getTime()}"`])
  git(["checkout", lastBranch])
  return commitHash

}

git.SubtreeForcePush = async function SubtreeForcePush(remote, localBranch, remoteBranch) {
  return git(['push', '-f', -'m', remote, localBranch+':'+remoteBranch])
}

git.inGitRepo = async function inGitRepo() {
  try {
    fs.lstatSync('.git')
    return true
  } catch (err) {
    if (err.code !== 'ENOENT') throw err
  }
}

git.RemoveRemote = async function RemoteRemove(remote) {
  return git(['remote', 'rm', remote])
}

module.exports = git
