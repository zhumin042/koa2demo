const koa = require('koa');
const app = new koa();
const router = require('koa-simple-router');
const convert = require('koa-convert');
const path = require('path');
const render = require('koa-swig');
const serve = require('koa-static');
const co = require('co');

app.context.render = co.wrap(render({
	root:path.join(__dirname,'./views'),
	autoescape:true,
	cache:'memory',
	ext:'html',
	writeBody:false
}));

app.use(router(_=>{
	_.get('/',(ctx,next)=>{
		ctx.body = 'hello koa2';
	})

	_.get('/index',async(ctx,next)=>{
		//ctx.body = "index";
		ctx.body = await ctx.render('index.html');
	})
}));

app.use(convert(serve(path.join(__dirname,'./public'))));

app.listen(3000,()=>{
	console.log('server started!');
})