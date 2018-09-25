'use strict';

const router = require('koa-router')();
const Artirst = require('../models/artist');

router.get('/:skip/:limit', async (ctx, next) => {

	var limit = parseInt(ctx.params.limit);
	var skip = parseInt(ctx.params.skip);

	if(limit > 30) {
		limit = 30;
	}

	const artists = await Artirst.find().limit(limit).skip(skip).exec();

	ctx.status = 200;
	ctx.type = 'json';
	ctx.body = artists;
});

module.exports = router;