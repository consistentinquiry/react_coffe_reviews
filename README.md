# react_coffe_reviews
A repo for a front end web application, built using the React Native framework

ENDPOINT CHECKLIST:
-------------------
key: 
✓ = fully implemented and working \n
~ = partially implemented (see explaination below ->)    
-------------------
POST /user - ✓
POST /user/login - ✓
POST /user/logout - ✓
GET /user/{user_id} - ✓
PATCH /user/{user_id} - ✓

POST /location/{location_id}/review - ✓
PATCH /location/{location_id}/review/{rev_id} - ✓
DELETE /location/{location_id}/review/{rev_id} - ✓
GET /location/{loc_id}/review/{rev_id}/photo - ~ 
POST /location/{location_id}/review/{rev_id}/photo - ~
DELETE /location/{loc_id}/review/{rev_id}/photo - ✓
POST /location/{loc_id}/review/{rev_id}/like - ✓
DELETE /location/{loc_id}/review/{rev_id}/like - ✓

GET /location/{loc_id} - ✓
POST /location/{loc_id}/favourite - ✓
DELETE /location/{loc_id}/favourite - ✓
GET /find - ✓

Extension 1 - ✓
Extension 2 - ✓

-> Im not sure if my implementation is correct or not as when an image is captured by the camera and POSTed to the server via the API it doesnt complain and it does register the image as recieved and stores it (evidenced by terminal output). The same goes for GET as a URI is recieved. However i suspect that maybe im just sending the text of the URI and not the image itself? Just a theory. Possibly that the camera in the virtual device doesnt actual take an image? And that the dummy photos in the built in reviews are blank as well? Again this could be wrong and my implementation is incorrect. There was an attempt though.
