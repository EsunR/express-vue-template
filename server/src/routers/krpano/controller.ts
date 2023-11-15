import { BIN_DIR_PATH, STATIC_DIR_PATH } from '@server/config/paths';
import { carryShell } from '@server/utils';
import { krpanoLogger } from '@server/utils/log';

export async function runKrpano(fileName: string) {
  const originImgPath = `${STATIC_DIR_PATH}/krpano/${fileName}`;
  // 生成全景图
  try {
    krpanoLogger.info(`Start generate pano image, panoId: ${fileName}`);
    await carryShell(
      `./krpanotools makepano -config=templates/vtour-multires-simple.config ${originImgPath}`,
      {
        cwd: BIN_DIR_PATH,
      }
    );
    krpanoLogger.info(`Generate pano image success, panoId: ${fileName}`);
  } catch (e) {
    krpanoLogger.error(e);
  }
}
