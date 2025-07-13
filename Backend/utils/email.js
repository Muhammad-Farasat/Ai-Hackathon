import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const sendEmail = async (userEmail, orderDetails) => {
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })

    const adminEmail = 'admin123@gmail.com'
    // console.log("This is order details", JSON.stringify(orderDetails));

    const orderItemsHtml = orderDetails.items.map(item => {
        console.log("This is item from email JS: ", orderDetails);
        
        return `
            <li>
            <strong>${item.name}</strong><br />
            Size: ${item.sizse}<br />
            Quantity: ${item.quantity}<br />
            Price: Rs.${item.price} each
            </li>
            <br />
        `;
    }).join('');

    const mailOption = {
        from: `"UrbanFabric" <${process.env.EMAIL}>`,
        to: `${userEmail}`,
        subject: "Order Confirmation",
        html: `
          <h3>Thank you for your order!</h3>
          <p>Order Summary:</p>
          <pre>${orderItemsHtml}</pre>
          <h4>Shipping Address:</h4>
          <p>${orderDetails.shippingAddress.firstName} ${orderDetails.shippingAddress.lastName}</p>
          <p>${orderDetails.shippingAddress.address}</p>
          <p>${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.zipCode}</p>
        `
    }


    try {
        await transport.sendMail(mailOption);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Failed to send email:", error);
    }

}

export default sendEmail