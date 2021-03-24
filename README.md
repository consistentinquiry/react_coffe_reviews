# react_coffe_reviews
A repo for a front end web application, built using the React Native framework. Talks to a backend developed by Ash Williams and can be found here:
https://github.com/ash-williams/coffida_server


key: 
✓ = fully implemented and working \n
~ = partially implemented (see explaination below ->)    

Endpoints:
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
