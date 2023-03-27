const Factory = require('../factory')

//
// Initialize the child logger for
// the module
//
const log = require('../log').child({
  module: 'users'
})

module.exports = function(context) {
  //
  // Format and write each user to the
  // target csv file
  //

  for (const user of context.source.users) {
    // teams requires that we have a team name given
    let teams
    if (user.team) {
      let channels
      if (user.channels) {
        channels = user.channels.split(',').map(channel => ({ name: channel.trim() }))
        channels.unshift({ name: 'town-square' })
      }

      teams = [{
        name: user.team,
        channels,
      }]
    }

    //
    // Write out each user record
    //   Note: Factory.user validation will drop undefined properties
    //
    try {
      context.target.write(
        Factory.user({
          first_name: user.firstname,
          last_name: user.lastname,
          username: user.username,
          email: user.email,
          password: user.password,
          auth_service: user.authservice,
          auth_data: user.authdata,
          // notify_props: {
          //   email: 'true',
          //   desktop: 'mention',
          //   mobile: 'mention'
          // },
          teams,
        })
      )
      log.info(`... writing ${user.username}`)
    }
    catch(err) {
      log.error(`... ignoring ${user.username} on error: ${err.message}.`)
    }
  }

  //
  // Return the context
  //
  return Promise.resolve(context)
}
