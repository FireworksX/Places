// router.post('/login', validate(authValidation.login), authController.login)
// router.post('/logout', validate(authValidation.logout), authController.logout)
// router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens)
// router.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword)
// router.post('/reset-password', validate(authValidation.resetPassword), authController.resetPassword)
// router.post('/send-verification-email', auth(), authController.sendVerificationEmail)
// router.post('/verify-email', validate(authValidation.verifyEmail), authController.verifyEmail)

module.exports = () => {
  const { login } = require('./auth.service')()
  const express = require('express')
  const router = express.Router()

  router.post('/login', login)

  return router
}
