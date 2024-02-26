export interface ControllerFormData {
  coreData: ('totalExposure' | 'totalClick' | 'totalVisitor' | 'totalClue')[];
  shopData: (
    | 'shopStar'
    | 'shopScore'
    | 'productCount'
    | 'fiveStarProductCount'
  )[];
  adData: boolean;
}

export interface ShopDataProps {
  displayField: ControllerFormData['shopData'];
  dataSet: {
    shopName?: string;
    shopStar?: number;
    shopScore?: number;
    productCount?: number;
    fiveStarProductCount?: number;
  };
}

export interface CoreDataProps {
  displayField: ControllerFormData['coreData'];
  dataSet: {
    totalExposure?: number;
    exposureData?: { date: string; value: number }[];
    totalClick?: number;
    clickData?: { date: string; value: number }[];
    totalVisitor?: number;
    visitorData?: { date: string; value: number }[];
    totalClue?: number;
    clueData?: { date: string; value: number }[];
  };
}

export interface AdBannerProps {
  display: boolean;
  dataSet: { title: string; link: string }[];
}

export interface ShopDataSchema {
  name: 'ShopData';
  props: ShopDataProps;
}

export interface CoreDataSchema {
  name: 'CoreData';
  props: CoreDataProps;
}

export interface AdBannerSchema {
  name: 'AdBanner';
  props: AdBannerProps;
}

export type PosterSchema = (ShopDataSchema | CoreDataSchema | AdBannerSchema)[];
