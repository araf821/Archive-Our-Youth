import { contact } from "./actions/contact";

const main = async () => {
  await contact({
    email: "delivered@resend.dev",
    contactType: 0,
    message: "Hello world, hello bebidog, hello bebicat",
  }).then((data) => console.log(data));
};

main();
