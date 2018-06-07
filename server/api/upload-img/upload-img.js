// const inspect = require('util').inspect
const path = require('path')
// const os = require('os')
const fs = require('fs')
const Busboy = require('busboy')
// const md5 = require('md5')

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
const uploadImg = async (ctx, next) => {
  let req = ctx.req
  // let res = ctx.res
  let busboy = new Busboy({ headers: req.headers })

  let filePath = path.join('/ftpfile', 'image')
  mkdirsSync(filePath)

  ctx.body = await new Promise((resolve, reject) => {
    // console.log('文件上传中...')
    let result = {
      success: false,
      message: '',
      data: null
    }

    // 解析请求文件事件
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      let fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename)
      let _uploadFilePath = path.join(filePath, fileName)
      let saveTo = path.join(_uploadFilePath)

      // 文件保存到指定路径
      file.pipe(fs.createWriteStream(saveTo))

      // 文件写入事件结束
      file.on('end', () => {
        result.success = true
        result.message = '文件上传成功'
        result.data = {
          pictureUrl: `https://img.${ctx.host}/image/${fileName}`
        }
        // console.log('文件上传成功！')
        resolve(result)
      })
    })

    // 解析结束事件
    busboy.on('finish', () => {
      // console.log('文件上结束')
      resolve(result)
    })

    // 解析错误事件
    busboy.on('error', () => {
      // console.log('文件上出错: ' + err)
      reject(result)
    })

    req.pipe(busboy)
  })
}

module.exports = {
  uploadImg
}
