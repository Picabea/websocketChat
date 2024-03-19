const { Router } = require('express')

const router = Router()

router.get('/', (_, res) => {
    res.render('index', {
        title: 'Aplicacion de chat',
        useWS: true,
        useSA: true,
        scripts: ['index.js']
    })
})

module.exports = router