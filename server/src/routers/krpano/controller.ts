import { BIN_DIR_PATH, STATIC_DIR_PATH } from '@server/config/paths';
import { carryShell } from '@server/utils';
import { krpanoLogger } from '@server/utils/log';

export async function runKrpano(
  fileName: string,
  configFileName: string = 'vtour-multires-simple.config'
) {
  const originImgPath = `${STATIC_DIR_PATH}/krpano/${fileName}`;
  // 生成全景图
  try {
    krpanoLogger.info(
      `Start generate pano image, panoId: ${fileName}, use config: ${configFileName}`
    );
    await carryShell(
      `./krpanotools makepano -config=templates/${configFileName} ${originImgPath}`,
      {
        cwd: BIN_DIR_PATH,
      }
    );
    krpanoLogger.info(`Generate pano image success, panoId: ${fileName}`);
  } catch (e) {
    krpanoLogger.error(e);
  }
}

type JsonXmlValue = Record<string, any>;

export function injectXmlData(jsonXml: JsonXmlValue, panoId: string) {
  const krpanoData: JsonXmlValue = jsonXml?.krpano;
  // 替换 preview url
  if (krpanoData?.preview) {
    const previewUrl = krpanoData.preview['@_url'];
    krpanoData.preview['@_url'] = `/krpano/assets/${panoId}/${previewUrl}`;
  }

  // 替换 cube url
  if (krpanoData?.image?.cube) {
    const cubeUrl = krpanoData.image.cube['@_url'];
    krpanoData.image.cube['@_url'] = `/krpano/assets/${panoId}/${cubeUrl}`;
  }

  // 替换 cylinder url
  if (krpanoData?.image?.cylinder) {
    const sphereUrl = krpanoData.image.cylinder['@_url'];
    krpanoData.image.cylinder[
      '@_url'
    ] = `/krpano/assets/${panoId}/${sphereUrl}`;
  }

  // 注入新的 view 标签
  krpanoData.view = {
    '@_hlookat': '0.0',
    '@_vlookat': '0.0',
    '@_fovtype': 'MFOV',
    '@_fov': '120',
    '@_fovmin': '70',
    '@_fovmax': '140',
    '@_maxpixelzoom': '2.0',
    '@_limitview': 'auto',
  };

  return jsonXml;
}
