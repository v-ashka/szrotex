const router = require('express').Router();
let userModel = require('../models/user.model');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

router.route('/list').get((req, res) => {

    console.log('test')
     userModel.find()
        .then(user => {
            return res.json(user)
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
})


router.route('/list/:id').post(async (req, res) => {

    try{
        const id = req.params.id;
        
        const email = req.body.email
        const user = await userModel.findOne({ email: email });
        return res.json({status: 200, user: user})
    }catch(err){
        return res.status(400).json('Error: ' + err)
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
       // await userModel.create({
    //     name: 'Admin',
    //     email: 'it@eszrot.com',
    //     password: '123',
    //     description: 'Zespół IT portalu E-szrot',
    //     workStartHour: 8,
    //     workEndHour: 16,
    //     phoneNumber: 664123091,
    //     products: []
    // })
})

router.route('/login').post(async (req, res) => {
    const user = await userModel.findOne({
      email: req.body.email
    })
    //console.log(user.email)
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
    check('desc').trim().isLength({ min: 5 }).withMessage('Opis nie moze byc krotszy niz 5 znakow').bail(),
    check('startWorkHour').trim().isLength({min: 1, max: 2}).withMessage("Godzina musi byc w postaci 24H!").bail(),
    check('endWorkHour').isLength({min: 1, max: 2}).withMessage('Godzina musi byc podana w formacie 24H!').bail()
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
        console.log(req.body) 
        const description =  req.body.desc;
        const workStartHour = req.body.startWorkHour;
        const workEndHour = req.body.endWorkHour;
        
        await userModel.findOneAndUpdate(
			{ email: email },
			{ description: description, workStartHour: workStartHour, workEndHour: workEndHour }
		)
        return res.json({ status: '200', info: 'New information added!'})
    } catch (err) {
        console.log(err)
        res.json({status: 'Error', error: 'Invalid token'})
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
        

        const newProduct = {
            products: [{name: productName, date: dateAdd, price: productPrice, desc: productDesc, img: productImg}]
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
        // const user = userModel.find({ 'products._id' : req.params.id }, 'products', function (err, product){
        //     if(err) console.log(err)
        //    return res.json({item: product[0].products[0]});
        // })
            
        const user = userModel.findOne({email: email}, function(err, userFind){
        if(err) console.log('error message', err);
                   userFind.products.filter((product) => {
                       if(product.id == id){
                           return res.json({status: 200, product: product})
                       }
                   })
        });

            // if(err) console.log('error message', err);
            // userFind.products.filter((product) => {
            //     if(product.id == id){
            //         console.log(product)
            //     }
            // })
       

        //return res.json({user: user})
        // console.log(user);

        //console.log(req.params.id, user);
        // const product = userModel.where('products._id').equals(req.params.id);
        // console.log(product)
      
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
        console.log('id', id)
        console.log(req.body);
        const productName = req.body.name;
        const newDate = req.body.newDate;
        const productPrice = req.body.price;
        const productDesc = req.body.desc;
        const productImg = req.body.img;

        console.log(productName, productPrice, productDesc, productImg)
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
        // const newProduct = {
        //     products: [{name: productName, date: dateAdd, price: productPrice, desc: productDesc, img: productImg}]
        // }
        // userModel.findOneAnd({email: email}, function(err, userFind){
        //     if(err) console.log('error message', err);
        //                userFind.products.filter((product) => {
        //                    if(product.id == id){
        //                        product.name = productName;
        //                        product.price = productPrice;
        //                        product.date = newDate;
        //                        product.desc = productDesc;
        //                        product.img = productImg;
                               

                               
        //                        product.updateOne()
        //                             .then(() => res.json({updatedProduct: product}))
        //                             .catch((err) => res.status(400).json('Error' + err))
        //                    }
        //                })
        //     });

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
        // console.log(req.body.product)
        return res.json({status: 200, product: id})
    }
    catch (err) {
        console.log(err)
    }
})

module.exports = router;