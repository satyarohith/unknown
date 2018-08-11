module.exports = {
  // loadDomains loads the domains of the user and returns an array of them.
  loadAvailableDomains: async (DoAPI, spinner) => {
    try {
      spinner.start('Loading your domains..');
      let data = await DoAPI.domainsGetAll();
      spinner.stop();
      if (data.body.meta.total > 0) {
        let availableDomains = [];
        data.body.domains.map(domain => {
          availableDomains.push(domain.name);
        });
        return availableDomains;
      } else {
        console.log("You don't have any domains!");
        process.exit();
      }
    } catch (error) {
      console.log(error);
    }
  },
  loadAvailableRegions: async (DoAPI, spinner) => {
    try {
      spinner.start('Loading available regions....');
      let data = await DoAPI.regionsGetAll();
      spinner.stop();
      let regions = [];
      data.body.regions.map(region => {
        if (region.available) {
          regions.push({
            name: region.name,
            value: region.slug
          });
        }
      });
      return regions;
    } catch (error) {
      console.error(error);
    }
  },
  loadAvailableDroplets: async (DoAPI, spinner) => {
    try {
      spinner.start('Loading your droplets...');
      let data = await DoAPI.dropletsGetAll();
      spinner.stop();
      let availableDroplets = [];
      if (data.body.meta.total > 0) {
        data.body.droplets.map(droplet => {
          availableDroplets.push({
            name: droplet.name,
            value: droplet.id
          });
        });
        return availableDroplets;
      } else {
        console.log(
          "You don't have any droplets! Please create droplet to proceed!"
        );
        process.exit();
      }
    } catch (error) {
      console.error(error);
    }
  },
  loadAvailableSizes: async (DoAPI, spinner) => {
    try {
      spinner.start('Loading available sizes...');
      let data = await DoAPI.sizesGetAll();
      spinner.stop();
      let availableSizes = [];
      data.body.sizes.map(size => {
        availableSizes.push({
          name: `${size.slug} - ${size.disk}GB - ${size.price_monthly}$/m`,
          value: size.slug
        });
      });
      return availableSizes;
    } catch (error) {
      console.error(error);
    }
  },
  loadAvailableImages: async (DoAPI, spinner) => {
    try {
      spinner.start('Loading available images...');
      let data = await DoAPI.imagesGetAll({
        type: 'distribution',
        per_page: 50
      });
      spinner.stop();
      let availableImages = [];
      data.body.images.map(image => {
        availableImages.push({
          name: `${image.distribution} ${image.name} - ${
            image.size_gigabytes
          }GB`,
          value: image.slug
        });
      });
      return availableImages;
    } catch (error) {
      console.error(error);
    }
  },
  loadAvailableSSHKEYS: async (DoAPI, spinner) => {
    try {
      spinner.start('Loading your ssh_keys...');
      let data = await DoAPI.accountGetKeys();
      spinner.stop();
      let availableSSHKEYS = [];
      if (data.body.meta.total > 0) {
        data.body.ssh_keys.map(ssh_key => {
          availableSSHKEYS.push({
            name: ssh_key.name,
            value: ssh_key.id
          });
        });
        return availableSSHKEYS;
      } else {
        console.log("You don't have any ssh_keys!");
        process.exit();
      }
    } catch (error) {
      console.error(error);
    }
  },
  loadAvailableFloatingIps: async (DoAPI, spinner) => {
    try {
      spinner.start('Loading your floating_ips...');
      let data = await DoAPI.floatingIpsGetAll();
      spinner.stop();
      let availableFIps = [];
      if (data.body.meta.total > 0) {
        data.body.floating_ips.map(fip => {
          availableFIps.push({
            name: `${fip.ip} assign to ${fip.droplet.name}`,
            value: fip.ip
          });
        });
        return availableFIps;
      } else {
        console.log("You don't have any floating_ips under your account");
        process.exit();
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  loadAvailableVolumes: async (DoAPI, spinner) => {
    try {
      spinner.start('Loading your volumes...');
      let data = await DoAPI.volumes();
      spinner.stop();
      let availableVolumes = [];
      if (data.body.meta.total > 0) {
        data.body.volumes.map(volume => {
          availableVolumes.push({
            name: volume.name,
            value: volume.id
          });
        });
        return availableVolumes;
      } else {
        console.log("You don't have any volumes under your account");
        process.exit();
      }
    } catch (error) {
      console.log(error.message);
    }
  }
};
