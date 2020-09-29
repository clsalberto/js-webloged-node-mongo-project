import { Router } from 'express'

import ActiveRegisterDomainController from '../app/controllers/domains/ActiveRegisterDomainController'

const routes = Router()

/* Domain Rotes */
routes.post('/domain/:token', ActiveRegisterDomainController.store)

export default routes
