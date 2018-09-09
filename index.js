module.exports = function (text) {
  let components = {
    intents: [],
    entities: []
  }
  // ignore commented text // or #
  // or prefixed with chat: or chatbot:
  if (/^\s*($|#|\/\/|bot:|chatbot:)/i.test(text)) {
    components.text = text
    return components
  }

  // remove prefix user or usr
  let prefix = text.match(/^\s*(usr|user)\s*:\s*(.*)\s*$/i)
  if (prefix) text = prefix[2]

  // extract intent ((intent))
  let matches = text.match(/\(\((.*)\)\)/)
  if (matches) {
    intents = matches[1].split(',')
      .map(t => t.trim().toLowerCase())
    text = text.replace(matches[0], '')
    components.intents = intents
  }

  // extract entities [value](entity-name)
  matches = text.match(/\[.+?\]\(.+?\)/g)
  if (matches) {
    entities = matches.map( match => {
      let vals = match.match(/\[(.+?)\]\((.+?)\)/)
      return {entity: vals[2], value: vals[1]}
    })
    text = text.replace(/\[|\]/g, '')
      .replace(/\(.*?\)/g, '')
    entities.forEach( ety => {
      ety.start = text.indexOf(ety.value)
      ety.end = ety.start + ety.value.length
    })
    components.entities = entities
  }
  components.text = text
  return components
}
