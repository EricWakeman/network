import { AppState } from '../AppState'
import Profile from '../models/Profile'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class ProfilesService {
  async getProfile(id) {
    const res = await api.get('/api/profiles/' + id)
    logger.log(res.data)
    AppState.profile = new Profile(res.data)
    logger.log(AppState.profile)
  }

  clearProfile() {
    AppState.profile = null
  }
}

export const profilesService = new ProfilesService()
