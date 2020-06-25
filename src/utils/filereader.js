export function parseFile(file, callback, progress) {
  var fileSize = file.size
  var chunkSize = 64 * 1024
  var offset = 0
  var chunkReaderBlock = null

  var readEventHandler = function (evt) {
    if (evt.target.error == null) {
      offset += evt.target.result.length
      progress((offset / fileSize) * 100)
      callback(evt.target.result)
    } else {
      console.log('Read error: ' + evt.target.error)
      return
    }
    if (offset >= fileSize) {
      console.log('Done reading file')
      return
    }
    chunkReaderBlock(offset, chunkSize, file)
  }

  chunkReaderBlock = function (_offset, length, _file) {
    var r = new FileReader()
    var blob = _file.slice(_offset, length + _offset)
    r.onload = readEventHandler
    r.readAsText(blob)
  }
  chunkReaderBlock(offset, chunkSize, file)
}
