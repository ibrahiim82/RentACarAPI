"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// app.use(authentication)

const Token = require('../models/token')
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {

    const auth = req.headers?.authorization || null // Token ...tokenKey...
    const tokenKey = auth ? auth.split(' ') : null // ['Token', '...tokenKey...']

    if (tokenKey) {

        if (tokenKey[0] == 'Token') {
        // SimpleToken:

            const tokenData = await Token.findOne({ token: tokenKey[1] }).populate('userId')
            req.user = tokenData ? tokenData.userId : undefined
            //findOne() metodu, MongoDB'de belirli bir koleksiyondan tek bir belgeyi bulmak için kullanılır.
            //Bu metod, verilen koşullara uyan ilk belgeyi döndürür.
            //Token burada, Mongoose modelini temsil eder. Bu model, Token koleksiyonuyla etkileşimi sağlar.
            //Bu, Token koleksiyonunda token alanı tokenKey[1] değerine eşit olan ilk belgeyi arar ve tokenData değişkenine atar.
            //tokenKey[1], tokenKey adlı bir dizinin ikinci elemanına işaret eder. Burada, tokenKey dizisinin 1. indeksi (yani tokenKey[1]), aranan değeri belirtir.
            //.populate('userId') ifadesi, Token modelindeki userId alanının bulunduğu veriyi otomatik olarak ilgili User koleksiyonundan çekerek, bu ObjectId'yi ilişkili User verisiyle değiştirecektir.
            //Son satırda, req.user'a bir değer ataması yapılır.
            //tokenData varsa (yani, bir token verisi döndüyse), tokenData.userId yani ilişkili kullanıcı verisi req.user'a atanır.
            //tokenData.userId, populate() ile elde edilen kullanıcı bilgisini içerir.
            //Eğer tokenData yoksa (yani token geçerli değilse veya bulunamazsa), req.user değerine undefined atanır.
            
        } else if (tokenKey[0] == 'Bearer') {
        // JWT:

            jwt.verify(tokenKey[1], process.env.ACCESS_KEY, (error, data) => {
                // //? Hata gösterimi yok:
                req.user = data
            })
        }
    }

        next()
    }