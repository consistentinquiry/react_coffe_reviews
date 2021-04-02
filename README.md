# react_coffe_reviews
A repo for a front end web application, built using the React Native framework. Talks to a backend developed by Ash Williams and can be found here:
https://github.com/ash-williams/coffida_server


key: <br />
✓ = fully implemented and working <br />
~ = partially implemented    <br />

Endpoints:<br />
POST /user - ✓<br />
POST /user/login - ✓<br />
POST /user/logout - ✓<br />
GET /user/{user_id} - ✓<br />
PATCH /user/{user_id} - ✓<br />

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
