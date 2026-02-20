export const headshotMap: Record<string, string> = {
  "alexa.png": "Alexa Murietta",
  "chris.png": "Chris St. Amand",
  "heather.png": "Heather Colvin",
  "jay.png": "Jay Brown",
  "jon.png": "Jon Greene",
  "rajesh.png": "Rajesh Chintakunta",
  "ravi.png": "Ravi Manchala",
  "robyn.png": "Robyn Miller",
  "scott.png": "Scott Wong",
  "treg.png": "Treg Gilstorf",
};

export const getNameFromHeadshot = (headshot: string): string => {
  return headshotMap[headshot] || "Unknown";
};

export const leadershipTitles: Record<string, string> = {
  "Alexa Murietta": "Director of Delivery",
  "Chris St. Amand": "Chief Technology Officer",
  "Heather Colvin": "Talent Acquisition Specialist",
  "Jay Brown": "Business Development",
  "Jon Greene": "Director of Talent Acquisition",
  "Rajesh Chintakunta": "Head of Global Operations",
  "Scott Wong": "Business Development",
  "Treg Gilstorf": "Chief Operating Officer",
  "Ravi Manchala": "President & CEO",
  "Robyn Miller": "Business Development & Partnership Manager",
};

export const getTitleFromName = (name: string): string => {
  return leadershipTitles[name] || "Smart Data Consultant";
};
