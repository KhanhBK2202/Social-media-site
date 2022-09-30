const mongoose = require('mongoose')
async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            // useCreateIndex: true ; nếu báo lỗi về index thì mới thêm dòng này
        });
        console.log('Connect successfully')
    } catch (error) {
        console.log('Connect failed')
    }
}
module.exports = { connect }