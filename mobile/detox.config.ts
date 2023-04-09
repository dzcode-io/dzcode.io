/** @type {Detox.DetoxConfig} */
module.exports = {
  logger: {
    level: process.env.CI ? "debug" : undefined,
  },
  testRunner: {
    $0: "jest",
    args: {
      config: "src/_e2e-test/support/jest.config.js",
      _: ["src/_e2e-test"],
    },
  },
  artifacts: {
    plugins: {
      log: process.env.CI ? "failing" : undefined,
      screenshot: "failing",
    },
  },
  apps: {
    "ios.release": {
      type: "ios.app",
      build:
        "xcodebuild -workspace ios/eastestsexample.xcworkspace -scheme DzCodeio -configuration Release -sdk iphonesimulator -arch x86_64 -derivedDataPath ios/build",
      binaryPath: "ios/build/Build/Products/Release-iphonesimulator/DzCodeio.app",
    },
    "android.release": {
      type: "android.apk",
      build:
        "cd android && ./gradlew :app:assembleRelease :app:assembleAndroidTest -DtestBuildType=release && cd ..",
      binaryPath: "android/app/build/outputs/apk/release/app-release.apk",
    },
  },
  devices: {
    simulator: {
      type: "ios.simulator",
      device: {
        type: "iPhone 14",
      },
    },
    emulator: {
      type: "android.emulator",
      device: {
        avdName: "pixel_4",
      },
    },
  },
  configurations: {
    "ios.release": {
      device: "simulator",
      app: "ios.release",
    },
    "android.release": {
      device: "emulator",
      app: "android.release",
    },
  },
};
