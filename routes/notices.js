const express = require('express');
const passport = require('passport');

const validationHandler = require('../utils/middleware/validationHandler');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');

const NoticesService = require('../services/notices');
const {
    noticeIdSchema,
    createNoticeSchema,    

} = require('../utils/schemas/notices');

const cacheResponse = require('../utils/cacheResponse.js');
const { FIVE_MINUTES_IN_SEC, SIXTY_MINUTES_IN_SEC } = require('../utils/time');



function noticesApi(app) {
    const router = express.Router();
    app.use("/api/notices", router);

    const noticesService = new NoticesService();

    router.get("/", async function (req, res, next) {
        cacheResponse(res, FIVE_MINUTES_IN_SEC);

        const { description } = req.query;

        try {
            const notices = await noticesService.getNotices({ description });
            res.status(200).json({
                data: notices,
                message: "notices listed"
            })

        } catch (error) {
            next(error);
        }
    });

    router.get("/:noticeId", validationHandler({ noticeId: noticeIdSchema }, 'params'), async function (req, res, next) {
        cacheResponse(res, SIXTY_MINUTES_IN_SEC);

        const { noticeId } = req.params;
        try {
            const notices = await noticesService.getNotices({ noticeId });

            res.status(200).json({
                data: notices,
                message: "notice retreved"
            })

        } catch (error) {
            next(error);

        }
    });

    router.post("/",
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['create:movies']),
        validationHandler(createNoticeSchema), async function (req, res, next) {
            const { body: notice } = req;
            try {
                const createdNoticeId = await noticesService.createNotice({ notice });
                res.status(200).json({
                    data: createdNoticeId,
                    message: "notice created"
                })

            } catch (error) {
                next(error);

            }
        }
    );

    router.delete(
        '/:noticeId',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['delete:movies']),
        validationHandler({ noticeId: noticeIdSchema }, 'params'),
        async function (req, res, next) {
            const { noticeId } = req.params;

            try {
                const deletedNoticeId = await noticesService.deleteNotice({ noticeId });

                res.status(200).json({
                    data: deletedNoticeId,
                    message: 'notice deleted'
                });
            } catch (err) {
                next(err);
            }
        }
    );

}

module.exports = noticesApi;