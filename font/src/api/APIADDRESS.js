let APIADDRESS
if (process.env.NODE_ENV === 'production') {
  APIADDRESS = ''
} else {
  APIADDRESS = 'api'
}

export default APIADDRESS