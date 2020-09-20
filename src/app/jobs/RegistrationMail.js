import Mail from '../../libs/Mail'

export default {
  key: 'RegistrationMail',

  async handle({ data }) {
    const { user } = data

    const token = user.validation[0].token

    await Mail.sendMail({
      to: `${user.name} <${user.email}>`,
      subject: 'Valide seu e-mail e ative seu blog',
      template: 'register',
      context: {
        name: user.name,
        email: user.email,
        url: `${process.env.FRONT_URL}/activate/${token}?email=${user.email}`
      }
    })
  }
}
