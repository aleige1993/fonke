import Cookies from 'js-cookie'

const SessionKey = 'JSESSIONID'

export function getSession () {
  return Cookies.get(SessionKey)
}

export function removeSession () {
  return Cookies.remove(SessionKey)
}