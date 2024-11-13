import mongoose from "mongoose";

const connectDB = (url) => {
    mongoose.set('strictQuery', true) //strictQuery : 쿼리 사용을 좀 더 면밀하게 하는것 (쿼리네임이나 검색을 정확하게 수행함. 단 오타가 발생하면 검색하지 못함)

    mongoose.connect(url)
    .then(()=> console.log('몽고db 연결'))
    .catch((err)=>console.log(err))
}

export default connectDB
