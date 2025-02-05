"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// MongoDB Connection:

const mongoose = require('mongoose')    //Mongoose modülü, mongoose adlı değişkene aktardık.

//& Bağlantı Fonksiyonu Tanımlanması (dbConnection):
const dbConnection = function() {
    // Connect:
    mongoose.connect(process.env.MONGODB)
        .then(() => console.log('* DB Connected * '))
        .catch((err) => console.log('* DB Not Connected * ', err))
}
//dbConnection fonksiyonu, MongoDB veritabanına bağlanmak için kullandık.

// mongoose.connect(process.env.MONGODB): MongoDB'ye bağlantı kurmak için Mongoose'un connect metodunu çağırdık. Bağlantı için bağlantı dizesi (URL), process.env.MONGODB ifadesi ile çevresel değişkenlerden alınır. Bu genellikle uygulamanın çalıştığı ortamda (örneğin bir .env dosyasından) ayarlanır.

// then: Bağlantı başarılı olduğunda * DB Connected * mesajı yazdırılır.
// catch: Bağlantı hatalı olduğunda, hata mesajı konsola yazdırılır.


/* ------------------------------------------------------- */
module.exports = {
    mongoose,
    dbConnection
} // Bu, başka dosyalarda bu dosyayı içe aktarma (import) işlemi yapabilmek için gereklidir. Burada, mongoose ve dbConnection fonksiyonunu dışa aktardık.
