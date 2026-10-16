const { injuriesData, transfersData } = require("../data/plData");

const getInjuries = (req, res) => {
  res.json({
    success: true,
    data: injuriesData,
  });
};

const getTransfers = (req, res) => {
  res.json({
    success: true,
    data: transfersData,
  });
};

module.exports = {
  getInjuries,
  getTransfers,
};
