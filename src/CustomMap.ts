import faker from 'faker';

interface Mappable {
  location: {
    lat: number;
    lng: number;
  };
  markerContent(): string;
}

export class CustomMap {
  private googleMap: google.maps.Map;

  constructor(divId: string) {
    this.googleMap = new google.maps.Map(document.getElementById(divId), {
      zoom: 1,
      center: {
        lat: 0,
        lng: 0,
      },
    });
  }

  addMarker(mappable: Mappable): void {
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: this.validateCoords(),
    });
    marker.addListener('click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: mappable.markerContent(),
      });

      infoWindow.open(this.googleMap, marker);
    });
  }

  validateCoords() {
    let lat = parseFloat(faker.address.latitude());
    let lng = parseFloat(faker.address.longitude());
    if (lat < -85 || lat > 85) {
      if (lat > -85) {
        lat = -85;
      } else {
        lat = 85;
      }
    }
    if (lng < -180 || lng > 180) {
      if (lng > -180) {
        lng = -180;
      } else {
        lng = 180;
      }
    }
    return {
      lat,
      lng,
    };
  }
}
