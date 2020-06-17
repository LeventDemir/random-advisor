const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const auth = require('../middleware/auth')
const mmtv = require('../models/mmtv')


router.post('/create', auth, (req, res) => {
    const data = req.body
    data.user = jwt.verify(data.token, 'SeCrEtKeY').user

    new mmtv(data).save(err => {
        if (!err) res.json({ success: true })

        else res.json({ success: false })
    })
})


router.post('/delete', auth, (req, res) => {
    const data = req.body
    const user = jwt.verify(data.token, 'SeCrEtKeY').user

    mmtv.deleteOne({ _id: data.id, user }, err => {
        if (!err) res.json({ success: true })

        else res.json({ success: false })
    })
})


router.get('/mmtvs', auth, (req, res) => {
    const data = req.query
    const user = jwt.verify(data.token, 'SeCrEtKeY').user

    mmtv.find({ user }, (err, mmtvs) => {
        if (mmtvs) res.json({ mmtvs })

        else res.json({ success: false })
    })
})


module.exports = router