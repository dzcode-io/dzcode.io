module.exports = {
  bundles: {
    distFolder: "./firebase/public",
    publicPath: "/",
    publicResourcesPath: "w/",
  },
  apps: {
    main: {
      analytics: {
        facebook: "xxxxxxxxxxxxxxx",
        google: "UA-163554556-1",
      },
      plugins: {
        fbAppCode: "1468143526724404",
      },
    },
  },
};
