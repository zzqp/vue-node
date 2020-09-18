const mongoose = require('mongoose')
//连接mongodb
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true)
mongoose.connect('mongodb://127.0.0.1/layer',()=>{
  console.log('数据库连接成功');
})