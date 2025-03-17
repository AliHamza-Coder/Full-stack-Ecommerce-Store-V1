// src/index.ts
var StorageManager = class {
  drivers = /* @__PURE__ */ new Map();
  locations = /* @__PURE__ */ new Map();
  registerDriver(name, driver) {
    this.drivers.set(name, driver);
  }
  registerLocation(name, config) {
    const driverName = config.driver;
    const Driver = this.drivers.get(driverName);
    if (!Driver) {
      throw new Error(`Driver "${driverName}" isn't registered.`);
    }
    this.locations.set(name, new Driver(config.options));
  }
  location(name) {
    const driver = this.locations.get(name);
    if (!driver) {
      throw new Error(`Location "${name}" doesn't exist.`);
    }
    return driver;
  }
};
function supportsTus(driver) {
  return "tusExtensions" in driver;
}
export {
  StorageManager,
  supportsTus
};
