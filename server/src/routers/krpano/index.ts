import { STATIC_DIR_PATH } from '@server/config/paths';
import { checkDirExist } from '@server/utils';
import { Router } from 'express';
import { UploadedFile } from 'express-fileupload';
import { v4 as uuidV4 } from 'uuid';
import { runKrpano } from './controller';
import fs from 'fs';
import path from 'path';

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
  await file.mv(`${STATIC_DIR_PATH}/krpano/${fileName}`);
  runKrpano(fileName);
  res.json({
    data: { panoId, fileName },
  });
});

krpanoRouter.get('/krpano/xml/:panoId', async (req, res) => {
  const { panoId } = req.params;
  const panoPath = `${STATIC_DIR_PATH}/krpano/assets/${panoId}`;
  const isExists = fs.existsSync(panoPath);
  if (!isExists) {
    throw new Error('404-全景图不存在或尚未生成');
  }
  const tourTemplatePath = path.resolve(__dirname, './tourTemplate.xml');
  const templateContent = fs.readFileSync(tourTemplatePath, 'utf-8');
  const xml = templateContent.replace(/\[PANOID\]/g, panoId);
  res.set('Content-Type', 'text/xml');
  res.send(xml);
});

export default krpanoRouter;
