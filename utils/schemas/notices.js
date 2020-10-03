const joi = require('@hapi/joi');

const noticeIdSchema =  joi.string().regex(/^[0-9a-fA-F]{24}$/);

const noticeTitleSchema = joi.string().max(80);
const noticeCoverSchema = joi.string().uri();
const noticeDescriptionSchema = joi.string().max(500);
const noticeSourceSchema = joi.string().uri();
const noticeDateSchema = joi.string().max(50);

const createNoticeSchema = {
    title: noticeTitleSchema.required(),
    cover: noticeCoverSchema.required(),
    description: noticeDescriptionSchema.required(),
    source: noticeSourceSchema.required(),
    date: noticeDateSchema.required(),

};

const updateNoticeSchema ={
    title: noticeTitleSchema,
    cover: noticeCoverSchema,
    description: noticeDescriptionSchema,
    source: noticeSourceSchema,
    date: noticeDateSchema,
}; 

module.exports = {
    noticeIdSchema,
    createNoticeSchema,
    updateNoticeSchema,
    
};
