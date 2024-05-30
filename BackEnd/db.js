// const mongoose = require('mongoose');
// const password = '';
// const mongoURI = `mongodb+srv://shobhitt451:${password}cluster0.jxty430.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

// mongoose.set('strictQuery', false);
// const conectToMongo = () => {
//     try {
//         mongoose.connect(mongoURI, (error) => {
//             error ? console.log(error) :
//                 console.log(`connected to mongo succesfully `);
//         })
//     } catch (error) {
//         console.log({ "Failed to connect": error });

//     }

// }
// module.exports = conectToMongo;


const mongoose = require('mongoose');
const password = '';
const mongoURI = `mongodb+srv://shobhitt451:${password}@cluster0.jxty430.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);

const connectToMongo = () => {
    try {
        mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
            error ? console.log(error) : console.log(`Connected to MongoDB successfully`);
        });
    } catch (error) {
        console.log({ "Failed to connect": error });
    }
};

module.exports = connectToMongo;
