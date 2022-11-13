export const fetchArticlesWithQuery = (searchQuery, page) => {
  return fetch(
    `https://pixabay.com/api/?key=29907105-27da4e6e42fdff29794422632&q=${searchQuery}&image_type=photo&page=${page}&per_page=12`
  )
    .then(response => response.json())
    .then(data => data.hits);
};
