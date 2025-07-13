import mongoose from "mongoose";

const AdminUser = mongoose.model("AdminUser", {
    email: {
        type: String,
        required : true
    },
    password: {
        type: String,
        required : true
    }
})

export default AdminUser