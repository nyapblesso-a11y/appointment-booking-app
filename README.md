# PROJECT TITLE: Appointment Booking Applications

# PROJECT DESCRIPTION: This is a backend services for scheduling appointments with real time notification

# TOOLS USED IN THE PROJECT: The tools used in this project actually is just JavaScript and npm packages

# HOW TO USE THE SERVICE: on this platform we have tow users the clinet who books available appointments and the Provider who create slots so that appointments coool be booked by the client
- So now you regiter as either a client or as  provider you can test the routes either oon thunder client which I used, using  a POST request to this http://localhost:3000/auth/register
as a client you need the folloeing credentials *{name, email, password, role(optional)}* all these  as an object. Then role is actulally optional because by default yoy registr without a role you are automatically a client
-registering a  provider: registering as a provider required *{name, email, password, role(required), service_name}* as a provider you need to provide the role and  services you offer be it Doctor, Dental services jsut to name  few which is the sevice_name

-now after registering , you'll be given token which will be used to l0ogin with *{email, password}* with a POST request to http://localhost:3000/auth/login.  note: sice it is local host all this can onl work on the device it was created on


** Now after being authenticated(registered, loggedin) either as a user or as a provider we need to either create a slot or book an appointment but we can't book and appointment without a slot being created by the the provider. So now to create a slot you need a POST request with he following credentials {"start_time", "end_time"} and it should ne noted that the time is in TIMESTAMP example(2026-02-10 14:30:00 or 2026-02-10T14:30:00Z) the post request is done to the servce route http://localhost:3000/slot/

** When a provider creates a slot, the client will be able to  view the slot by doing a GET request to the service router http://localhost:3000/slot/providerId

_** As the client view avaialable slots with the provider he/she is interested, he/she can now book a appointment with thw available slot by using a POST request method to the router service http://localhost:3000/app/
** When an appointmnet is booked, either the client or the  provider can be able to the view the appointments
- GET appoitment by client http://localhost/app/client
- GET appointment by provider http://localhost/provider
 all the two rquest above from implications show we use they use the GET request method

 ** Also an appointment can be cancled usind a PATCH request to http://localhost:3000/app/:{id}/cancel

 so the above is just a brief description on how the app works and how you go about it but for more detail user interface and info you can visit a docs for this project

 http://localhost:3000/api-docs

 # Clone repository
  bash `git clone git@github.com:nyapblesso-a11y/appointment-booking-app.git`