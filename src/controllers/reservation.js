"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Reservation Controller:
const Reservation = require('../models/reservation')
module.exports={

    list : async (req,res)=>{
        let customFilter = {}

        if(!req.user.isAdmin && !req.user.isStaff){
            customFilter= {userId: req.user._id}
        } //& eğer giren kişi admin veya staff değilse customFiltera id'yi doldur admin veya staffsa customFilterin hepsini getir

        const data = await res.getModelList(Reservation,customFilter, [
            {path: 'userId', select: 'username firstName lastName'},
            {path: 'carId'},
            {path: 'createdId', select: 'username'},
            {path: 'updatedId', select: 'username'}
        ])
        const details = await res.getModelListDetails(Reservation,customFilter)

        res.status(200).send({
            error:false,
            details,
            data
        })
    },

    create: async (req,res)=>{
        if((!req.user.isAdmin && !req.user.isStaff) || !req.user?.userId){
            req.body.userId = req.user._id
        }

        req.body.createdId = req.user._id
        req.body.updatedId = req.user._id
        //reservation modelde bunlar zorunlu olduğu için bunları  atama ile buraya çektik

        const userReservationDates = await Reservation.findOne({
            userId: req.body.userId,
            $nor: [
                {startDate: {$gt : req.body.endDate}}, //& Rezervasyonun başlangıç tarihi mevcut rezervasyonun bitiş tarihinden büyükse sorun yok
                {endDate: {$lt : req.body.startDate}} //& Rezervasyonun bitiş tarihi mevcut rezervasyonun başlangıç tarihinden küçükse sorun yok
            ]
        })

        if(userReservationDates){
            res.errorStatusCode=400
            throw new Error(
                'It cannot be added because there is another reservation with same date',
                {cause : {userReservationDates: userReservationDates}}
            )
        }else{
            const data = await Reservation.create(req.body)

            res.status(200).send({
                error:false,
                data
            })
        }
    },
    read: async (req,res)=>{
        let customFilter = {}

        if (!req.user.isAdmin && !req.user.isStaff){
            customFilter = { userId: req.user._id}
        }

        const data = await Reservation.findOne({_id: req.params.id, ...customFilter}).populate([
            {path: 'userId', select: 'username firstName lastName'},
            {path: 'carId'},
            {path: 'createdId', select: 'username'},
            {path: 'updatedId', select: 'username'}
        ])

        res.status(200).send({
            error:false,
            data
        })
    },
    update: async (req,res)=>{

        if(!req.user.isAdmin){
            delete req.body.userId
        } //& kullanıcı admin değilmiz userId değiştirilemez değiştirilememesi için body'den delete ederiz (sileriz)
        //& user kendisininkini update edebilecek fakat başkasınınkini update edemeyecek
        req.body.updatedId = req.user._id
        const data = await Reservation.updateOne({_id:req.params.id}, req.body, {runValidators:true})
        res.status(202).send({
            error:false,
            data,
            new: await Reservation.findOne({_id: req.params.id})//& güncellenmiş veriyi tekrar getiriyoruz. updateOne metodu yeni veriyi döndürmez yani return etmez kendimiz getirmek zorundayız
        })
    },
    delete: async (req,res)=>{
        const data = await Reservation.deleteOne({_id: req.params.id})

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })
    }
}