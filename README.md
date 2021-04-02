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

POST /location/{location_id}/review - ✓<br />
PATCH /location/{location_id}/review/{rev_id} - ✓<br />
DELETE /location/{location_id}/review/{rev_id} - ✓<br />
GET /location/{loc_id}/review/{rev_id}/photo - ~ <br />
POST /location/{location_id}/review/{rev_id}/photo - ~<br />
DELETE /location/{loc_id}/review/{rev_id}/photo - ✓<br />
POST /location/{loc_id}/review/{rev_id}/like - ✓<br />
DELETE /location/{loc_id}/review/{rev_id}/like - ✓<br />

GET /location/{loc_id} - ✓<br />
POST /location/{loc_id}/favourite - ✓<br />
DELETE /location/{loc_id}/favourite - ✓<br />
GET /find - ✓<br />

Extension 1 - ✓<br />
Extension 2 - ✓<br />
