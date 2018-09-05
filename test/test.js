const t = require('tap')
const to = require('../index.js')

t.test('is function', t => {
  t.equal(typeof to, 'function', 'is function')
  t.end()
})

t.test('must throw', {todo: true}, t => {
  t.throws(() => {
    to(' some wrong syntax [')
  }, SyntaxError, 'syntax error')
  t.end()
})

t.test('returns empty', t => {
  t.deepEqual(to(''), {
    text: '',
    intents: [],
    entities: []
  },'empty string')

  t.deepEqual(to('# this is commented'), {
    text: '# this is commented',
    intents: [],
    entities: []
  },'commented with hash')

  t.deepEqual(to('// this is commented'), {
    text: '// this is commented',
    intents: [],
    entities: []
  },'commented with slash')

  t.end()
})

t.test('extract intent & entities', t=> {
  t.deepEqual(
    to('I am going to [Goa](source) from [Navi Mumbai](destination) tomorrow((trave))' ),
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
