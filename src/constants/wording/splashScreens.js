import AccommodationIcon from '@/assets/splash/accommodation.png'
import ActivitiesIcon from '@/assets/splash/activities.png'
import DestinationIcon from '@/assets/splash/destination.png'
import TransportationIcon from '@/assets/splash/transportation.png'

export const splashScreens = {
  destination: {
    type: 'destination',
    tagline: 'Choisis ta destination !',
    image: DestinationIcon,
  },
  transportation: {
    type: 'transportation',
    tagline: 'Achète ton billet !',
    image: TransportationIcon,
  },
  accommodation: {
    type: 'accommodation',
    tagline: 'Réserve ton logement !',
    image: AccommodationIcon,
  },
  activities: {
    type: 'activities',
    tagline: 'Organise tes activités !',
    image: ActivitiesIcon,
  },
}
