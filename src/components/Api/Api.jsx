import axios from 'axios';

export const fetchArticlesWithQuery = async (searchQuery, page) => {
  const params = {
    key: '29907105-27da4e6e42fdff29794422632',
    q: searchQuery,
    image_type: 'photo',
    page: page,
    per_page: 12,
  };
  const response = await axios.get('https://pixabay.com/api/', { params });
  return response.data.hits;
};
