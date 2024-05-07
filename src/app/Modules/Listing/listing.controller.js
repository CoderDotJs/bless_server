import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import { ListingServices } from './listing.services.js';

const getListings = catchAsync(async (req, res) => {
  const result = await ListingServices.getListingFromDB(req.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product fetched successfully',
    data: result,
  });
});

export const ListingControllers = { getListings };
