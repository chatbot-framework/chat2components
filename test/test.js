const t = require('tap')
const format = require('../index.js')

t.test('is function', t => {
  t.equal(typeof format, 'function', 'is function')
  t.end()
})

t.test('must throw', {todo: true}, t => {
  t.throws(() => {
    format(' some wrong syntax [')
  }, SyntaxError, 'syntax error')
  t.end()
})

t.test('returns empty', t => {
  t.deepEqual(format(''), {
    text: '',
    intents: [],
    entities: []
  },'empty string')

  t.deepEqual(format('# this is commented'), {
    text: '# this is commented',
    intents: [],
    entities: []
  },'commented with hash')

  t.deepEqual(format('// this is commented'), {
    text: '// this is commented',
    intents: [],
    entities: []
  },'commented with slash')

  t.deepEqual(format('bot: how can I help you today?'), {
    text: 'bot: how can I help you today?',
    intents: [],
    entities: []
  },'prefix with \'bot:\'')

  t.end()
})

t.test('extract intent & entities', t=> {
  t.deepEqual(
    format('I am going to [Goa](source) from [Navi Mumbai](destination) tomorrow((trave))' ),
    {
      "entities": [{
          "end": 17,
          "entity": "source",
          "start": 14,
          "value": "Goa"
        }, {
          "end": 34,
          "entity": "destination",
          "start": 23,
          "value": "Navi Mumbai"
        }],
      "intents": ["trave"],
      "text": "I am going to Goa from Navi Mumbai tomorrow"
    },
    '1 intent and 2 entities')
  t.end()
})

t.test('extract intent & entities, prefix with \'user\'', t=> {
  t.deepEqual(
    format('User: I am going to [Goa](source) from [Navi Mumbai](destination) tomorrow((trave))' ),
    {
      "entities": [{
          "end": 17,
          "entity": "source",
          "start": 14,
          "value": "Goa"
        }, {
          "end": 34,
          "entity": "destination",
          "start": 23,
          "value": "Navi Mumbai"
        }],
      "intents": ["trave"],
      "text": "I am going to Goa from Navi Mumbai tomorrow"
    },
    '1 intent and 2 entities')
  t.end()
})
