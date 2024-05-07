import express from 'express';
import auth from '../../middlewares/auth.js';
import { ListingControllers } from './listing.controller.js';
const router = express.Router();

router.get('/listings', auth('admin', 'user'), ListingControllers.getListings);

export const ListingRouter = router;
