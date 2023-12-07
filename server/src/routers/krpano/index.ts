import { STATIC_DIR_PATH } from '@server/config/paths';
import { checkDirExist } from '@server/utils';
import { Router } from 'express';
import { UploadedFile } from 'express-fileupload';
import { v4 as uuidV4 } from 'uuid';
import { injectXmlData, runKrpano } from './controller';
import fs from 'fs';
import path from 'path';
import sizeOf from 'image-size';
import { XMLParser, XMLBuilder } from 'fast-xml-parser';

const krpanoRouter = Router();

krpanoRouter.post('/krpano/upload', async (req, res) => {
  // 获取 form-data 中的文件
  const file = req.files?.file as UploadedFile;
  if (!file) {
    throw new Error('400-请上传文件');
  }
  const ext = file.name.split('.').pop();
  if (!['jpg', 'jpeg', 'png'].includes(ext)) {
    throw new Error('400-不支持的文件格式');
  }
  // 保存文件
  const panoId = uuidV4();
  const fileName = `${panoId}.${ext}`;
  checkDirExist(`${STATIC_DIR_PATH}/krpano`);
  const tmpFilePath = `${STATIC_DIR_PATH}/krpano/${fileName}`;
  await file.mv(tmpFilePath);
  // node 判断图片尺寸
  const size = sizeOf(tmpFilePath);
  let panoType = 'cylinder';
  if (size.width / size.height >= 1.99 && size.width / size.height <= 2.01) {
    panoType = 'sphere';
  }
  runKrpano(fileName, `${panoType}.config`);
  res.json({
    data: { panoId, fileName, panoType },
  });
});

const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
});

const xmlBuilder = new XMLBuilder({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
});

krpanoRouter.get('/krpano/xml/:panoId', async (req, res) => {
  const { panoId } = req.params;
  const panoPath = `${STATIC_DIR_PATH}/krpano/assets/${panoId}`;
  const isExists = fs.existsSync(panoPath);
  if (!isExists) {
    throw new Error('404-全景图不存在或尚未生成');
  }
  const originXML = fs.readFileSync(
    path.resolve(panoPath, 'tour.xml'),
    'utf-8'
  );

  // 解析原始 xml
  const jsonObj = xmlParser.parse(originXML);
  // 注入 xml 数据
  const injectedXml = injectXmlData(jsonObj, panoId);
  // 重新生成 xml
  const xml = xmlBuilder.build(injectedXml);

  res.set('Content-Type', 'text/xml');
  res.send(xml);
});

export default krpanoRouter;
