const path = require('path')
const fs = require('fs')
const Busboy = require('busboy')
const debug = require('debug')('blog-server:upload-img')

/**
 * 同步创建文件目录
 * @param  {string} dirname 目录绝对地址
 * @return {boolean}        创建目录结果
 */
const mkdirsSync = function (dirname) {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
}

/**
 * 获取上传文件的后缀名
 * @param  {string} fileName 获取上传文件的后缀名
 * @return {string}          文件后缀名
 */
const getSuffixName = function (fileName) {
  let nameList = fileName.split('.')
  return nameList[nameList.length - 1]
}

/**
 * 上传文件
 * @param  {object} ctx     koa上下文
 * @param  {object} options 文件上传参数 fileType文件类型， path文件存放路径
 * @return {Promise<any>}
 */
module.exports = async (ctx) => {
  let req = ctx.req
  let busboy = new Busboy({ headers: req.headers })

  const relativePath = 'blog-img/' + new Date().getFullYear() + (new Date().getMonth() + 1).toString().padStart(2, '0')
  let filePath = path.join('/ftpfile', relativePath)
  mkdirsSync(filePath)

  ctx.body = await new Promise((resolve, reject) => {
    debug('文件上传中...')
    let result = {
      success: false,
      message: '',
      data: null
    }

    // 解析请求文件事件
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      const date = new Date()
      const theFileName = (date.getMonth() + 1).toString().padStart(2, '0') +
        date.getDate() +
        date.getHours().toString().padStart(2, '0') +
        date.getMinutes() +
        date.getSeconds().toString().padStart(2, '0') +
        date.getMilliseconds() + ''
      let fileName = theFileName + '.' + getSuffixName(filename)
      let _uploadFilePath = path.join(filePath, fileName)
      let saveTo = path.join(_uploadFilePath)

      // 文件保存到指定路径
      file.pipe(fs.createWriteStream(saveTo))

      // 文件写入事件结束
      file.on('end', () => {
        result.success = true
        result.message = '文件上传成功'
        result.data = {
          pictureUrl: `https://img.${ctx.host}/${relativePath}/${fileName}`
        }
        debug('文件上传成功...')
        resolve(result)
      })
    })

    // 解析结束事件
    busboy.on('finish', () => {
      debug('文件上传结束...')
      resolve(result)
    })

    // 解析错误事件
    busboy.on('error', () => {
      debug('文件上传出错...')
      reject(result)
    })

    req.pipe(busboy)
  })
}
