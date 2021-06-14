import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      logger.log(res.data)
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async editAccount(newInfo) {
    const res = await api.put('/account/' + AppState.account.id, newInfo)
    logger.log(res.data)
  }
}

export const accountService = new AccountService()
