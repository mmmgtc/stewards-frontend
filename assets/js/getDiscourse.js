const stewardsData = require("../json/stewards_data.json");

const disclosureNames = [];
stewardsData.data.map((data) => {
  disclosureNames.push(data.discourse_username);
});
console.log("disclosureNames: ", disclosureNames);