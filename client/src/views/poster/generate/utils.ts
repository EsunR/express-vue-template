import { MOCK_SHOP_DATA } from './config';
import {
  ControllerFormData,
  CoreDataSchema,
  PosterSchema,
  ShopDataSchema,
} from './types';

export function generateSchema(
  dataSet: typeof MOCK_SHOP_DATA,
  formData: Partial<ControllerFormData>
) {
  const result: PosterSchema = [];
  // 生成店铺数据
  if (formData?.shopData?.length) {
    const subDataSet: ShopDataSchema['props']['dataSet'] = {
      shopName: dataSet.shopName,
    };
    formData.shopData.forEach((item) => {
      switch (item) {
        case 'shopStar':
          subDataSet.shopStar = dataSet.shopStar;
          break;
        case 'shopScore':
          subDataSet.shopScore = dataSet.shopScore;
          break;
        case 'productCount':
          subDataSet.productCount = dataSet.productCount;
          break;
        case 'fiveStarProductCount':
          subDataSet.fiveStarProductCount = dataSet.fiveStarProductCount;
          break;
      }
    });
    result.push({
      name: 'ShopData',
      props: {
        displayField: formData.shopData,
        dataSet: subDataSet,
      },
    } as ShopDataSchema);
  }

  // 生成核心指标
  if (formData?.coreData?.length) {
    const subDataSet: CoreDataSchema['props']['dataSet'] = {};
    formData.coreData.forEach((item) => {
      switch (item) {
        case 'totalExposure':
          subDataSet.totalExposure = dataSet.totalExposure;
          subDataSet.exposureData = dataSet.exposureData;
          break;
        case 'totalClick':
          subDataSet.totalClick = dataSet.totalClick;
          subDataSet.clickData = dataSet.clickData;
          break;
        case 'totalVisitor':
          subDataSet.totalVisitor = dataSet.totalVisitor;
          subDataSet.visitorData = dataSet.visitorData;
          break;
        case 'totalClue':
          subDataSet.totalClue = dataSet.totalClue;
          subDataSet.clueData = dataSet.clueData;
          break;
      }
    });
    result.push({
      name: 'CoreData',
      props: {
        displayField: formData.coreData,
        dataSet: subDataSet,
      },
    } as CoreDataSchema);
  }

  // 运营位
  if (formData?.adData) {
    result.push({
      name: 'AdBanner',
      props: {
        display: formData.adData,
        dataSet: dataSet.ads,
      },
    });
  }
  return result;
}
