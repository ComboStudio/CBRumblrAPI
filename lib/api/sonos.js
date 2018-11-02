import {DeviceDiscovery} from 'sonos';

export const sonosPlayURI = uri => {
  DeviceDiscovery(device => {
    device.play(uri);
  });
}
