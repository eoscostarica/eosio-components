export const parseFile = (file, callback, progress) => {
  const fileSize = file.size
  const chunkSize = 64 * 1024
  let offset = 0
  let chunkReaderBlock = null

  const readEventHandler = (evt) => {
    if (evt.target.error == null) {
      offset += evt.target.result.length
      progress((offset / fileSize) * 100)
      callback(evt.target.result)
    } else return callback(new Error('Ha ocurrido un error leyendo el archivo'))

    if (offset >= fileSize) return callback(true)

    chunkReaderBlock(offset, chunkSize, file)
  }

  chunkReaderBlock = (_offset, length, _file) => {
    const r = new FileReader()
    const blob = _file.slice(_offset, length + _offset)
    r.onload = readEventHandler
    r.readAsText(blob)
  }
  chunkReaderBlock(offset, chunkSize, file)
}
