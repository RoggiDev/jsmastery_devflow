export const fetchLocation = async () => {
  const response = await fetch(
    "http://ip-api.com/json/?fields=city,countryCode",
  );

  const location = await response.json();

  return {
    city: location.city,
    countryCode: location.countryCode.toLowerCase(),
  };
};

export const fetchCountries = async (): Promise<Country[]> => {
  const countries = (await import("world-countries")).default;

  const formattedCountries = countries
    .map((country) => ({
      name: { common: country.name.common },
      code: country.cca2.toLowerCase(),
    }))
    .sort((a, b) => a.name.common.localeCompare(b.name.common));

  formattedCountries.unshift({
    name: { common: "Select a filter" },
    code: "",
  });

  return formattedCountries;
};

export const fetchJobs = async (filters: JobFilterParams) => {
  const { query, country } = filters;

  const headers = {
    "x-api-key": process.env.OPENWEBNINJA_API_KEY ?? "",
  };

  const response = await fetch(
    `https://api.openwebninja.com/jsearch/search-v2?country=${country}&work_from_home=true&num_pages=1&query=${encodeURIComponent(query)}`,
    {
      headers,
    },
  );

  const result = await response.json();

  console.log("Query:", query);
  console.log("Country:", country);

  console.log("Status:", response.status);
  console.log("Result:", result);

  return result.data;
};
