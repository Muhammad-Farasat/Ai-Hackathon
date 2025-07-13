import mongoose from 'mongoose';

const connectToDb = async() =>{

mongoose.connect(process.env.MONGO_URL);

mongoose.connection.on('error', (err) => {
  console.log('MongoDB connection error:', err);
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
})

}

export default connectToDb