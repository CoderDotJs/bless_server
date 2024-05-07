import Listing from './Listing.model.js';

const getListingFromDB = async (filters) => {
  const { stock, price, search, page = 1, limit = 10 } = filters;

  const aggregatePipeline = [];

  // Match stage for filtering by stock and price
  const matchStage = {};
  if (stock !== undefined) {
    matchStage.stock = { $gte: stock };
  }
  if (price !== undefined) {
    matchStage.price = { $lte: price };
  }
  if (Object.keys(matchStage).length > 0) {
    aggregatePipeline.push({ $match: matchStage });
  }

  // Search by name
  if (search !== undefined && search !== '') {
    aggregatePipeline.push({
      $match: {
        name: { $regex: new RegExp(search, 'i') },
      },
    });
  }

  // Count total documents for pagination
  const countPipeline = [...aggregatePipeline];
  countPipeline.push({
    $group: {
      _id: null,
      count: { $sum: 1 },
    },
  });
  const totalCount = await Listing.aggregate(countPipeline);

  // Add pagination
  const skip = (page - 1) * limit;
  aggregatePipeline.push({ $skip: skip });
  aggregatePipeline.push({ $limit: limit });

  const products = await Listing.aggregate(aggregatePipeline);
  return {
    meta: {
      page,
      limit,
      total: totalCount.length > 0 ? totalCount[0].count : 0,
    },
    data: products,
  };
};

export const ListingServices = {
  getListingFromDB,
};
