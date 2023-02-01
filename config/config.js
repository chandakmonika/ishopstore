const completeConfig = {
  default: {
    title: "IShop",
    localStorageAuthKey: "ishop-auth",
  },
  development: {
    appUrl: process.env.NEXT_PUBLIC_API_URL,
    imageUrl: process.env.NEXT_PUBLIC_API_IMAGE_URL,
    googleAnalyticsId: null,
  },
  production: {
    appUrl: process.env.NEXT_PUBLIC_API_URL,
    imageUrl: process.env.NEXT_PUBLIC_API_IMAGE_URL,
  },
};

const env = process.env.NODE_ENV;

export const config = {
  ...completeConfig.default,
  ...completeConfig[env], // based on node env differentiate between development and prod config
};
