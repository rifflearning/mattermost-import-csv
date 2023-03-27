module.exports = function (joiSchema, props) {
  //
  //  Validate and remove unknow keys
  //
  var {error, value} = joiSchema.validate(props, {
    presence: 'required',
    stripUnknown: { arrays: true, objects: true }
  })
  //
  // Throw validation errors
  //
  if (error) {
    throw error
  }
  //
  // Return the value
  //
  return value
}
