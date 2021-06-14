import { AppState } from '../AppState'
import Advert from '../models/Advert'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AdvertsService {
  async getAdverts() {
    const res = await api.get('api/ads')
    logger.log(res.data)
    AppState.adverts = res.data.map((a) => new Advert(a))
  }
}

export const advertsService = new AdvertsService()
