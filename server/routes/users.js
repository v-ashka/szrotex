const router = require('express').Router();
let userModel = require('../models/user.model');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

router.route('/list').get((req, res) => {
    console.log('list');
     userModel.find()
        .then(user => {
            console.log(user)
            // return res.json(user)
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
})


router.route('/list/:id').get((req, res) => {

    try {
        const id = req.params.id;
        const userInfo = { id: '', name: '', email: '', phoneNumber: '', description: '', products: [], workSchedule: {}}
        userModel.find({ "products._id": id }, function (err, result) {
            if (err) {
                console.log(err)
            }
            userInfo.name = result[0].name
            userInfo.email = result[0].email
            userInfo.phoneNumber = result[0].phoneNumber
            userInfo.products = result[0].products
            userInfo.id = result[0]._id
            if (result[0].description === undefined) {
                return res.json({status: 200, user: userInfo})

            } else {
                userInfo.description = result[0].description
                userInfo.workSchedule = result[0].workSchedule
                return res.json({ status: 200, user: userInfo })
            }
        })
   
    }catch(err){
        return res.status(400).json('Error: ' + err)
    }
    
    
})

router.route('/list/:id').post(async (req, res) => {
    const token = req.headers['x-access-token']
    try {
        const decoded = jwt.verify(token, 'secret123')
        const id = req.params.id;

        const reservation = {
            reservation: [{ productId: id, reservationDate: req.body.reservationDate, expiryDate: req.body.expiryDate, productBasicInfo: { name: req.body.productBasicInfo.name, price: req.body.productBasicInfo.price, img: req.body.productBasicInfo.img } }]
        }
        await userModel.updateOne(
            { email: decoded.email },
            { $push: reservation }
        )
        const query = { "products._id": id }

        userModel.findOne(query, function (err, result) {
            if (err) {
                console.log('error message:', err)
            } else {
                result.products.filter(product => {
                    if (product._id == id) {
                        product.reservation = true;
                    }
                })
                result.save()
                    .then(() => res.json({ status: 200, message: 'Reservation done!' }))
                    .catch((err) => console.log(err))
            }
        })
    }
    catch (err) {
        return err
     }
    
})



router.route('/register').post([
    check('name').trim().isLength({ min: 1, max: 25 }).withMessage('Nazwa firmy nie moze byc krotsza niz 1 znak i dluzsza niz 30 znaków').bail(),
    check('pass').trim().isLength({min: 8}).withMessage("Hasło musi składać się z minimum 8 znaków!").bail(),
    check('tel').isNumeric().withMessage('Numer telefonu musi skladac sie tylko z liczb!').isLength(9).withMessage('Numer telefonu ma sie skladac z 9 bez prefiksu!').bail()
    ], async (req, res) => {  
    try {
        const errors = validationResult(req);   
         if (!errors.isEmpty()) {
            console.log({errors: errors.array()})
            return res.status(422).json({errors: errors.array()}) 
        }  

        const newPassword = await bcrypt.hash(req.body.pass, 10);
        const user = await userModel.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword,
            phoneNumber: req.body.tel,
        })
        res.json({status: 200, message: 'Pomyślnie zarejestrowano!'})
    }
    catch (err) {
        console.log(err);
        res.json({ status: 'Error', error: 'Internal Server Error' })    }
})

router.route('/login').post(async (req, res) => {
    const user = await userModel.findOne({
      email: req.body.email
    })
    if (!user) {
        return res.json({status: 'error', error: 'Nie znaleziono użytkownika o takim emailu'})
    }

    const isPasswordValid = await bcrypt.compare(req.body.pass, user.password)
    if (isPasswordValid) {
        const token = jwt.sign({
            name: user.name,
            email: req.body.email
        }, 'secret123')
        return res.json({status: 'logged in', user: token})
    } else {
        return res.json({status: 'error', user: false, error: 'Błędny email lub hasło!'})
    }
})

router.route('/dashboard').get( async (req, res) => {
    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email;
        const user = await userModel.findOne({ email: email });
       
        return res.json({ status: 'verify', products: user.products, info: user, test: jwt.decode(token)})
    } catch (err) {
        console.log(err);
        res.json({status: 'Error', error: 'Błędny token'})
    }
})

router.route('/dashboard').post([
    check('desc').trim().isLength({ min: 5 }).withMessage('Opis nie moze byc krotszy niz 5 znakow').bail()
    ], async (req, res) => {
    const token = req.headers['x-access-token'];

    try { 
        const errors = validationResult(req);   
         if (!errors.isEmpty()) {
            console.log({errors: errors.array()})
            return res.status(422).json({errors: errors.array()}) 
        }  

        const decoded = jwt.verify(token, 'secret123');
        const email = decoded.email;
        const description =  req.body.desc;
        const workSchedule = req.body.workSchedule;
        const region = req.body.region
        await userModel.findOneAndUpdate(
			{ email: email },
			{ description: description, workSchedule: workSchedule, region: region }
		)
        return res.json({ status: '200', info: 'New information added!'})
    } catch (err) {
        console.log(err)
        res.json({status: 'Error', error: 'Invalid token'})
    }
})

router.route('/dashboard/remove-item').post(async (req, res) => {
    const token = req.headers['x-access-token'];
    try {
        const decoded = jwt.verify(token, 'secret123');
        await userModel.updateOne(
			{ email: decoded.email },
            { $pull: { reservation: req.body.product } }
        )
        const query = { "products._id": req.body.product.productId }

        userModel.findOne(query, function (err, result) {
            if (err) {
                console.log(err)
            } else {
                result.products.filter(product => {
                    if (product._id == req.body.product.productId) {
                        product.reservation = false;
                    }
                })
                 result.save()
                .catch((err) => console.log(err))
            }
        })
        return res.json({status: 200, message: 'Successfully deleted!'})
    }
    catch (err) {
        console.log(err)
        return res.json({status: 'Error', error: err})
    }
})


router.route('/dashboard/add').post([
    check('productName').trim().isLength({ min: 3 }).withMessage('Nazwa produktu nie moze byc krotsza niz 3 znaki!').bail(),
    check('productPrice').trim().isNumeric().withMessage('Wprowadzono błędną cenę!').isLength({min: 1}).withMessage("Nie podano ceny!").bail(),
    ], async (req, res) => {
    const token = req.headers['x-access-token'];

    try {
        const errors = validationResult(req);   
         if (!errors.isEmpty()) {
            console.log({errors: errors.array()})
            return res.status(422).json({errors: errors.array()}) 
        }  

        const decoded = jwt.verify(token, 'secret123');
        const email = decoded.email;

        const productName = req.body.productName;
        const dateAdd = req.body.addDate;
        const productPrice = req.body.productPrice;
        const productDesc = req.body.productDesc;
        const productImg = req.body.productImg;
        const reservation = req.body.reservation;
        const tags = req.body.productTags;
        const category = req.body.productCategory

        const newProduct = {
            products: [{ name: productName, date: dateAdd, price: productPrice, desc: productDesc, img: productImg, reservation: reservation, tags: [tags], category: category}]
        }

        console.log(newProduct)
       await userModel.updateOne(
			{ email: email },
			{ $push: newProduct }
		)
        return res.json({ status: '200', info: 'Updated record'})
    } catch (err) {
        console.log(err)
        res.json({status: 'Error', error: 'Invalid token'})
    }
})

router.route('/dashboard/edit/:id').get(async (req, res) => {
    const token = req.headers['x-access-token']
    try{
        const decoded = jwt.verify(token, 'secret123');
        const email = decoded.email;
        const id = req.params.id;
            
        userModel.findOne({email: email}, function(err, userFind){
        if(err) console.log('error message', err);
                   userFind.products.filter((product) => {
                       if(product.id == id){
                           return res.json({status: 200, product: product})
                       }
                   })
        });
      
    }catch(err){
        console.log(err);
        res.json({status: 'Error', error: 'Query error'})
    }
})

router.route('/dashboard/edit/:id').post(async (req, res) => {
    const token = req.headers['x-access-token'];

    try { 
        const decoded = jwt.verify(token, 'secret123');
        const email = decoded.email;

        const id = req.body.productId;
        const productName = req.body.name;
        const newDate = req.body.newDate;
        const productPrice = req.body.price;
        const productDesc = req.body.desc;
        const productImg = req.body.img;

        userModel.findOne({email: email})
            .then(item => {
               // console.log(item)
                item.products.filter((product) => {
                    if(product.id == id){
                        if(productName.length > 0){product.name = productName}
                        if(!isNaN(productPrice) && productPrice.length > 0){product.price = productPrice}
                        if(productDesc.length > 0){product.desc = productDesc}
                        if(productImg.length > 0){product.img = productImg}
                        product.date = newDate;

                        item.save()
                        .then(() => res.json({status: 200}))
                        .catch((err) => console.log(err))
                    }
                })
                
            })
            .catch(err => console.log(err))

    } catch (err) {
        console.log(err)
        res.json({status: 'Error', error: 'Invalid token'})
    }
})

router.route('/dashboard/delete/:id').delete(async (req, res) => {
    const token = req.headers['x-access-token'];

    try {
        const decoded = jwt.verify(token, 'secret123');
        const email = decoded.email;
        const id = req.body.productId;
        const product = req.body.product

        const newProduct = {
            products: product 
        }
        await userModel.updateOne(
			{ email: email },
			{ $pull: newProduct }
		)
        return res.json({status: 200, product: id})
    }
    catch (err) {
        console.log(err)
    }
})


router.route('/user/:id').get(async (req,res) => {
    
    try{
        const id = req.params.id;
        console.log(id)
        const user = await userModel.findOne({ _id: id });
        return res.json({status: 200, user: user})
    }
    catch(err){
        console.log(err)
    }
})

module.exports = router;