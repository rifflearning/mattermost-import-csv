const Joi = require('joi')
const validate = require('./validate')

//
// Define the schema
//
const schema = Joi.object({
  username: Joi.string(),
  email: Joi.string().email({
    minDomainSegments: 2
  }),
  auth_service: Joi.string().allow(
    'gitlab',
    'ldap',
    'saml',
    'google',
    'office365',
    ''
  ).optional(),
  auth_data: Joi.string().allow('').optional(),
  password: Joi.string().optional(),
  nickname: Joi.string().optional(),
  first_name: Joi.string().optional(),
  last_name: Joi.string().optional(),
  position: Joi.string().optional(),
  notify_props: Joi.object({
    email: Joi.string().allow('true', 'false'),
    desktop: Joi.string().allow('all', 'mention', 'none'),
    mobile: Joi.string().allow('all', 'mention', 'none')
  }).optional(),
  roles: Joi.string().optional().valid(
    'system_user',
    'system_admin system_user'
  ),
  teams: Joi.array().optional().items(
    Joi.object({
      name: Joi.string(),
      roles: Joi.string().optional().valid(
        'team_user',
        'team_admin team_user'
      ),
      channels: Joi.array().items(
        Joi.object({
          name: Joi.string(),
          roles: Joi.string().optional().valid(
            'channel_user',
            'channel_user channel_admin'
          )
        })
      )
    })
  )
})

//
// Generate a valid object
//
module.exports = function (props) {
  return {
    type: 'user',
    user: validate(schema, props)
  }
}
