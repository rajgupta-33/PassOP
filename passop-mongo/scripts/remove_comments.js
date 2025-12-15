const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const exts = ['.js', '.jsx', '.css', '.html', '.md']
const changedFiles = []

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name)
    const stat = fs.statSync(full)
    if (stat.isDirectory()) {
      if (name === 'node_modules' || name === '.git') continue
      walk(full)
    } else {
      const ext = path.extname(name).toLowerCase()
      if (exts.includes(ext)) {
        stripCommentsFromFile(full)
      }
    }
  }
}

function stripCommentsFromFile(file) {
  let src = fs.readFileSync(file, 'utf8')
  let out = src
  out = out.replace(/^\s*\/\/.*$/gm, '')
  out = out.replace(/^\s*\/\*[\s\S]*?\*\/\s*$/gm, '')
  out = out.replace(/^\s*<!--([\s\S]*?)-->\s*$/gm, '')
  out = out.replace(/\n{3,}/g, '\n\n')

  if (out !== src) {
    fs.writeFileSync(file, out, 'utf8')
    changedFiles.push(path.relative(ROOT, file))
  }
}

walk(ROOT)

if (changedFiles.length === 0) {
  console.log('No files changed (no comment-only lines found).')
} else {
  console.log('Removed comment-only lines from files:')
  for (const f of changedFiles) console.log(' -', f)
}
